import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { CreateReviewDto } from 'src/dto/review/create-review.dto';
import { UpdateReviewDto } from 'src/dto/review/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
	constructor(private readonly prismaService: PrismaService) {}

	async add_review(userId: string, productId: string, reviewData: CreateReviewDto) {
		const product = await this.prismaService.product.findUnique({
			where: { id: productId }
		});

		if (!product || product.status !== ProductStatus.AVAILABLE) 
			throw new HttpException('Aucun produit trouvé', HttpStatus.NOT_FOUND);

		if (product.sellerId === userId)
			throw new HttpException('Vous ne pouvez pas noté ce produits, car il est a vous', HttpStatus.BAD_REQUEST);

		const existingReview = await this.prismaService.review.findFirst({
			where: { userId, productId }
		});
		
		if (existingReview) {
			throw new HttpException('Vous avez déjà laissé un avis pour ce produit', HttpStatus.BAD_REQUEST);
		}
		
		const review = await this.prismaService.review.create({
			data: { ...reviewData, userId, productId }
		});

		return (review);
	}

	async get_all_reviews() {
		const reviews = await this.prismaService.review.findMany({
			include: { user: true, product: true }
		});

		if (!reviews || reviews.length === 0)
			throw new HttpException('Aucun commentaire trouvé', HttpStatus.NOT_FOUND);

		return (reviews);
	}

	async get_all_product_reviews(productId: string) {
		const product_reviews  = await this.prismaService.review.findMany({
			where: { productId },
			include: { user: true, product: true },
		});

		if (!product_reviews || product_reviews.length === 0)
			throw new HttpException('Aucun commentaire pour ce produit', HttpStatus.NOT_FOUND);

		return (product_reviews);
	}

	async get_review_by_id(reviewId: string) {
		const review = await this.prismaService.review.findUnique({
			where: { id: reviewId },
			include: { user: true, product: true }
		});

		if (!review)
			throw new HttpException('Aucun commentaire trouvé pour cet identifiant', HttpStatus.NOT_FOUND);

		return (review);
	}

	async update_review(userId: string, reviewId: string, reviewData: UpdateReviewDto) {
		const review = await this.prismaService.review.findUnique({
			where: { id: reviewId },
			include: { user: true, product: true }
		});

		if (!review)
			throw new HttpException('Aucun commentaire trouvé pour cet identifiant', HttpStatus.NOT_FOUND);

		if (review.userId !== userId)
			throw new HttpException('Accès refusé: vous ne pouvez pas modifier ce commentaire', HttpStatus.FORBIDDEN);

		const new_review = await this.prismaService.review.update({
			where: { id: reviewId },
			data: { ...reviewData }
		});

		return (new_review);
	}

	async delete_review(userId: string, reviewId: string) {
		const review = await this.prismaService.review.findUnique({
			where: { id: reviewId },
			include: { user: true, product: true }
		});

		if (!review)
			throw new HttpException('Aucun commentaire trouvé pour cet identifiant', HttpStatus.NOT_FOUND);

		if (review.userId !== userId)
			throw new HttpException('Accès refusé: vous ne pouvez pas supprimer ce commentaire', HttpStatus.FORBIDDEN);

		const deleted_review = await this.prismaService.review.delete({
			where: { id: reviewId }
		})

		return (deleted_review);
	}
}
