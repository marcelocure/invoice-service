import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchaseOrder extends Document {
    id: string,
    productId: string;
    quantity: number;
    unitPrice: number;
    taxes: number;
    netTotal: number;
    total: number;
    processedAt: Date;
    processedBy: string;
    status: string;
}

const PurchaseOrderSchema = new Schema<IPurchaseOrder>({
    id: { type: String, required: true},
    productId: { type: String, required: true},
    quantity: { type: Number, required: true},
    unitPrice: { type: Number, required: true},
    taxes: { type: Number, required: true},
    netTotal: { type: Number, required: true},
    total: { type: Number, required: true},
    processedAt: { type: Date, required: true},
    processedBy: { type: String, required: true},
    status: { type: String, required: true},
});

export const PurchaseOrderModel = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);
