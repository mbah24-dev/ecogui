import { Controller, Post, Req, UseGuards, Res, Put, Param, Get, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { IsBuyer } from 'src/decorator/is-buyer.decorator';
import { Request as RequestExpressSession, Response } from 'express'
import { IsAdmin } from 'src/decorator/is-admin.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { OrderItemStatus, OrderStatus } from '@prisma/client';
import { SellerGuard } from 'src/guards/seller.guard';
import { IsSeller } from 'src/decorator/is-seller.decorator';
import { ApproveOrderItemDto } from 'src/dto/transaction/approved-order-item.dto';
import { OrdersValidationService } from './orders-validation.service';

@Controller('transaction')
export class TransactionController {
	constructor(
		private readonly transactionService: TransactionService,
		private readonly ordersValidationService: OrdersValidationService) {}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Post('create')
	async create_transaction(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const order = await this.transactionService.create_order(req.session.user.id);
		return (res.json({ order }))
	}

	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@Put('seller/confirm/product')
	async confirm_seller_product(
		@Body() body: ApproveOrderItemDto,
		@Req() req: RequestExpressSession,
		@Res() res: Response
	) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const response = await this.ordersValidationService.seller_confirm_product_by_id(
			body.productId,
			req.session.user.id, 
			body.orderId, body.decision
		);
		return (res.json({ response }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Put('cancel/id=:orderId')
	async cancel_the_order(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: string) {
			if (!req.session.user) {
				return (res.status(401).json({ message: 'Utilisateur non connecté'}));
			}
			const order = await this.transactionService.cancel_the_order(orderId, req.session.user.id);
			return (res.json({ order }))
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@IsAdmin()
	@Get('all-orders')
	async get_all_orders(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const orders = await this.transactionService.get_orders();
		return (res.json({ orders }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Get('me/all-orders')
	async get_user_orders(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const orders = await this.transactionService.get_user_orders(req.session.user.id);
		return (res.json({ orders }));
	} 

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Get('me/all-orders/:status')
	async get_user_orders_by_status(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('status') status: OrderStatus) {
			if (!req.session.user) {
				return (res.status(401).json({ message: 'Utilisateur non connecté'}));
			}
			const orders = await this.transactionService.get_user_orders_by_status(req.session.user.id, status);
			return (res.json({ orders }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Get('me/all-orders/id/:orderId')
	async get_user_orders_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: OrderStatus) {
			if (!req.session.user) {
				return (res.status(401).json({ message: 'Utilisateur non connecté'}));
			}
			const orders = await this.transactionService.get_user_order_by_id(req.session.user.id, orderId);
			return (res.json({ orders }));
	}

	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@Get('me/seller/products/in/all_orders/')
	async retrieve_seller_products_from_orders(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('orderId') orderId: OrderStatus) {
			if (!req.session.user) {
				return (res.status(401).json({ message: 'Utilisateur non connecté'}));
			}
			const orders = await this.transactionService.retrieve_seller_products_from_orders(req.session.user.id);
			return (res.json({ orders }));
	}

	@UseGuards(JwtAuthGuard, SellerGuard)
	@IsSeller()
	@Put('approve-order-item')
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
