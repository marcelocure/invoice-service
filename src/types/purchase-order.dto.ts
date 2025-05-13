export class PurchaseOrderDTO {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    taxes: number;
    netTotal: number;
    total: number;
    processedAt: Date;
    processedBy: string;
    status: String;

    constructor(productId: string, quantity: number, unitPrice: number, taxes?: number, netTotal?: number, total?: number, processedAt?: Date, processedBy?: string, status?: string, id?: string) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.taxes = taxes ?? 0;
        this.netTotal = netTotal ?? 0;
        this.total = total ?? 0;
        this.processedAt = processedAt ?? null;
        this.processedBy = processedBy ?? '';
        this.status = status ?? '0';
        this.id = id ?? '';
    }
}
export enum PurchaseOrderStatus {
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}