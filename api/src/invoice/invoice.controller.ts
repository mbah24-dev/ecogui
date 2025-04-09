import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Request as RequestExpressSession, Response } from 'express';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { InvoiceStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	@Post('generate/:orderId')
	async generate_invoice(@Param('orderId') orderId: string) {
		return (await this.invoiceService.generateInvoice(orderId));
	}

	@UseGuards(JwtAuthGuard)
	@Get('download/:invoiceId')
	async downloadInvoice(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') invoiceId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}

		try {
			const filePath = await this.invoiceService.getInvoiceFilePath(
				req.session.user.id, 
				req.session.user.role, 
				invoiceId
			);
			return (res.download(filePath));
		} catch (error) {
			return res.status(error.getStatus()).json({ message: error.message });
		}
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('all')
	async get_all_invoice() {
		return (await this.invoiceService.get_all_invoices());
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/all')
	async get_user_invoices(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return (res.json(await this.invoiceService.get_user_invoices(req.session.user.id)));
	}

	@UseGuards(JwtAuthGuard)
	@Get('invoiceId/:invoiceId')
	async get_invoice_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string) {
			if (!req.session.user) {
				return res.status(401).json({ message: 'Utilisateur non connecté' });
			}
			return (res.json(await this.invoiceService.get_invoice_by_id(inv_id)));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Put('validate/invoice/:invoiceId')
	async markInvoiceAsPaid(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string) {
			if (!req.session.user) {
				return res.status(401).json({ message: 'Utilisateur non connecté' });
			}
			return (res.json(await this.invoiceService.markInvoiceAsPaid(inv_id)));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Delete('delete/invoice/:invoiceId')
	async deleteInvoice(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string) {
			if (!req.session.user) {
				return res.status(401).json({ message: 'Utilisateur non connecté' });
			}
			return (res.json(await this.invoiceService.deleteInvoice(inv_id)));
	}

	@UseGuards(JwtAuthGuard)
	@Get('order/:orderId/me')
	async get_invoice_by_order_user(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.get_invoice_by_order_user(orderId, req.session.user.id));
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/status/:status')
	async get_invoices_by_status(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('status') status: InvoiceStatus
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.get_invoices_by_status(req.session.user.id, status));
	}

}
