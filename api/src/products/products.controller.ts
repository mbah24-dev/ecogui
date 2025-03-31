/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.controller.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:12 by mbah              #+#    #+#             */
/*   Updated: 2025/03/28 00:29:26 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Post, Get, Req, Res, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateProductDto } from 'src/dto/products-dto/create-product.dto';
import { Request as RequestExpressSession, Response } from 'express';
import { IsAdmin } from 'src/decorator/is-admin.decorator';
import { IsSeller } from 'src/decorator/is-seller.decorator';
import { UpdateProductDto } from 'src/dto/products-dto/update-product.dto';
import { AdminOrSellerGuard } from 'src/guards/admin-or-seller.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminOrBuyerGuard } from 'src/guards/admin-or-buyer.guard';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsSeller()
	@Post('add-product')
	async create_product(@Body() body: CreateProductDto, @Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		try {
			const productCreated = await this.productsService.create_product(body, req.session.user.id);
			return res.json( productCreated );
		} catch (error) {
			return res.status(400).json({ message: error.message || 'Erreur inconnue lors de l\'ajout du produit' });
		}
	}

	@Get('available/all')
	async get_all_available_products() {
		return (await this.productsService.get_all_available_products());
	}
	
	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('all')
	async get_all_products() {
		return (await this.productsService.get_all_products());
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('pending/all')
	async get_all_pending_products_by_admin() {
		return (await this.productsService.get_all_pending_products_by_admin());
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Put('admin/approved/product=:productId')
	async approved_seller_product_by_id(@Param('productId') p_id: string) {
		return (await this.productsService.approved_seller_product_by_id(p_id));
	}

	@Get('id=:productId')
	async get_product_by_id(@Param('productId') productId: string) {
		return (await this.productsService.get_product_by_id(productId));
	}

	@Get('category=:name')
	async get_products_by_category(@Param('name') category: string) {
		return (await this.productsService.get_products_by_category(category));
	}

	@Get('all-category')
	async get_all_category() {
		return (await this.productsService.get_all_category());
	}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsAdmin()
	@IsSeller()
	@Delete('id=:productId')
	async delete_product(@Param('productId') productId: string, @Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		try {
			const product_deleted = await this.productsService.delete_product(productId, req.session.user.id);
			return (res.json( product_deleted ));
		} catch (error) {
			return (res.status(400).json({ message: error.message || 'Erreur inconnue lors de la suppression du produit' }));
		}
	}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsSeller()
	@IsAdmin()
	@Put('id=:productId')
	async update_product(@Param('productId') productId: string,
		@Req() req: RequestExpressSession, @Res() res: Response,
		@Body() data: UpdateProductDto) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		try {
			const product_updated = await this.productsService.update_product(productId, req.session.user.id, data);
			return (res.json( product_updated ));
		} catch (error) {
			return (res.status(400).json({ message: error.message || 'Erreur inconnue lors de la mise a jour du produit' }));
		}
	}

}
