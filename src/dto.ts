/**
 * The typed view every DTO is built from: `FIELDS` maps each property to its type. Imports only the leaf
 * `errors.ts`, since every DTO module imports this one.
 */

import {SdkUsageError} from './errors.js';

/** Whether a value is a plain mapping - not an array, not bytes. */
export function isDtoMapping(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

/** The wire map behind a DTO payload, or the value unchanged; duck-typed, so a caller's own type sends too. */
export function dtoMapOf(value: unknown): unknown {
    const sendable = isDtoMapping(value) && typeof (value as {toMap?: unknown}).toMap === 'function';
    return sendable ? (value as {toMap: () => unknown}).toMap() : value;
}

/** A scalar a field may declare. Anything else reads `null` rather than being converted. */
export type DtoScalar = 'int' | 'float' | 'string' | 'boolean' | 'any';

/** What one `FIELDS` entry may hold: a scalar, a list, a choice, or another `Dto` subclass. */
export type DtoFieldType = DtoScalar | DtoListType | DtoOneOfType | DtoClass;

export interface DtoListType {
    readonly list: DtoFieldType;
}

export interface DtoOneOfType {
    readonly oneOf: readonly DtoFieldType[];
}

/** A `Dto` subclass, as a field type or as the `dtoType` a call declares. */
export type DtoClass = typeof Dto;

/** An array of `itemType`, as a field type; a mismatched entry reads `null`, so the count stays the body's. */
export function dtoList(itemType: DtoFieldType): DtoListType {
    return Object.freeze({list: itemType});
}

/** Either type, as a field type: a payload `state` takes an id or a name. */
export function dtoOneOf(...types: DtoFieldType[]): DtoOneOfType {
    return Object.freeze({oneOf: Object.freeze([...types])});
}

/** What each scalar name accepts. Anything else reads `null` rather than being converted. */
const SCALARS: Record<Exclude<DtoScalar, 'any'>, (value: unknown) => boolean> = {
    int: (value) => Number.isInteger(value),
    // An integer is a float in JSON's one number type: the only widening, and it loses nothing.
    float: (value) => typeof value === 'number' && Number.isFinite(value),
    string: (value) => typeof value === 'string',
    boolean: (value) => typeof value === 'boolean',
};

interface DtoSchema {
    readonly fields: Readonly<Record<string, DtoFieldType>>;
    readonly topLevel: ReadonlySet<string>;
    readonly envelopeKey: string | null;
    readonly itemType: unknown;
    readonly wireNames: Readonly<Record<string, string>>;
}

/** The private, frozen schema per class; parsing reads only this, so rewriting a public static changes nothing. */
const SCHEMAS = new WeakMap<object, DtoSchema>();

/**
 * `addressLine1` becomes `address_line_1`; a digit run opens a word only where no lowercase follows it.
 * A name with no capital is taken as the wire spelling, which is how `office365` is declared.
 */
function toWireName(name: string): string {
    if (name === name.toLowerCase()) return name;
    return name.replace(/[A-Z]|\d+(?![a-z])/g, (part) => `_${part.toLowerCase()}`);
}

/** Freeze a declared field type in place; a `Dto` subclass is left alone, since freezing it would fix its statics. */
function freezeDeclaredType(declared: unknown): void {
    if (declared === null || typeof declared !== 'object') return;
    for (const value of Object.values(declared as Record<string, unknown>)) {
        if (Array.isArray(value)) Object.freeze(value);
    }
    Object.freeze(declared);
}

type SchemaStatics = {
    FIELDS?: Readonly<Record<string, DtoFieldType>>;
    TOP_LEVEL?: readonly string[];
    ENVELOPE_KEY?: string | null;
    ITEM_TYPE?: unknown;
    WIRE_NAMES?: Readonly<Record<string, string>>;
};

/** This class's private schema, taken from its statics once and frozen, with the statics locked too. */
function schemaOf(type: object): DtoSchema {
    const cached = SCHEMAS.get(type);
    if (cached !== undefined) return cached;

    const statics = type as SchemaStatics;
    const declared = statics.FIELDS || {};
    for (const fieldType of Object.values(declared)) freezeDeclaredType(fieldType);
    for (const name of ['FIELDS', 'TOP_LEVEL', 'ENVELOPE_KEY', 'ITEM_TYPE', 'WIRE_NAMES'] as const) {
        lockSchemaDeclaration(type, name);
    }

    const fields = Object.freeze({...declared});
    const spelled = statics.WIRE_NAMES || {};
    const stray = Object.keys(spelled).filter((name) => !Object.hasOwn(fields, name));
    if (stray.length) {
        throw new SdkUsageError(
            `${(type as {name?: string}).name}.WIRE_NAMES names undeclared field ${stray.sort().join(', ')}`,
        );
    }
    const schema: DtoSchema = Object.freeze({
        fields,
        topLevel: Object.freeze(new Set(statics.TOP_LEVEL || [])),
        envelopeKey: statics.ENVELOPE_KEY ?? null,
        itemType: statics.ITEM_TYPE ?? null,
        wireNames: Object.freeze(
            Object.fromEntries(Object.keys(fields).map((name) => [name, spelled[name] ?? toWireName(name)])),
        ),
    });
    SCHEMAS.set(type, schema);
    return schema;
}

/**
 * Seal each type's schema now. A DTO module calls this on its own types as its last statement: until then
 * their statics are ordinary writable properties.
 */
export function sealDtoSchema(...types: DtoClass[]): void {
    for (const type of types) schemaOf(type);
}

/** Freeze one static schema declaration and stop the class reassigning it; an inherited one is frozen on the base. */
function lockSchemaDeclaration(type: object, name: string): void {
    const value: unknown = (type as Record<string, unknown>)[name];
    if (value !== null && typeof value === 'object') Object.freeze(value);
    const descriptor = Object.getOwnPropertyDescriptor(type, name);
    if (descriptor && descriptor.configurable && 'value' in descriptor) {
        Object.defineProperty(type, name, {...descriptor, writable: false, configurable: false});
    }
}

function describeValue(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'an array';
    if (ArrayBuffer.isView(value)) return 'bytes';
    return `a ${typeof value}`;
}

/** One value as its declared type, or `null`: nothing is converted, so a float sent as `"12.50"` reads `null`. */
function readValue(value: unknown, declared: DtoFieldType): unknown {
    if (value === null || value === undefined) return null;
    if (declared === 'any') return value;
    if (typeof declared === 'string') return SCALARS[declared](value) ? value : null;
    if ('list' in declared && declared.list !== undefined) {
        const itemType = declared.list;
        return Array.isArray(value) ? value.map((item) => readValue(item, itemType)) : null;
    }
    if ('oneOf' in declared && declared.oneOf !== undefined) {
        for (const candidate of declared.oneOf) {
            const read = readValue(value, candidate);
            if (read !== null) return read;
        }
        return null;
    }
    return isDtoMapping(value) ? (declared as DtoClass).fromMap(value) : null;
}

/** One value as the API receives it: a nested DTO becomes its record, and a list is walked for nested DTOs. */
function writeValue(value: unknown): unknown {
    if (value instanceof Dto) {
        const record = value.toMap();
        // A nested DTO's own envelope would be an extra layer the API does not expect.
        const {envelopeKey} = schemaOf(value.constructor);
        return envelopeKey === null ? record : record[envelopeKey];
    }
    if (Array.isArray(value)) return value.map(writeValue);
    if (isDtoMapping(value)) {
        const walked: Record<string, unknown> = {};
        for (const [key, item] of Object.entries(value)) walked[key] = writeValue(item);
        return walked;
    }
    return value;
}

/**
 * Base for every typed view. `ENVELOPE_KEY` is unwrapped by {@link Dto.fromMap} when present, so one type reads a
 * detail and a listing entry; `TOP_LEVEL` names fields beside that envelope, like `transactionNo`.
 */
export class Dto {
    /** The key the API wraps this record in, or null for a bare body. */
    static ENVELOPE_KEY: string | null = null;

    /** Fields that sit beside the envelope rather than inside it. */
    static TOP_LEVEL: readonly string[] = Object.freeze([]);

    /** Each field against the type it holds: the wire contract. */
    static FIELDS: Readonly<Record<string, DtoFieldType>> = Object.freeze({});

    /** A wire key that is not the snake_case of its field name, such as v4's camelCase `primaryId`. */
    static WIRE_NAMES: Readonly<Record<string, string>> = Object.freeze({});

    /** This type's fields in declaration order against their wire keys; introspection only, a frozen copy. */
    static fields(): Readonly<Record<string, string>> {
        return Object.freeze({...schemaOf(this).wireNames});
    }

    /** This type's schema as a frozen copy; introspection only, like {@link Dto.fields}. */
    static schema(): Readonly<{
        fields: Readonly<Record<string, DtoFieldType>>;
        envelopeKey: string | null;
        topLevel: readonly string[];
        itemType: unknown;
    }> {
        const schema = schemaOf(this);
        return Object.freeze({
            fields: Object.freeze({...schema.fields}),
            envelopeKey: schema.envelopeKey,
            topLevel: Object.freeze([...schema.topLevel]),
            itemType: schema.itemType,
        });
    }

    /**
     * Build one, every field optional and anything not passed `null`. An undeclared name is refused: a typo
     * would be sent under the wrong name and answered `201`.
     */
    constructor(values: Record<string, unknown> = {}) {
        const {fields} = schemaOf(this.constructor);
        if (!isDtoMapping(values)) {
            throw new SdkUsageError(
                `${this.constructor.name}: expected an object of field values, got ${describeValue(values)}`,
            );
        }
        const unknown = Object.keys(values).filter((name) => !Object.hasOwn(fields, name));
        if (unknown.length) {
            throw new SdkUsageError(
                `${this.constructor.name} has no field ${unknown.sort().join(', ')}; it holds ` +
                    `${Object.keys(fields).join(', ') || 'no fields'}`,
            );
        }
        for (const name of Object.keys(fields))
            (this as unknown as Record<string, unknown>)[name] = values[name] ?? null;
    }

    /**
     * The value the constructor assigned to one declared field. A class field initialiser runs after `super()`,
     * so `email = null` would erase what the base read; `email = this.declared('email')` keeps and types it.
     */
    declared<T = unknown>(name: string): T {
        return (this as unknown as Record<string, T>)[name] as T;
    }

    /** Read a decoded body into this type; an `ENVELOPE_KEY` is unwrapped when present. */
    static fromMap<T extends DtoClass>(this: T, body: unknown): InstanceType<T> {
        if (!isDtoMapping(body)) {
            throw new SdkUsageError(
                `${this.name}.fromMap expects a decoded mapping body, got ${describeValue(body)} - ` +
                    'a binary or empty body has no DTO',
            );
        }
        const schema = schemaOf(this);
        let source: Record<string, unknown> = body;
        if (schema.envelopeKey !== null) {
            const inner = source[schema.envelopeKey];
            if (isDtoMapping(inner)) {
                source = {...inner};
                for (const [key, value] of Object.entries(body)) {
                    if (key !== schema.envelopeKey) source[key] = value;
                }
            }
        }

        const values: Record<string, unknown> = {};
        for (const [name, wireName] of Object.entries(schema.wireNames)) {
            if (Object.hasOwn(source, wireName)) {
                values[name] = readValue(source[wireName], schema.fields[name] as DtoFieldType);
            }
        }
        return new this(values) as InstanceType<T>;
    }

    /** The body this DTO stands for, envelope included; a `null` field is omitted rather than sent. */
    toMap(): Record<string, unknown> {
        const schema = schemaOf(this.constructor);
        const record: Record<string, unknown> = {};
        const beside: Record<string, unknown> = {};
        for (const [name, wireName] of Object.entries(schema.wireNames)) {
            const value = (this as unknown as Record<string, unknown>)[name];
            if (value === null || value === undefined) continue;
            (schema.topLevel.has(name) ? beside : record)[wireName] = writeValue(value);
        }
        const body: Record<string, unknown> =
            schema.envelopeKey === null ? {...record} : {[schema.envelopeKey]: record};
        return Object.assign(body, beside);
    }
}
