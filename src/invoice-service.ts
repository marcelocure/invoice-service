import { Invoice, InvoiceStatus } from "./types/invoice";
import { PurchaseOrder, PurchaseOrderStatus } from "./types/purchase-order";
import * as moment from 'moment';

export class InvoiceService{
    private tax: number;
    constructor(tax: number) {
        this.tax = tax;
    }
    public processInvoice(items: PurchaseOrder[]) : Invoice{
        const invoiceItems : PurchaseOrder[] = this.calculatePurchaseOrders(items);
        const total : number = invoiceItems.reduce((agg, value) => agg + value.total, 0)
        const totalNet : number = invoiceItems.reduce((agg, value) => agg + value.netTotal, 0)
        const taxes : number = invoiceItems.reduce((agg, value) => agg + value.taxes, 0)
        const invoice : Invoice = new Invoice(invoiceItems, totalNet, total, taxes, InvoiceStatus.PROCESSED);
        return invoice;
    }

    private calculatePurchaseOrders(items: PurchaseOrder[]) : PurchaseOrder[] {
        return items.map(item => {
            item.processedAt = moment().toDate();
            item.processedBy = 'system';
            item.netTotal = item.quantity * item.unitPrice
            item.taxes = item.netTotal * this.tax;
            item.total = item.netTotal + item.taxes;
            item.status = PurchaseOrderStatus.PROCESSED;
            return item;
        });
    }
}