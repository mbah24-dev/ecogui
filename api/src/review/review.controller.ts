import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Request as RequestExpressSession, Response } from 'express';
import { CreateReviewDto } from 'src/dto/review/create-review.dto';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { UpdateReviewDto } from 'src/dto/review/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Importation des décorateurs Swagger

@ApiTags('Reviews') // Etiquette pour regrouper les routes liées aux critiques
@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create/product=:productId')
	@UseGuards(JwtAuthGuard, BuyerGuard)
	@ApiOperation({ summary: 'Créer une nouvelle critique pour un produit.' })
	@ApiParam({ name: 'productId', description: 'ID du produit pour lequel la critique est créée.' })
	@ApiBody({ type: CreateReviewDto })
	@ApiResponse({ status: 200, description: 'Critique créée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async create_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string,
		@Body() data: CreateReviewDto
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const review = await this.reviewService.add_review(req.session.user.id, productId, data);
		return res.json({ review });
	}

	@Get('all-reviews')
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Récupère toutes les critiques.' })
	@ApiResponse({ status: 200, description: 'Liste de toutes les critiques récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_all_reviews(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const all_reviews = await this.reviewService.get_all_reviews();
		return res.json({ all_reviews });
	}

	@Get('product/all-reviews/:productId')
	@ApiOperation({ summary: 'Récupère toutes les critiques d\'un produit.' })
	@ApiParam({ name: 'productId', description: 'ID du produit pour lequel on récupère les critiques.' })
	@ApiResponse({ status: 200, description: 'Liste des critiques du produit récupérée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async get_all_product_reviews(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const all_product_reviews = await this.reviewService.get_all_product_reviews(productId);
		return res.json({ all_product_reviews });
	}

	@Get('reviewId=:reviewId')
	@ApiOperation({ summary: 'Récupère une critique par son ID.' })
	@ApiParam({ name: 'reviewId', description: 'ID de la critique à récupérer.' })
	@ApiResponse({ status: 200, description: 'Critique récupérée avec succès.' })
	@ApiResponse({ status: 404, description: 'Critique non trouvée.' })
	async get_reviews_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const review = await this.reviewService.get_review_by_id(reviewId);
		return res.json({ review });
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Put('update/:reviewId')
	@ApiOperation({ summary: 'Met à jour une critique.' })
	@ApiParam({ name: 'reviewId', description: 'ID de la critique à mettre à jour.' })
	@ApiBody({ type: UpdateReviewDto })
	@ApiResponse({ status: 200, description: 'Critique mise à jour avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async update_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string,
		@Body() data: UpdateReviewDto
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const updated_review = await this.reviewService.update_review(req.session.user.id, reviewId, data);
		return res.json({ updated_review });
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Put('deleted/:reviewId')
	@ApiOperation({ summary: 'Supprime une critique.' })
	@ApiParam({ name: 'reviewId', description: 'ID de la critique à supprimer.' })
	@ApiResponse({ status: 200, description: 'Critique supprimée avec succès.' })
	@ApiResponse({ status: 401, description: 'Utilisateur non connecté.' })
	async delete_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string
	) {
		if (!req.session.user) {
			return res.status(401).json({ message: 'Utilisateur non connecté' });
		}
		const deleted_review = await this.reviewService.delete_review(req.session.user.id, reviewId);
		return res.json({ deleted_review });
	}
}
