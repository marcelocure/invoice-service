import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {PurchaseOrderDTO, PurchaseOrderStatus} from '../../types/purchase-order.dto';
import * as moment from 'moment';
import {ProductService} from './product.service';
import {PurchaseOrderEvent} from "../../types/purchase-order.enum";
import {EventEmitter2} from '@nestjs/event-emitter';
import {PurchaseOrderRepository} from "../repositories/purchase-order.repository";

@Injectable()
export class PurchaseOrderService {
  constructor(
        private readonly productService: ProductService,
        private readonly purchaseOrderRepository: PurchaseOrderRepository,
        private eventEmitter: EventEmitter2
    ) {}
    private readonly logger = new Logger(PurchaseOrderService.name);

    public async savePurchaseOrder(purchaseOrder : PurchaseOrderDTO): Promise<PurchaseOrderDTO> {
        this.logger.log(`Processing purchase order ${JSON.stringify(purchaseOrder)}`)
        const product = await this.getProduct(purchaseOrder.productId);
        purchaseOrder.unitPrice = product.unitPrice;
        purchaseOrder = this.calculatePurchaseOrder(purchaseOrder);
        this.logger.log(`Purchase order calculated ${JSON.stringify(purchaseOrder)}`);
        await this.purchaseOrderRepository.save(purchaseOrder);
        this.logger.log(`Purchase order saved ${JSON.stringify(purchaseOrder)}`);
        this.emitPurchaseOrderProcessingEvent(purchaseOrder);
        return purchaseOrder;
    }

    public async updateStatus(id: string, status: PurchaseOrderStatus) {
        const purchaseOrder = await this.purchaseOrderRepository.findOne(id);
        if (purchaseOrder == null) {
            throw new NotFoundException();
        }
        await this.purchaseOrderRepository.updateStatus(purchaseOrder.id, status);
    }

    private async getProduct(productId: string) {
        try {
            return await this.productService.getProduct(productId);
        } catch (error) {
            throw new BadRequestException(`Product ${productId} does not exist`);
        }
    }

    private emitPurchaseOrderProcessingEvent(purchaseOrder: PurchaseOrderDTO): void {
        this.eventEmitter.emit(PurchaseOrderEvent.PROCESSING, purchaseOrder);
    }

    public async getPurchaseOrders(): Promise<PurchaseOrderDTO[]> {
        return await this.purchaseOrderRepository.findMany();
    }

    public async getPurchaseOrder(id:string): Promise<PurchaseOrderDTO> {
        return await this.purchaseOrderRepository.findOne(id);
    }

  // public processInvoice(items: PurchaseOrder[]) : Invoice{
  //         const invoiceItems : PurchaseOrder[] = this.calculatePurchaseOrders(items, .45);
  //         const total : number = invoiceItems.reduce((agg, value) => agg + value.total, 0)
  //         const totalNet : number = invoiceItems.reduce((agg, value) => agg + value.netTotal, 0)
  //         const taxes : number = invoiceItems.reduce((agg, value) => agg + value.taxes, 0)
  //         const invoice : Invoice = new Invoice(invoiceItems, totalNet, total, taxes, InvoiceStatus.PROCESSED);
  //         return invoice;
  //     }
  
  // private calculatePurchaseOrders(items: PurchaseOrder[], tax: number) : PurchaseOrder[] {
  //     return items.map(item => {
  //         item.processedAt = moment().toDate();
  //         item.processedBy = 'system';
  //         item.netTotal = item.quantity * item.unitPrice
  //         item.taxes = item.netTotal * tax;
  //         item.total = item.netTotal + item.taxes;
  //         item.status = PurchaseOrderStatus.PROCESSED;
  //         return item;
  //     });
  // }

  private calculatePurchaseOrder(purchaseOrder: PurchaseOrderDTO) : PurchaseOrderDTO {
      const response: PurchaseOrderDTO = purchaseOrder;
      response.processedAt = moment().toDate();
      response.processedBy = 'system';
      response.netTotal = response.quantity * response.unitPrice
      response.taxes = response.netTotal * .45;
      response.total = response.netTotal + response.taxes;
      response.status = PurchaseOrderStatus.PROCESSED;
      return response;
  }
}