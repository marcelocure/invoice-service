import { PurchaseOrderDTO } from "./purchase-order.dto";
export enum InvoiceStatus {
    PROCESSED='PROCESSED', FAILED='FAILED'
}

export class Invoice {
    private purchaseOrders: PurchaseOrderDTO[];
    private netTotal: number;
    private total: number;
    private taxes: number;
    private status: InvoiceStatus;
    constructor(purchaseOrders: PurchaseOrderDTO[], netTotal: number, total: number, taxes: number, status: InvoiceStatus) {
        this.purchaseOrders = purchaseOrders;
        this.netTotal = netTotal;
        this.total = total;
        this.status = status;
        this.taxes = taxes;
    }
}