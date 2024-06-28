export enum InvoiceItemStatus {
    PROCESSED='PROCESSED', FAILED='FAILED'
}

export class InvoiceItem {
    productId: number;
    quantity: number;
    unitPrice: number;
    taxes: number;
    netTotal: number;
    total: number;
    processedAt: Date;
    processedBy: string;
    status: InvoiceItemStatus;

    constructor(productId: number, quantity: number, unitPrice: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}