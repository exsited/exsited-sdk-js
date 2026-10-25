/** Typed views over the v4 reports bodies. */

import {Dto, dtoList, sealDtoSchema} from '../../dto.js';

/** One entry of `account_overview` on {@link Account}. */
export class AccountOverview extends Dto {
    static override FIELDS = {
        netGain: 'string',
        new: 'string',
        cancelled: 'string',
        reactivated: 'string',
        deleted: 'string',
        date: 'string',
    } as const;

    netGain = this.declared<string | null>('netGain');
    new = this.declared<string | null>('new');
    cancelled = this.declared<string | null>('cancelled');
    reactivated = this.declared<string | null>('reactivated');
    deleted = this.declared<string | null>('deleted');
    date = this.declared<string | null>('date');
}

/** The `accounts` block of {@link ReportsAccountsAccountOverview}. */
export class Account extends Dto {
    static override FIELDS = {
        accountOverview: dtoList(AccountOverview),
    } as const;

    accountOverview = this.declared<Array<AccountOverview | null> | null>('accountOverview');
}

/** The reports accounts account overview body. */
export class ReportsAccountsAccountOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        accounts: Account,
    } as const;

    accounts = this.declared<Account | null>('accounts');
}

/** The `new` block of {@link InvoiceOverview}. */
export class New extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `cancelled` block of {@link InvoiceOverview}. */
export class Cancelled extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `reactivated` block of {@link InvoiceOverview}. */
export class Reactivated extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `voided` block of {@link InvoiceOverview}. */
export class Voided extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `amended` block of {@link InvoiceOverview}. */
export class Amended extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `net_gain` block of {@link InvoiceOverview}. */
export class NetGain extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** One entry of `invoice_overview` on {@link Invoice}. */
export class InvoiceOverview extends Dto {
    static override FIELDS = {
        date: 'string',
        invoiceTotal: 'string',
        new: New,
        cancelled: Cancelled,
        reactivated: Reactivated,
        voided: Voided,
        amended: Amended,
        netGain: NetGain,
    } as const;

    date = this.declared<string | null>('date');
    invoiceTotal = this.declared<string | null>('invoiceTotal');
    new = this.declared<New | null>('new');
    cancelled = this.declared<Cancelled | null>('cancelled');
    reactivated = this.declared<Reactivated | null>('reactivated');
    voided = this.declared<Voided | null>('voided');
    amended = this.declared<Amended | null>('amended');
    netGain = this.declared<NetGain | null>('netGain');
}

/** The `invoices` block of {@link ReportsInvoicesInvoiceOverview}. */
export class Invoice extends Dto {
    static override FIELDS = {
        invoiceOverview: dtoList(InvoiceOverview),
    } as const;

    invoiceOverview = this.declared<Array<InvoiceOverview | null> | null>('invoiceOverview');
}

/** The reports invoices invoice overview body. */
export class ReportsInvoicesInvoiceOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        invoices: Invoice,
    } as const;

    invoices = this.declared<Invoice | null>('invoices');
}

/** The `changed` block of {@link OrderOverview}. */
export class Changed extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** The `deleted` block of {@link OrderOverview}. */
export class Deleted extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** One entry of `order_overview` on {@link Order}. */
export class OrderOverview extends Dto {
    static override FIELDS = {
        date: 'string',
        orderTotal: 'string',
        new: New,
        cancelled: Cancelled,
        reactivated: Reactivated,
        changed: Changed,
        deleted: Deleted,
        netGain: NetGain,
    } as const;

    date = this.declared<string | null>('date');
    orderTotal = this.declared<string | null>('orderTotal');
    new = this.declared<New | null>('new');
    cancelled = this.declared<Cancelled | null>('cancelled');
    reactivated = this.declared<Reactivated | null>('reactivated');
    changed = this.declared<Changed | null>('changed');
    deleted = this.declared<Deleted | null>('deleted');
    netGain = this.declared<NetGain | null>('netGain');
}

/** The `orders` block of {@link ReportsOrdersOrderOverview}. */
export class Order extends Dto {
    static override FIELDS = {
        orderOverview: dtoList(OrderOverview),
    } as const;

    orderOverview = this.declared<Array<OrderOverview | null> | null>('orderOverview');
}

