import { Controller, Param, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	@Post('generate/:orderId')
	async generate_invoice(@Param('orderId') orderId: string) {
		return (this.invoiceService.generateInvoice(orderId));
	}
}
