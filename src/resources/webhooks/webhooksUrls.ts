/** Path templates and body keys for the webhook endpoints. */

/** V4 serves no webhook listing: `GET /webhooks` without an id is refused. */
export const WEBHOOK = '/api/{api_version}/webhooks/{webhook_id}';

/** The envelope one record arrives under. */
export const WEBHOOK_KEY = 'webhook';
