import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {PurchaseOrderDTO} from "../types/purchase-order.dto";
import {PurchaseOrderEvent} from "../types/purchase-order.enum";

@Injectable()
export class PurchaseOrderPendingListener {
    private readonly logger = new Logger(PurchaseOrderPendingListener.name);
    @OnEvent(PurchaseOrderEvent.PROCESSING)
    handleUserCreatedEvent(purchaseOrder: PurchaseOrderDTO) {
        this.logger.log(`Processing purchase order ${JSON.stringify(purchaseOrder)}`);
    }
}