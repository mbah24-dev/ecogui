import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Request as RequestExpressSession, Response } from 'express';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { InvoiceStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Invoice') // Etiquette pour regrouper les routes liées aux factures
@Controller('invoice')
export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceService) {}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Post('generate/:orderId')
	@ApiOperation({ summary: 'Génère une facture pour une commande donnée.' })
	@ApiParam({ name: 'orderId', description: 'ID de la commande pour laquelle la facture doit être générée' })
	@ApiResponse({ status: 200, description: 'Facture générée avec succès.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de la génération de la facture.' })
	async generate_invoice(@Param('orderId') orderId: string) {
		return (await this.invoiceService.generateInvoice(orderId));
	}

	@UseGuards(JwtAuthGuard)
	@Get('download/:invoiceId')
	@ApiOperation({ summary: 'Télécharge une facture spécifique.' })
	@ApiParam({ name: 'invoiceId', description: 'ID de la facture à télécharger' })
	@ApiResponse({ status: 200, description: 'Facture téléchargée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	@ApiResponse({ status: 404, description: 'Facture non trouvée.' })
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
			return res.download(filePath);
		} catch (error) {
			return res.status(error.getStatus()).json({ message: error.message });
		}
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('all')
	@ApiOperation({ summary: 'Récupère toutes les factures.' })
	@ApiResponse({ status: 200, description: 'Liste de toutes les factures récupérée avec succès.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de la récupération des factures.' })
	async get_all_invoice() {
		return (await this.invoiceService.get_all_invoices());
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/all')
	@ApiOperation({ summary: 'Récupère toutes les factures de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Liste des factures de l\'utilisateur récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_invoices(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.get_user_invoices(req.session.user.id));
	}

	@UseGuards(JwtAuthGuard)
	@Get('invoiceId/:invoiceId')
	@ApiOperation({ summary: 'Récupère une facture par son ID.' })
	@ApiParam({ name: 'invoiceId', description: 'ID de la facture à récupérer' })
	@ApiResponse({ status: 200, description: 'Facture récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	@ApiResponse({ status: 404, description: 'Facture non trouvée.' })
	async get_invoice_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.get_invoice_by_id(req.session.user.id, inv_id));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Put('validate/:invoiceId')
	@ApiOperation({ summary: 'Marque une facture comme payée.' })
	@ApiParam({ name: 'invoiceId', description: 'ID de la facture à marquer comme payée' })
	@ApiResponse({ status: 200, description: 'Facture marquée comme payée.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de la mise à jour de la facture.' })
	async markInvoiceAsPaid(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.markInvoiceAsPaid(inv_id));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Delete('delete/invoice/:invoiceId')
	@ApiOperation({ summary: 'Supprime une facture par son ID.' })
	@ApiParam({ name: 'invoiceId', description: 'ID de la facture à supprimer' })
	@ApiResponse({ status: 200, description: 'Facture supprimée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	@ApiResponse({ status: 404, description: 'Facture non trouvée.' })
	async deleteInvoice(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('invoiceId') inv_id: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.deleteInvoice(inv_id));
	}

	@UseGuards(JwtAuthGuard)
	@Get('order/:orderId/me')
	@ApiOperation({ summary: 'Récupère la facture d\'une commande spécifique de l\'utilisateur.' })
	@ApiParam({ name: 'orderId', description: 'ID de la commande pour récupérer la facture' })
	@ApiResponse({ status: 200, description: 'Facture de la commande récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_invoice_by_order_user(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		return res.json(await this.invoiceService.get_invoice_by_user_order(orderId, req.session.user.id));
	}

	@UseGuards(JwtAuthGuard)
	@Get('me/status/:status')
	@ApiOperation({ summary: 'Récupère les factures de l\'utilisateur selon leur statut.' })
	@ApiParam({ name: 'status', description: 'Statut des factures (ex: PENDING, PAID)' })
	@ApiResponse({ status: 200, description: 'Factures récupérées selon le statut.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
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
