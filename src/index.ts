import { Invoice } from "./invoice";
import { InvoiceItem } from "./invoice-item";
import { InvoiceService } from "./invoice-service";

// https://momentjs.com/docs/#/parsing/now/
var moment = require('moment'); // require
console.log(moment());
console.log(moment().format());
console.log(moment("2024-06-22T02:33:01-03:00").format()); //only ISO-8601 format https://en.wikipedia.org/wiki/ISO_8601
console.log(moment(1318781876406).format());
console.log(moment(new Date(2011, 9, 16)).format());
console.log(moment([2010, 1, 14, 15, 25, 50, 125]).format());
console.log(moment.utc().format());
console.log(moment.parseZone("2013-01-01T00:00:00-13:00").utcOffset());
console.log(moment().creationData());
console.log(moment({hour: 5, minute: 10, seconds: 20, milliseconds: 300}).format());
console.log(moment([2007, 10, 29]).fromNow());
console.log(moment([2007, 10, 29]).fromNow(true)); //without sufix "ago"
console.log(moment([2017, 1, 28]).from(moment()));
console.log(moment().toNow());
console.log(moment([2017, 1, 28]).toNow());
console.log(moment().to(moment([2017, 1, 28])));
console.log(moment().diff(moment([2017, 1, 28])));//milliseconds
console.log(moment().toDate());
console.log(moment('2010-10-20').isSame('2010-10-21'));
console.log(moment('2010-10-20').isAfter('2010-10-19'));
console.log(moment('2010-10-20').isSameOrBefore('2010-10-21'));
console.log(moment('2010-10-20').isSameOrAfter('2010-10-21'));
console.log(moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'));
console.log(moment('2024-06-22T02:33:01-03:00').isBetween('2024-06-22T02:35:01-03:00', '2024-06-22T02:38:01-03:00'));
console.log(moment().toNow()); //default en
moment.locale('fr');
console.log(moment().toNow());
moment.locale('pt');
console.log(moment().toNow());
moment.locale('pt-BR');
console.log(moment().toNow());

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
