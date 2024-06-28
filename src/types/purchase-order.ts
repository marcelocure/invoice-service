export enum PurchaseOrderStatus {
    PROCESSED='PROCESSED', FAILED='FAILED'
}

export class PurchaseOrder {
    productId: number;
    quantity: number;
    unitPrice: number;
    taxes: number;
    netTotal: number;
    total: number;
    processedAt: Date;
    processedBy: string;
    status: PurchaseOrderStatus;

    constructor(productId: number, quantity: number, unitPrice: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}