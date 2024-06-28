import { Injectable } from '@nestjs/common';
import { PurchaseOrderDTO } from 'src/types/purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  public savePurchaseOrder(purchaseOrderDTO : PurchaseOrderDTO): void {
    //save purchaseOrderDTO
  }
}
