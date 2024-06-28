import { InvoiceItem } from "./invoice-item"

export enum InvoiceStatus {
    PROCESSED='PROCESSED', FAILED='FAILED'
}

export class Invoice {
    private invoiceItems: InvoiceItem[];
    private netTotal: number;
    private total: number;
    private taxes: number;
    private status: InvoiceStatus;
    constructor(invoiceItems: InvoiceItem[], netTotal: number, total: number, taxes: number, status: InvoiceStatus) {
        this.invoiceItems = invoiceItems;
        this.netTotal = netTotal;
        this.total = total;
        this.status = status;
        this.taxes = taxes;
    }
}