/** The reports orders order overview body. */
export class ReportsOrdersOrderOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        orders: Order,
    } as const;

    orders = this.declared<Order | null>('orders');
}

/** One entry of `purchase_invoice_overview` on {@link PurchaseInvoice}. */
export class PurchaseInvoiceOverview extends Dto {
    static override FIELDS = {
        date: 'string',
        purchaseInvoiceTotal: 'string',
        new: New,
        cancelled: Cancelled,
        reactivated: Reactivated,
        voided: Voided,
        amended: Amended,
        netGain: NetGain,
    } as const;

    date = this.declared<string | null>('date');
    purchaseInvoiceTotal = this.declared<string | null>('purchaseInvoiceTotal');
    new = this.declared<New | null>('new');
    cancelled = this.declared<Cancelled | null>('cancelled');
    reactivated = this.declared<Reactivated | null>('reactivated');
    voided = this.declared<Voided | null>('voided');
    amended = this.declared<Amended | null>('amended');
    netGain = this.declared<NetGain | null>('netGain');
}

/** The `purchase_invoices` block of {@link ReportsPurchaseInvoicesPurchaseInvoiceOverview}. */
export class PurchaseInvoice extends Dto {
    static override FIELDS = {
        purchaseInvoiceOverview: dtoList(PurchaseInvoiceOverview),
    } as const;

    purchaseInvoiceOverview = this.declared<Array<PurchaseInvoiceOverview | null> | null>('purchaseInvoiceOverview');
}

/** The reports purchase invoices purchase invoice overview body. */
export class ReportsPurchaseInvoicesPurchaseInvoiceOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        purchaseInvoices: PurchaseInvoice,
    } as const;

    purchaseInvoices = this.declared<PurchaseInvoice | null>('purchaseInvoices');
}

/** The `net_purchases` block of {@link PurchaseOrderOverview}. */
export class NetPurchase extends Dto {
    static override FIELDS = {
        amount: 'string',
        count: 'string',
    } as const;

    amount = this.declared<string | null>('amount');
    count = this.declared<string | null>('count');
}

/** One entry of `purchase_order_overview` on {@link PurchaseOrder}. */
export class PurchaseOrderOverview extends Dto {
    static override FIELDS = {
        date: 'string',
        purchaseOrderTotal: 'string',
        new: New,
        cancelled: Cancelled,
        reactivated: Reactivated,
        changed: Changed,
        deleted: Deleted,
        netPurchases: NetPurchase,
    } as const;

    date = this.declared<string | null>('date');
    purchaseOrderTotal = this.declared<string | null>('purchaseOrderTotal');
    new = this.declared<New | null>('new');
    cancelled = this.declared<Cancelled | null>('cancelled');
    reactivated = this.declared<Reactivated | null>('reactivated');
    changed = this.declared<Changed | null>('changed');
    deleted = this.declared<Deleted | null>('deleted');
    netPurchases = this.declared<NetPurchase | null>('netPurchases');
}

/** The `purchase_orders` block of {@link ReportsPurchaseOrdersPurchaseOrderOverview}. */
export class PurchaseOrder extends Dto {
    static override FIELDS = {
        purchaseOrderOverview: dtoList(PurchaseOrderOverview),
    } as const;

    purchaseOrderOverview = this.declared<Array<PurchaseOrderOverview | null> | null>('purchaseOrderOverview');
}

/** The reports purchase orders purchase order overview body. */
export class ReportsPurchaseOrdersPurchaseOrderOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        purchaseOrders: PurchaseOrder,
    } as const;

    purchaseOrders = this.declared<PurchaseOrder | null>('purchaseOrders');
}

/** One entry of `purchase_payments` on {@link PurchasePaymentAndRefundOverview}. */
export class PurchasePayment extends Dto {
    static override FIELDS = {
        date: 'string',
        purchasePaymentApplied: 'string',
        new: New,
        deleted: Deleted,
        paymentApplied: 'string',
    } as const;

    date = this.declared<string | null>('date');
    purchasePaymentApplied = this.declared<string | null>('purchasePaymentApplied');
    new = this.declared<New | null>('new');
    deleted = this.declared<Deleted | null>('deleted');
    paymentApplied = this.declared<string | null>('paymentApplied');
}

