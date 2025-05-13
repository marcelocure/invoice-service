export class ProductDTO {
    id: string;
    category: string;
    description: string;
    unitPrice: number;

    constructor(id: string, category: string, description: string, unitPrice: number) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.unitPrice = unitPrice;
    }
}
