//import { AuthMiddleware } from './modules/auth/auth.middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PurchaseOrderController } from './rest/purchase-order.controller';
import { ProductController } from './rest/product.controller';
import { AppService } from './app.service';
import { PurchaseOrderService } from './modules/purchaseorder/purchase-order.service';
import { ProductService } from './modules/purchaseorder/product.service';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {PurchaseOrderPendingListener} from "./listeners/purchase-order-pending.listener";
import {PurchaseOrderRepository} from "./modules/repositories/purchase-order.repository";

@Module({
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot()],
  controllers: [
    AppController,
    PurchaseOrderController,
    ProductController
  ],
  providers: [
    AppService,
    PurchaseOrderService,
    ProductService,
    PurchaseOrderPendingListener,
    PurchaseOrderRepository
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware)
    //   .exclude(
    //     '/auth',
    //   )
    //   .forRoutes('*')
  }

}
