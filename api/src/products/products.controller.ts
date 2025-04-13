import { Body, Controller, Post, Get, Req, Res, UseGuards, Param, Delete, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Products') // Etiquette pour regrouper les routes liées aux produits
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post('add-product')
	@UseInterceptors(FilesInterceptor('images')) // 'images' est le nom du champ dans le formulaire angular (front)
	@ApiOperation({ summary: 'Ajoute un nouveau produit avec ses images.' })
	@ApiBody({ type: CreateProductDto })
	@ApiResponse({ status: 200, description: 'Produit créé avec succès.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de l\'ajout du produit ou nombre insuffisant d\'images.' })
	async create_product(
		@Body() body: CreateProductDto,
		@UploadedFiles() files: Express.Multer.File[], // je recupere les fichiers
		@Req() req: RequestExpressSession,
		@Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}

		if (files.length < 2)
			return res.status(400).json({ message: 'Un produit doit avoir au moins 2 images.' });
			
		try {
			const productCreated = await this.productsService.create_product(body, req.session.user.id, files);
			return res.json(productCreated);
		} catch (error) {
			return res.status(400).json({ message: error.message || 'Erreur inconnue lors de l\'ajout du produit' });
		}
	}

	@Get('available/all')
	@ApiOperation({ summary: 'Récupère tous les produits disponibles.' })
	@ApiResponse({ status: 200, description: 'Liste des produits disponibles récupérée avec succès.' })
	async get_all_available_products() {
		return (await this.productsService.get_all_available_products());
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('all')
	@ApiOperation({ summary: 'Récupère tous les produits.' })
	@ApiResponse({ status: 200, description: 'Liste de tous les produits récupérée avec succès.' })
	async get_all_products() {
		return (await this.productsService.get_all_products());
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('pending/all')
	@ApiOperation({ summary: 'Récupère tous les produits en attente d\'approbation par un administrateur.' })
	@ApiResponse({ status: 200, description: 'Liste des produits en attente récupérée avec succès.' })
	async get_all_pending_products_by_admin() {
		return (await this.productsService.get_all_pending_products_by_admin());
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Put('admin/approved/product=:productId')
	@ApiOperation({ summary: 'Approuve un produit d\'un vendeur.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à approuver' })
	@ApiResponse({ status: 200, description: 'Produit approuvé avec succès.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de l\'approbation du produit.' })
	async approved_seller_product_by_id(@Param('productId') p_id: string) {
		return (await this.productsService.approved_seller_product_by_id(p_id));
	}

	@Get('id=:productId')
	@ApiOperation({ summary: 'Récupère un produit par son ID.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à récupérer' })
	@ApiResponse({ status: 200, description: 'Produit récupéré avec succès.' })
	@ApiResponse({ status: 404, description: 'Produit non trouvé.' })
	async get_product_by_id(@Param('productId') productId: string) {
		return (await this.productsService.get_product_by_id(productId));
	}

	@Get('category=:name')
	@ApiOperation({ summary: 'Récupère les produits par catégorie.' })
	@ApiParam({ name: 'name', description: 'Nom de la catégorie pour filtrer les produits' })
	@ApiResponse({ status: 200, description: 'Produits par catégorie récupérés avec succès.' })
	async get_products_by_category(@Param('name') category: string) {
		return (await this.productsService.get_products_by_category(category));
	}

	@Get('all-category')
	@ApiOperation({ summary: 'Récupère toutes les catégories de produits disponibles.' })
	@ApiResponse({ status: 200, description: 'Liste de toutes les catégories récupérée avec succès.' })
	async get_all_category() {
		return (await this.productsService.get_all_category());
	}

	@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
	@IsAdmin()
	@IsSeller()
	@Delete('id=:productId')
	@ApiOperation({ summary: 'Supprime un produit par son ID.' })
	@ApiParam({ name: 'productId', description: 'ID du produit à supprimer' })
	@ApiResponse({ status: 200, description: 'Produit supprimé avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	@ApiResponse({ status: 400, description: 'Erreur lors de la suppression du produit.' })
	async delete_product(
		@Param('productId') productId: string,
		@Req() req: RequestExpressSession,
		@Res() res: Response
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		try {
			const product_deleted = await this.productsService.delete_product(productId, req.session.user.id);
			return res.json(product_deleted);
		} catch (error) {
			return res.status(400).json({ message: error.message || 'Erreur inconnue lors de la suppression du produit' });
		}
	}

	/*@UseGuards(JwtAuthGuard, AdminOrSellerGuard)
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
			return res.json(product_updated);
		} catch (error) {
			return res.status(400).json({ message: error.message || 'Erreur inconnue lors de la mise à jour du produit' });
		}
	}*/
}
