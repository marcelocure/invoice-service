export class PurchaseOrderDTO {
    productId: number;
    quantity: number;
    unitPrice: number;

    constructor(productId: number, quantity: number, unitPrice: number) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}