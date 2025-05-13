import {PurchaseOrderModel} from "../../models/purchase-order.model";
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
}