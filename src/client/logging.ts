/** Structured logging. */

import * as fs from 'node:fs';
import * as path from 'node:path';

import {SdkConfigError} from '../errors.js';
import {neutraliseControls} from './console.js';

/** Numeric severities, on the conventional 10-to-50 scale. */
export const LOG_LEVELS = Object.freeze({
    DEBUG: 10,
    INFO: 20,
    WARNING: 30,
    ERROR: 40,
    CRITICAL: 50,
} as const);

/** Owner only: with `logBodies` on, the file holds customer data around the redacted credentials. */
export const LOG_FILE_MODE = 0o600;

const LEVEL_NAMES: Readonly<Record<number, string>> = Object.freeze(
    Object.fromEntries(Object.entries(LOG_LEVELS).map(([name, value]) => [value, name])),
);

/** The name of a numeric level, e.g. `levelName(20) === 'INFO'`. */
export function levelName(level: number): string {
    return LEVEL_NAMES[level] || String(level);
}

/** Resolve a level given as a name or a number: `'info'` and `20` both give 20. */
export function resolveLevel(level: string | number): number {
    if (typeof level === 'number') return level;
    return (LOG_LEVELS as Record<string, number>)[String(level).toUpperCase()] ?? LOG_LEVELS.WARNING;
}

export interface LogRecord {
    /** e.g. `exsited.default` */
    loggerName: string;
    /** The configured instance label, unescaped. */
    clientName: string;
    level: number;
    levelName: string;
    /** The already-redacted message. */
    message: string;
    timestamp: Date;
}

/** A subscriber. The record it is handed is a frozen copy of its own; see {@link emitLogRecord}. */
export type LogSink = (record: Readonly<LogRecord>) => void;

export interface LogSinkOptions {
    /** One logger only. */
    loggerName?: string | null;
    /** Defaults to `DEBUG`. */
    level?: string | number;
}

interface SinkEntry {
    fn: LogSink;
    loggerName: string | null;
    level: number;
}

const SINKS = new Set<SinkEntry>();

/** Subscribe to every record the SDK emits. A sink that throws is ignored. Answers an unsubscribe function. */
export function addLogSink(fn: LogSink, options: LogSinkOptions = {}): () => void {
    if (typeof fn !== 'function') {
        throw new SdkConfigError('addLogSink: expected a function to receive log records');
    }
    const entry: SinkEntry = {
        fn,
        loggerName: options.loggerName ?? null,
        level: resolveLevel(options.level ?? LOG_LEVELS.DEBUG),
    };
    SINKS.add(entry);
    return () => {
        SINKS.delete(entry);
    };
}

/** Remove every sink registered for a function. */
export function removeLogSink(fn: LogSink): void {
    for (const entry of [...SINKS]) if (entry.fn === fn) SINKS.delete(entry);
}

/** Drop every registered sink. Mainly for tests. */
export function clearLogSinks(): void {
    SINKS.clear();
}

/** How many sinks are currently registered. */
export function logSinkCount(): number {
    return SINKS.size;
}

/** Deliver one record to every interested sink. */
export function emitLogRecord(record: Readonly<LogRecord>): void {
    for (const entry of SINKS) {
        if (entry.level > record.level) continue;
        if (entry.loggerName !== null && entry.loggerName !== record.loggerName) continue;
        try {
            entry.fn(Object.freeze({...record, timestamp: new Date(record.timestamp.getTime())}));
        } catch {
            // A sink must never break the call that produced the record.
        }
    }
}

/**
 * One log line: `2026-08-12T09:15:04.001Z INFO exsited.default GET /x -> 200`.
 * The logger and message are neutralised: a log file read back in a terminal is a terminal.
 */
export function formatLogLine(record: Readonly<LogRecord>): string {
    return `${record.timestamp.toISOString()} ${record.levelName} ${neutraliseControls(record.loggerName)} ${neutraliseControls(record.message)}`;
}

export interface LogFileHandle {
    loggerName: string;
    filePath: string;
    level: number;
}

interface LogFileUser {
    filePath: string;
    count: number;
    level: number;
}

/** Ref-counted file handlers, keyed by logger name: one file per logger. */
const LOG_FILE_USERS = new Map<string, LogFileUser>();

/** Claim a file handler for one logger, sharing an existing one when the path matches. */
export function attachLogFile(loggerName: string, clientName: string, filePath: string, level: number): LogFileHandle {
    const target = path.resolve(filePath);
    const existing = LOG_FILE_USERS.get(loggerName);
    if (existing && existing.filePath !== target) {
        throw new SdkConfigError(
            `logFile: clientName ${JSON.stringify(clientName)} already logs to ${JSON.stringify(existing.filePath)}, so ` +
                `adding ${JSON.stringify(target)} would write every record from both clients into both files - give this ` +
                'client its own clientName, or close the first one first',
        );
    }
    try {
        fs.mkdirSync(path.dirname(target), {recursive: true});
        // Open reports an unwritable path; the empty write reports a directory, which Windows lets open.
        const descriptor = fs.openSync(target, 'a', LOG_FILE_MODE);
        try {
            fs.writeSync(descriptor, '');
        } finally {
            fs.closeSync(descriptor);
        }
    } catch (error) {
        throw new SdkConfigError(
            `logFile ${JSON.stringify(filePath)} cannot be opened: ${error instanceof Error ? error.message : String(error)}`,
        );
    }
    if (existing) existing.count += 1;
    else LOG_FILE_USERS.set(loggerName, {filePath: target, count: 1, level});
    return {loggerName, filePath: target, level};
}

/** Release a claim on a file handler; the last release drops it. */
export function detachLogFile(handle: LogFileHandle | null): void {
    if (!handle) return;
    const existing = LOG_FILE_USERS.get(handle.loggerName);
    if (!existing) return;
    existing.count -= 1;
    if (existing.count <= 0) LOG_FILE_USERS.delete(handle.loggerName);
}

/** Files whose first write failure has already been reported, and how many records were lost. */
const LOG_FILE_FAILURES = new Map<string, number>();

/** Append one record to a claimed file. */
export function writeLogFileRecord(handle: LogFileHandle | null, record: Readonly<LogRecord>): void {
    if (!handle) return;
    if (handle.level > record.level) return;
    try {
        fs.appendFileSync(handle.filePath, `${formatLogLine(record)}\n`, {mode: LOG_FILE_MODE});
        LOG_FILE_FAILURES.delete(handle.filePath);
    } catch (error) {
        const lostAlready = LOG_FILE_FAILURES.get(handle.filePath);
        LOG_FILE_FAILURES.set(handle.filePath, (lostAlready ?? 0) + 1);
        if (lostAlready !== undefined) return;
        process.emitWarning(
            `logFile ${handle.filePath} could not be appended to (${error instanceof Error ? error.message : String(error)}); ` +
                'records for it are being dropped. The API calls themselves are unaffected. This is reported once ' +
                'per file until a write succeeds',
            {type: 'SdkLogFileWarning'},
        );
    }
}

/** How many records were dropped for a log file since its last successful write, or `0`. */
export function logFileRecordsDropped(filePath: string): number {
    return LOG_FILE_FAILURES.get(path.resolve(filePath)) ?? 0;
}
