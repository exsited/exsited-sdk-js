/** The bookings endpoints; a listing answers `{data: [...]}`, walked with `iterRecords`. */

import type {ApiResponse} from '../../client/apiResponse.js';
import type {ExsitedClient} from '../../client/exsitedClient.js';
import type {QueryParams} from '../../http/queryParams.js';
import {SdkUsageError} from '../../errors.js';
import * as urls from './bookingsUrls.js';
import {
    BookingBillingPreferencesView,
    BookingById,
    BookingCustomObject,
    BookingCustomObjectList,
    BookingInvoiceList,
    BookingItemFulfillment,
    BookingKpis,
    BookingLine,
    BookingList,
    BookingNoteList,
    BookingPaymentList,
    BookingPaymentMethod,
    BookingPaymentMethods,
    BookingPaymentView,
    BookingPdf,
    BookingQuotePartialInvoices,
} from './bookingsDto.js';

/** Per-call overrides, declared per module so a family imports alone. */
export interface CallOptions {
    raiseOnError?: boolean | undefined;
    responseFormat?: 'map' | 'json' | 'dto' | undefined;
}

/** The key a listing puts its records under. */
export const RECORD_KEY = 'data';

function requireValue(value: unknown, what: string): void {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
        throw new SdkUsageError(`${what} is required: the request cannot be built without it`);
    }
}

function requirePayload(payload: unknown): void {
    if (payload === null || payload === undefined) {
        throw new SdkUsageError(
            'payload is required: this endpoint sends a body, and there is no meaningful empty one',
        );
    }
}

