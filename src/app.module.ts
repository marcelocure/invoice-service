//import { AuthMiddleware } from './modules/auth/auth.middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PurchaseOrderController } from './rest/purchase-order.controller';
import { AppService } from './app.service';
import { PurchaseOrderService } from './modules/purchaseorder/purchase-order.service';

import { InvoiceService } from './invoice-service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    PurchaseOrderController,
  ],
  providers: [
    InvoiceService,
    AppService,
    PurchaseOrderService,
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
