import { Injectable, Logger } from '@nestjs/common';
import {PurchaseOrderDTO} from "../types/purchase-order.dto";
import {PurchaseOrderService} from "../modules/purchaseorder/purchase-order.service";
import {PurchaseOrderStatus} from "../types/purchase-order";

@Injectable()
export class PurchaseOrderPendingListener {

    constructor(private readonly  purchaseOrderService: PurchaseOrderService) {}
    private readonly logger = new Logger(PurchaseOrderPendingListener.name);

    handleUserCreatedEvent(purchaseOrder: PurchaseOrderDTO) {
        this.logger.log(`Processing purchase order ${JSON.stringify(purchaseOrder)}`);
        this.purchaseOrderService.updateStatus(purchaseOrder.id, PurchaseOrderStatus.PROCESSED);
    }
}