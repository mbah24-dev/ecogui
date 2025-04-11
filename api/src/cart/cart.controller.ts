/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 01:59:36 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 00:24:51 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { IsBuyer } from 'src/decorator/is-buyer.decorator';
import { Request as RequestExpressSession, Response } from 'express'
import { AdminGuard } from 'src/guards/admin.guard';
import { AddProductToCartDto } from 'src/dto/cart/add-product-to-cart.dto';
import { IsAdmin } from 'src/decorator/is-admin.decorator';
import { AdminOrBuyerGuard } from 'src/guards/admin-or-buyer.guard';

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Post('add-item/product=:productId')
	async add_product_to_cart(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const cartItem = await this.cartService.add_product_to_cart({productId, userId: req.session.user.id});
		return (res.json({ cartItem }));
	}

	@UseGuards(JwtAuthGuard, AdminOrBuyerGuard)
	@Delete('delete-item/product=:productId')
	async delete_an_product_to_cart(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const item_deleted = await this.cartService.delete_an_product_to_cart(productId, req.session.user.id);
		return (res.json({ item_deleted }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard, AdminGuard)
	@IsBuyer()
	@Delete('clear')
	async clear_the_cart(
		@Req() req: RequestExpressSession,
		@Res() res: Response) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const response = await this.cartService.clear_the_cart(req.session.user.id);
		return (res.json(response));
	}

	@UseGuards(JwtAuthGuard, AdminOrBuyerGuard)
	@Put('update-item/product=:productId')
	async update_an_product_to_cart(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string,
		@Body() body: AddProductToCartDto) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const item_updated = await this.cartService.update_an_product_to_cart(productId, req.session.user.id, body.quantity);
		return (res.json({ item_updated }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@IsBuyer()
	@Get('me')
	async get_current_user_cart(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const cart = await this.cartService.get_current_user_cart(req.session.user.id);
		return (res.json({ cart }));
	}
}
