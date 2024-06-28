import { Invoice } from "./types/invoice";
import { PurchaseOrder } from "./types/purchase-order";
import { InvoiceService } from "./invoice-service";

const purchaseOrders : PurchaseOrder[] = [
    new PurchaseOrder(1, 10, 5.99),
    new PurchaseOrder(2, 1, 18),
    new PurchaseOrder(3, 100, 24.9),
    new PurchaseOrder(4, 50, 5),
    new PurchaseOrder(5, 100, 10),
    new PurchaseOrder(6, 1, 249),
]

const invoiceService : InvoiceService = new InvoiceService(0.12);
const invoice : Invoice = invoiceService.processInvoice(purchaseOrders);
console.log(invoice);
