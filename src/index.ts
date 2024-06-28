import { Invoice } from "./invoice";
import { InvoiceItem } from "./invoice-item";
import { InvoiceService } from "./invoice-service";

const invoiceItems : InvoiceItem[] = [
    new InvoiceItem(1, 10, 5.99),
    new InvoiceItem(2, 1, 18),
    new InvoiceItem(3, 100, 24.9),
    new InvoiceItem(4, 50, 5),
    new InvoiceItem(5, 100, 10),
    new InvoiceItem(6, 1, 249),
]

const invoiceService : InvoiceService = new InvoiceService(0.12);
const invoice : Invoice = invoiceService.processInvoice(invoiceItems);
console.log(invoice);
