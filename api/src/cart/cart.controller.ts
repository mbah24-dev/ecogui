/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cart.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/12 17:37:17 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 17:37:18 by mbah             ###   ########.fr       */
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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Cart') // Etiquette pour regrouper les routes liées au panier
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Post('add-item/product=:productId')
	@ApiOperation({ summary: 'Ajoute un produit au panier de l\'utilisateur.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à ajouter au panier' })
	@ApiResponse({ status: 200, description: 'Produit ajouté au panier.' })
	@ApiResponse({ status: 400, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Supprime un produit du panier.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à supprimer du panier' })
	@ApiResponse({ status: 200, description: 'Produit supprimé du panier.' })
	@ApiResponse({ status: 400, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Vide le panier de l\'utilisateur.' })
	@ApiResponse({ status: 200, description: 'Panier vidé avec succès.' })
	@ApiResponse({ status: 400, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Met à jour la quantité d\'un produit dans le panier.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à mettre à jour dans le panier' })
	@ApiBody({ type: AddProductToCartDto })
	@ApiResponse({ status: 200, description: 'Produit mis à jour dans le panier.' })
	@ApiResponse({ status: 400, description: 'Utilisateur non connecté.' })
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
	@ApiOperation({ summary: 'Récupère le panier de l\'utilisateur connecté.' })
	@ApiResponse({ status: 200, description: 'Panier récupéré avec succès.' })
	@ApiResponse({ status: 400, description: 'Utilisateur non connecté.' })
	async get_current_user_cart(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(400).json({ message: 'utilisateur non connecter' }));
		}
		const cart = await this.cartService.get_current_user_cart(req.session.user.id);
		return (res.json({ cart }));
	}
}
