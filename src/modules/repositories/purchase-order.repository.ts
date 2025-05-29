import {IPurchaseOrder, PurchaseOrderModel} from "../../models/purchase-order.model";
import {v4 as uuidv4} from "uuid";
import {PurchaseOrderDTO, PurchaseOrderStatus} from "../../types/purchase-order.dto";

export class PurchaseOrderRepository {
    constructor() {
    }

    async save(purchaseOrder: PurchaseOrderDTO) {
        const poModel = new PurchaseOrderModel({
            id: uuidv4(),
            productId: purchaseOrder.productId,
            quantity: purchaseOrder.quantity,
            unitPrice: purchaseOrder.unitPrice,
            taxes: purchaseOrder.taxes,
            netTotal: purchaseOrder.netTotal,
            total: purchaseOrder.total,
            processedAt: purchaseOrder.processedAt,
            processedBy: purchaseOrder.processedBy,
            status: PurchaseOrderStatus.PROCESSING
        })
        await poModel.save();
    }

    async updateStatus(id: string, status: PurchaseOrderStatus) {
        await PurchaseOrderModel.updateOne({id: id}, {status: status});
    }

    async findMany(): Promise<PurchaseOrderDTO[]> {
        return (await PurchaseOrderModel.find())
            .map(this.buildPurchaseOrder);
    }

    async findOne(id: string): Promise<PurchaseOrderDTO> {
        const purchaseOrder: IPurchaseOrder = await PurchaseOrderModel.findOne({id: id});
        return this.buildPurchaseOrder(purchaseOrder);
    }

    private buildPurchaseOrder(po: IPurchaseOrder) : PurchaseOrderDTO {
        return new PurchaseOrderDTO(po.productId, po.quantity, po.unitPrice, po.taxes, po.netTotal, po.total, po.processedAt, po.processedBy, po.status, po.id );
    }
}