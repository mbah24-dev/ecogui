import { Controller, Post, Req, UseGuards, Res, Put, Param, Get, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { IsBuyer } from 'src/decorator/is-buyer.decorator';
import { Request as RequestExpressSession, Response } from 'express';
import { IsAdmin } from 'src/decorator/is-admin.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { OrderItemStatus, OrderStatus } from '@prisma/client';
import { SellerGuard } from 'src/guards/seller.guard';
import { IsSeller } from 'src/decorator/is-seller.decorator';
import { ApproveOrderItemDto } from 'src/dto/transaction/approved-order-item.dto';
import { OrdersValidationService } from './orders-validation.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Transactions') // Etiquette pour regrouper les routes liées aux transactions
@Controller('transaction')
export class TransactionController {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly ordersValidationService: OrdersValidationService) {}

	@Post('create')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@ApiOperation({ summary: 'Créer une nouvelle commande.' })
	@ApiResponse({ status: 200, description: 'Commande créée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async create_transaction(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const order = await this.transactionService.create_order(req.session.user.id);
		return res.json({ order });
	}

	@Put('seller/confirm/product')
	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@ApiOperation({ summary: 'Le vendeur confirme un produit dans une commande.' })
	@ApiBody({ type: ApproveOrderItemDto })
	@ApiResponse({ status: 200, description: 'Produit confirmé avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async confirm_seller_product(
		@Body() body: ApproveOrderItemDto,
		@Req() req: RequestExpressSession,
		@Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const response = await this.ordersValidationService.seller_confirm_product_by_id(
			body.productId,
			req.session.user.id, 
			body.orderId, body.decision
		);
		return res.json({ response });
	}

	@Put('cancel/id=:orderId')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@ApiOperation({ summary: 'Annuler une commande.' })
	@ApiParam({ name: 'orderId', description: 'ID de la commande à annuler.' })
	@ApiResponse({ status: 200, description: 'Commande annulée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async cancel_the_order(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const order = await this.transactionService.cancel_the_order(orderId, req.session.user.id);
		return res.json({ order });
	}

	@Get('all-orders')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@ApiOperation({ summary: 'Récupère toutes les commandes.' })
	@ApiResponse({ status: 200, description: 'Liste de toutes les commandes récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_all_orders(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const orders = await this.transactionService.get_orders();
		return res.json({ orders });
	}

	@Get('me/all-orders')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@ApiOperation({ summary: 'Récupère toutes les commandes de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Liste des commandes de l\'utilisateur récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_orders(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const orders = await this.transactionService.get_user_orders(req.session.user.id);
		return res.json({ orders });
	}

	@Get('me/all-orders/:status')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@ApiOperation({ summary: 'Récupère les commandes de l\'utilisateur connecté par statut.' })
	@ApiParam({ name: 'status', description: 'Statut de la commande (ex : PENDING, COMPLETED, etc.).' })
	@ApiResponse({ status: 200, description: 'Commandes par statut récupérées avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_orders_by_status(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('status') status: OrderStatus
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const orders = await this.transactionService.get_user_orders_by_status(req.session.user.id, status);
		return res.json({ orders });
	}

	@Get('me/all-orders/id/:orderId')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@ApiOperation({ summary: 'Récupère une commande spécifique de l\'utilisateur connecté.' })
	@ApiParam({ name: 'orderId', description: 'ID de la commande à récupérer.' })
	@ApiResponse({ status: 200, description: 'Commande spécifique récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_user_orders_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const order = await this.transactionService.get_user_order_by_id(req.session.user.id, orderId);
		return res.json({ order });
	}

	@Get('me/seller/products/in/all_orders/')
	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@ApiOperation({ summary: 'Récupère les produits du vendeur dans toutes les commandes.' })
	@ApiResponse({ status: 200, description: 'Produits récupérés avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async retrieve_seller_products_from_orders(
		@Req() req: RequestExpressSession,
		@Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const orders = await this.transactionService.retrieve_seller_products_from_orders(req.session.user.id);
		return res.json({ orders });
	}

	@Put('approve-order-item')
	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@ApiOperation({ summary: 'Approuver ou rejeter un produit dans une commande.' })
	@ApiBody({ type: ApproveOrderItemDto })
	@ApiResponse({ status: 200, description: 'Produit approuvé ou rejeté avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async approve_or_reject_order_items(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Body() { productId, orderId, decision }: ApproveOrderItemDto
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}

		const updatedOrderItem = await this.transactionService.approve_or_reject_order_items(
			req.session.user.id, productId, decision, orderId
		);

		return res.status(200).json({ updatedOrderItem });
	}
}