/** One entry of `purchase_refunds` on {@link PurchasePaymentAndRefundOverview}. */
export class PurchaseRefund extends Dto {
    static override FIELDS = {
        date: 'string',
        new: New,
        deleted: Deleted,
    } as const;

    date = this.declared<string | null>('date');
    new = this.declared<New | null>('new');
    deleted = this.declared<Deleted | null>('deleted');
}

/** The `purchase_payment_and_refund_overview` block of {@link ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview}. */
export class PurchasePaymentAndRefundOverview extends Dto {
    static override FIELDS = {
        purchasePayments: dtoList(PurchasePayment),
        purchaseRefunds: dtoList(PurchaseRefund),
    } as const;

    purchasePayments = this.declared<Array<PurchasePayment | null> | null>('purchasePayments');
    purchaseRefunds = this.declared<Array<PurchaseRefund | null> | null>('purchaseRefunds');
}

/** The reports purchase transactions purchase payment and refund overview body. */
export class ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        purchasePaymentAndRefundOverview: PurchasePaymentAndRefundOverview,
    } as const;

    purchasePaymentAndRefundOverview = this.declared<PurchasePaymentAndRefundOverview | null>(
        'purchasePaymentAndRefundOverview',
    );
}

/** The `payment_and_refund_overview` block of {@link ReportsTransactionsPaymentAndRefundOverview}. */
export class PaymentAndRefundOverview extends Dto {
    static override FIELDS = {
        payments: dtoList(PurchasePayment),
        refunds: dtoList(PurchaseRefund),
    } as const;

    payments = this.declared<Array<PurchasePayment | null> | null>('payments');
    refunds = this.declared<Array<PurchaseRefund | null> | null>('refunds');
}

/** The reports transactions payment and refund overview body. */
export class ReportsTransactionsPaymentAndRefundOverview extends Dto {
    static override ENVELOPE_KEY = 'report';

    static override FIELDS = {
        paymentAndRefundOverview: PaymentAndRefundOverview,
    } as const;

    paymentAndRefundOverview = this.declared<PaymentAndRefundOverview | null>('paymentAndRefundOverview');
}

/** Which endpoints each view above was measured from. */
export const MEASURED_FROM: Record<string, readonly string[]> = {
    ReportsAccountsAccountOverview: ['GET /api/{api_version}/reports/accounts/account_overview'],
    ReportsInvoicesInvoiceOverview: ['GET /api/{api_version}/reports/invoices/invoice_overview'],
    ReportsOrdersOrderOverview: ['GET /api/{api_version}/reports/orders/order_overview'],
    ReportsPurchaseInvoicesPurchaseInvoiceOverview: [
        'GET /api/{api_version}/reports/purchase_invoices/purchase_invoice_overview',
    ],
    ReportsPurchaseOrdersPurchaseOrderOverview: [
        'GET /api/{api_version}/reports/purchase_orders/purchase_order_overview',
    ],
    ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview: [
        'GET /api/{api_version}/reports/purchase_transactions/purchase_payment_and_refund_overview',
    ],
    ReportsTransactionsPaymentAndRefundOverview: [
        'GET /api/{api_version}/reports/transactions/payment_and_refund_overview',
    ],
};

sealDtoSchema(
    ReportsAccountsAccountOverview,
    New,
    Cancelled,
    Reactivated,
    Voided,
    Amended,
    NetGain,
    InvoiceOverview,
    Invoice,
    ReportsInvoicesInvoiceOverview,
    Changed,
    Deleted,
    OrderOverview,
    Order,
    ReportsOrdersOrderOverview,
    PurchaseInvoiceOverview,
    PurchaseInvoice,
    ReportsPurchaseInvoicesPurchaseInvoiceOverview,
    NetPurchase,
    PurchaseOrderOverview,
    PurchaseOrder,
    ReportsPurchaseOrdersPurchaseOrderOverview,
    PurchasePayment,
    PurchaseRefund,
    PurchasePaymentAndRefundOverview,
    ReportsPurchaseTransactionsPurchasePaymentAndRefundOverview,
    PaymentAndRefundOverview,
    ReportsTransactionsPaymentAndRefundOverview,
    AccountOverview,
    Account,
);
