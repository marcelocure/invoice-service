import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    id: string
    category: string;
    description: string;
    unitPrice: number;
}

const ProductSchema = new Schema<IProduct>({
    id: { type: String, required: true},
    category: { type: String, required: true},
    description: { type: String, required: true},
    unitPrice: { type: Number, required: true}
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
