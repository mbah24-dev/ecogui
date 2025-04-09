import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Request as RequestExpressSession, Response } from 'express'
import { CreateReviewDto } from 'src/dto/review/create-review.dto';
import { BuyerGuard } from 'src/guards/buyer.guard';
import { UpdateReviewDto } from 'src/dto/review/update-review.dto';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Post('create/product=:productId')
	async create_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string,
		@Body() data: CreateReviewDto) {
			if (!req.session.user) {
				return (res.status(401).json({ message: 'Utilisateur non connecté'}));
			}
			const review = await this.reviewService.add_review(req.session.user.id, productId, data);
			return (res.json({ review }));
	}

	@UseGuards(JwtAuthGuard, AdminGuard)
	@Get('all-reviews')
	async get_all_reviews(@Req() req: RequestExpressSession, @Res() res: Response) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const all_reviews = await this.reviewService.get_all_reviews();
		return (res.json({ all_reviews }));
	}

	@Get('product/all-reviews/:productId')
	async get_all_product_reviews(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('productId') productId: string) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const all_product_reviews = await this.reviewService.get_all_product_reviews(productId);
		return (res.json({ all_product_reviews }));
	}

	@Get('reviewId=:reviewId')
	async get_reviews_by_id(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const review = await this.reviewService.get_review_by_id(reviewId);
		return (res.json({ review }));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Put('update/:reviewId')
	async update_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string,
		@Body() data: UpdateReviewDto) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const updated_review = await this.reviewService.update_review(req.session.user.id, reviewId, data);
		return (res.json({ updated_review}));
	}

	@UseGuards(JwtAuthGuard, BuyerGuard)
	@Put('deleted/:reviewId')
	async delete_review(
		@Req() req: RequestExpressSession,
		@Res() res: Response,
		@Param('reviewId') reviewId: string) {
		if (!req.session.user) {
			return (res.status(401).json({ message: 'Utilisateur non connecté'}));
		}
		const deleted_review = await this.reviewService.delete_review(req.session.user.id, reviewId);
		return (res.json({ deleted_review}));
	}

}