/** `GET /api/{api_version}/booking` */
export function getBooking(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingList>> {
    return client.sendGetRequest<BookingList>(urls.BOOKING, {
        queryParams,
        dtoType: BookingList,
        ...options,
    });
}

/** `GET /api/{api_version}/booking/{booking_id}` */
export function getBookingById(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingById>(urls.BOOKING_BY_ID, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/booking`
 *
 * Create a booking, the `createOrder` body under `order`; `201`, answered under `booking`. Each line needs a labour and
 * its booking times.
 */
export function createBooking(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.BOOKING, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/booking/preview`
 *
 * Price a booking without creating it, the `createBooking` body; `201`, with no cart data in the answer, under
 * `booking`.
 */
export function previewBooking(
    client: ExsitedClient,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.BOOKING_PREVIEW, {
        jsonBody: payload,
        ...options,
    });
}

/**
 * `DELETE /api/{api_version}/booking/{booking_id}`
 *
 * Delete a booking; `204`. The server deletes any order by this path, whatever its type.
 */
export function deleteBooking(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    return client.sendDeleteRequest<never>(urls.BOOKING_BY_ID, {
        pathParams: {booking_id: bookingId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/notes`
 *
 * List the notes of every order, the same list as `orders.get_orders_notes`; `/booking/{booking_id}/notes` is refused.
 */
export function getBookingNotes(
    client: ExsitedClient,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingNoteList>> {
    return client.sendGetRequest<BookingNoteList>(urls.BOOKING_NOTES, {
        queryParams,
        dtoType: BookingNoteList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/billing_preferences`
 *
 * A booking's billing preferences.
 */
export function getBookingBillingPreferences(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingBillingPreferencesView>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingBillingPreferencesView>(urls.BOOKING_BILLING_PREFERENCES, {
        pathParams: {booking_id: bookingId},
        dtoType: BookingBillingPreferencesView,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/booking/{booking_id}/billing_preferences`
 *
 * Update a booking's billing preferences, body `order.billing_preferences`; answered with the whole booking under
 * `order`.
 */
export function updateBookingBillingPreferences(
    client: ExsitedClient,
    bookingId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    requirePayload(payload);
    return client.sendPatchRequest<BookingById>(urls.BOOKING_BILLING_PREFERENCES, {
        pathParams: {booking_id: bookingId},
        jsonBody: payload,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/booking/{booking_id}/change`
 *
 * Change a booking, body under `booking`: `effective_date` and `lines`. Only a booking-type order is accepted.
 */
export function changeBooking(
    client: ExsitedClient,
    bookingId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.BOOKING_CHANGE, {
        pathParams: {booking_id: bookingId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `POST /api/{api_version}/booking/{booking_id}/change/preview`
 *
 * Preview a booking change, the `changeBooking` body; nothing is changed.
 */
export function previewBookingChange(
    client: ExsitedClient,
    bookingId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    requirePayload(payload);
    return client.sendPostRequest<never>(urls.BOOKING_CHANGE_PREVIEW, {
        pathParams: {booking_id: bookingId},
        jsonBody: payload,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/information`
 *
 * A booking's header.
 */
export function getBookingInformation(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingById>(urls.BOOKING_INFORMATION, {
        pathParams: {booking_id: bookingId},
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/booking/{booking_id}/information`
 *
 * Update a booking's header, body under `order`; answered with the whole booking under `order`.
 */
export function updateBookingInformation(
    client: ExsitedClient,
    bookingId: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    requirePayload(payload);
    return client.sendPatchRequest<BookingById>(urls.BOOKING_INFORMATION, {
        pathParams: {booking_id: bookingId},
        jsonBody: payload,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/lines`
 *
 * A booking with its lines, under `order`.
 */
export function getBookingLines(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingById>(urls.BOOKING_LINES, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/lines/{line_uuid}`
 *
 * One booking line, under `order_line`.
 */
export function getBookingLine(
    client: ExsitedClient,
    bookingId: string,
    lineUuid: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingLine>> {
    requireValue(bookingId, 'booking_id');
    requireValue(lineUuid, 'line_uuid');
    return client.sendGetRequest<BookingLine>(urls.BOOKING_LINE, {
        pathParams: {booking_id: bookingId, line_uuid: lineUuid},
        dtoType: BookingLine,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/booking/{booking_id}/lines/{line_uuid}`
 *
 * Update a booking line, body `order.line`; answered with the whole booking under `order`.
 */
export function updateBookingLine(
    client: ExsitedClient,
    bookingId: string,
    lineUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    requireValue(lineUuid, 'line_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<BookingById>(urls.BOOKING_LINE, {
        pathParams: {booking_id: bookingId, line_uuid: lineUuid},
        jsonBody: payload,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `PATCH /api/{api_version}/booking/{booking_id}/lines/{line_uuid}/billing_preferences`
 *
 * Update a line's billing preferences, body `order.line.item_properties`, not `billing_preferences`.
 */
export function updateBookingLineBillingPreferences(
    client: ExsitedClient,
    bookingId: string,
    lineUuid: string,
    payload: unknown,
    options: CallOptions = {},
): Promise<ApiResponse<BookingById>> {
    requireValue(bookingId, 'booking_id');
    requireValue(lineUuid, 'line_uuid');
    requirePayload(payload);
    return client.sendPatchRequest<BookingById>(urls.BOOKING_LINE_BILLING_PREFERENCES, {
        pathParams: {booking_id: bookingId, line_uuid: lineUuid},
        jsonBody: payload,
        dtoType: BookingById,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects`
 *
 * List the custom objects orders use, with the booking's instances.
 */
export function getBookingCustomObjects(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingCustomObjectList>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingCustomObjectList>(urls.BOOKING_CUSTOM_OBJECTS, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingCustomObjectList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}`
 *
 * One custom object with the booking's instances of it.
 */
export function getBookingCustomObject(
    client: ExsitedClient,
    bookingId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingCustomObject>> {
    requireValue(bookingId, 'booking_id');
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<BookingCustomObject>(urls.BOOKING_CUSTOM_OBJECT, {
        pathParams: {booking_id: bookingId, custom_object_id: customObjectId},
        dtoType: BookingCustomObject,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects/{custom_object_id}/instances/{instance_id}`
 *
 * One custom object instance.
 */
export function getBookingCustomObjectInstance(
    client: ExsitedClient,
    bookingId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendGetRequest<never>(urls.BOOKING_CUSTOM_OBJECT_INSTANCE, {
        pathParams: {booking_id: bookingId, custom_object_id: customObjectId, instance_id: instanceId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects_instances`
 *
 * The server's alias of `getBookingCustomObjects`.
 */
export function getBookingCustomObjectsInstances(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingCustomObjectList>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingCustomObjectList>(urls.BOOKING_CUSTOM_OBJECTS_INSTANCES, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingCustomObjectList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}`
 *
 * The server's alias of `getBookingCustomObject`.
 */
export function getBookingCustomObjectsInstance(
    client: ExsitedClient,
    bookingId: string,
    customObjectId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingCustomObject>> {
    requireValue(bookingId, 'booking_id');
    requireValue(customObjectId, 'custom_object_id');
    return client.sendGetRequest<BookingCustomObject>(urls.BOOKING_CUSTOM_OBJECTS_INSTANCE, {
        pathParams: {booking_id: bookingId, custom_object_id: customObjectId},
        dtoType: BookingCustomObject,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/custom_objects_instances/{custom_object_id}/instances/{instance_id}`
 *
 * The server's alias of `getBookingCustomObjectInstance`.
 */
export function getBookingCustomObjectsInstanceInstance(
    client: ExsitedClient,
    bookingId: string,
    customObjectId: string,
    instanceId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    requireValue(customObjectId, 'custom_object_id');
    requireValue(instanceId, 'instance_id');
    return client.sendGetRequest<never>(urls.BOOKING_CUSTOM_OBJECTS_INSTANCE_INSTANCE, {
        pathParams: {booking_id: bookingId, custom_object_id: customObjectId, instance_id: instanceId},
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/invoices`
 *
 * List a booking's invoices.
 */
export function getBookingInvoices(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingInvoiceList>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingInvoiceList>(urls.BOOKING_INVOICES, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingInvoiceList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/item_fulfillments`
 *
 * List a booking's fulfillments.
 */
export function getBookingItemFulfillments(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<never>(urls.BOOKING_ITEM_FULFILLMENTS, {
        pathParams: {booking_id: bookingId},
        queryParams,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/item_fulfillments/{fulfillment_id}`
 *
 * One fulfillment; the server does not check that the fulfillment belongs to the booking.
 */
export function getBookingItemFulfillment(
    client: ExsitedClient,
    bookingId: string,
    fulfillmentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingItemFulfillment>> {
    requireValue(bookingId, 'booking_id');
    requireValue(fulfillmentId, 'fulfillment_id');
    return client.sendGetRequest<BookingItemFulfillment>(urls.BOOKING_ITEM_FULFILLMENT, {
        pathParams: {booking_id: bookingId, fulfillment_id: fulfillmentId},
        dtoType: BookingItemFulfillment,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/kpis`
 *
 * A booking's KPIs, under `order_kpis`.
 */
export function getBookingKpis(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingKpis>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingKpis>(urls.BOOKING_KPIS, {
        pathParams: {booking_id: bookingId},
        dtoType: BookingKpis,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/payment_methods`
 *
 * The payment methods bound to a booking; `404` when none is.
 */
export function getBookingPaymentMethods(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingPaymentMethods>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingPaymentMethods>(urls.BOOKING_PAYMENT_METHODS, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingPaymentMethods,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/payment_methods/{payment_method_ref}`
 *
 * One bound payment method, by its reference.
 */
export function getBookingPaymentMethod(
    client: ExsitedClient,
    bookingId: string,
    paymentMethodRef: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingPaymentMethod>> {
    requireValue(bookingId, 'booking_id');
    requireValue(paymentMethodRef, 'payment_method_ref');
    return client.sendGetRequest<BookingPaymentMethod>(urls.BOOKING_PAYMENT_METHOD, {
        pathParams: {booking_id: bookingId, payment_method_ref: paymentMethodRef},
        dtoType: BookingPaymentMethod,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/payments`
 *
 * List a booking's payments.
 */
export function getBookingPayments(
    client: ExsitedClient,
    bookingId: string,
    queryParams?: QueryParams,
    options: CallOptions = {},
): Promise<ApiResponse<BookingPaymentList>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingPaymentList>(urls.BOOKING_PAYMENTS, {
        pathParams: {booking_id: bookingId},
        queryParams,
        dtoType: BookingPaymentList,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/payments/{payment_id}`
 *
 * One payment; the server does not check that the payment belongs to the booking.
 */
export function getBookingPayment(
    client: ExsitedClient,
    bookingId: string,
    paymentId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingPaymentView>> {
    requireValue(bookingId, 'booking_id');
    requireValue(paymentId, 'payment_id');
    return client.sendGetRequest<BookingPaymentView>(urls.BOOKING_PAYMENT, {
        pathParams: {booking_id: bookingId, payment_id: paymentId},
        dtoType: BookingPaymentView,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/pdf`
 *
 * A booking's PDF links.
 */
export function getBookingPdf(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingPdf>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingPdf>(urls.BOOKING_PDF, {
        pathParams: {booking_id: bookingId},
        dtoType: BookingPdf,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/quote_partial_invoices`
 *
 * The deposit and instalment invoices of a converted quote.
 */
export function getBookingQuotePartialInvoices(
    client: ExsitedClient,
    bookingId: string,
    options: CallOptions = {},
): Promise<ApiResponse<BookingQuotePartialInvoices>> {
    requireValue(bookingId, 'booking_id');
    return client.sendGetRequest<BookingQuotePartialInvoices>(urls.BOOKING_QUOTE_PARTIAL_INVOICES, {
        pathParams: {booking_id: bookingId},
        dtoType: BookingQuotePartialInvoices,
        ...options,
    });
}

/**
 * `GET /api/{api_version}/booking/{booking_id}/shipping_pdf/{shipping_line_id}`
 *
 * A shipping line's PDF; `404` until the line has a generated shipping PDF.
 */
export function getBookingShippingPdf(
    client: ExsitedClient,
    bookingId: string,
    shippingLineId: string,
    options: CallOptions = {},
): Promise<ApiResponse<never>> {
    requireValue(bookingId, 'booking_id');
    requireValue(shippingLineId, 'shipping_line_id');
    return client.sendGetRequest<never>(urls.BOOKING_SHIPPING_PDF, {
        pathParams: {booking_id: bookingId, shipping_line_id: shippingLineId},
        ...options,
    });
}
