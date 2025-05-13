import { PurchaseOrderDTO } from "src/types/purchase-order.dto";
import {Body, Controller, Get, Post, Req, Param} from "@nestjs/common";
import { PurchaseOrderService } from "src/modules/purchaseorder/purchase-order.service";
import { Request } from 'express';

@Controller('/purchase-orders')
export class PurchaseOrderController {
    constructor(
        private readonly purchaseOrderService: PurchaseOrderService
    ) {}

    @Post()
    createPurchaseOrder(
        @Req() req: Request,
        @Body() body: PurchaseOrderDTO) {
        return this.purchaseOrderService.savePurchaseOrder(body);
    }

    @Get("/:id")
    getPurchaseOrder(
        @Param('id') id: string) {
        return this.purchaseOrderService.getPurchaseOrder(id);
    }

    @Get()
    getPurchaseOrders() {
        return this.purchaseOrderService.getPurchaseOrders();
    }
}