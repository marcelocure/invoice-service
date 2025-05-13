import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderService} from "../src/modules/purchaseorder/purchase-order.service";
import {ProductService} from "../src/modules/purchaseorder/product.service";
import {ProductDTO} from "../src/types/product.dto";
import {PurchaseOrderRepository} from "../src/modules/repositories/purchase-order.repository";
import {v4 as uuidv4} from "uuid";
import {PurchaseOrderDTO, PurchaseOrderStatus} from "../src/types/purchase-order.dto";
import {EventEmitter2} from "@nestjs/event-emitter";

describe('PurchaseOrderService', () => {
    let purchaseOrderService: PurchaseOrderService;
    let productService: jest.Mocked<ProductService>;
    let purchaseOrderRepository: jest.Mocked<PurchaseOrderRepository>;
    let eventEmitter: jest.Mocked<EventEmitter2>;

    beforeEach(async () => {
        const mockProductService = {
            getProduct: jest.fn(),
        };

        const mockPurchaseOrderRepository = {
            save: jest.fn(),
        };

        const mockEventEmitter = {
            emit: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PurchaseOrderService,
                {
                    provide: ProductService,
                    useValue: mockProductService,
                },
                {
                    provide: PurchaseOrderRepository,
                    useValue: mockPurchaseOrderRepository,
                },
                {
                    provide: EventEmitter2,
                    useValue: mockEventEmitter,
                }
            ],
        }).compile();

        purchaseOrderService = module.get<PurchaseOrderService>(PurchaseOrderService);
        productService = module.get(ProductService);
        purchaseOrderRepository = module.get(PurchaseOrderRepository)
        eventEmitter = module.get(EventEmitter2);
    });

    it('should calculate and return purchase order', async () => {
        const mockedProduct = new ProductDTO("416c89ad-c532-4f0b-92ee-d85c6d409231","video games","Xbox Series S",450);
        productService.getProduct.mockResolvedValue(mockedProduct);
        purchaseOrderRepository.save.mockResolvedValue();

        const po = new PurchaseOrderDTO(uuidv4(),1,256);

        const purchaseOrderDTO = await purchaseOrderService.savePurchaseOrder(po);
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1);
        expect(purchaseOrderRepository.save).toHaveBeenCalledTimes(1);
        expect(purchaseOrderDTO.processedBy).toEqual("system");
        expect(purchaseOrderDTO.quantity).toEqual(1);
        expect(purchaseOrderDTO.unitPrice).toEqual(450);
        expect(purchaseOrderDTO.taxes).toEqual(202.5);
        expect(purchaseOrderDTO.netTotal).toEqual(450);
        expect(purchaseOrderDTO.total).toEqual(652.5);
        expect(purchaseOrderDTO.status).toEqual(PurchaseOrderStatus.PROCESSED);
    });
});