import { PurchaseOrderDTO } from "src/types/purchase-order.dto";
import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { PurchaseOrderService } from "src/modules/purchaseorder/purchase-order.service";
import { Request } from 'express';

@Controller('/purchase-orders')
export class PurchaseOrderController {
    constructor(
        private readonly purchaseOrderService: PurchaseOrderService
    ) {}

    @Post()
    createSubscription(
        @Req() req: Request,
        @Body() body: PurchaseOrderDTO) {
        //const accountGuid = req.headers['account'] as string;
        return this.purchaseOrderService.savePurchaseOrder(body);
    }

    // @Get()
    // listSubscriptions(@Req() req: Request) {
    //     const accountGuid = req.headers['account'] as string;
    //     const filters = req.query as FilterSubscriptionDto;
    //     return this.subscriptionService.list(accountGuid, filters);
    // }

}