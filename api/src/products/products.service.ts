/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   products.service.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:16 by mbah              #+#    #+#             */
/*   Updated: 2025/03/27 17:58:36 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductStatus, Role } from '@prisma/client';
import { url } from 'inspector';
import { CreateProductDto } from 'src/dto/products-dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/products-dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create_product(data: CreateProductDto, sellerId: string) {
        const { name, description, price, stock, categoryId, images }: CreateProductDto = data;
        // Démarrage de la transaction
		const existingProduct = await this.prismaService.product.findFirst({
			where: {
				sellerId,
				name,
				price,
				categoryId
			}
		});
		if (existingProduct) {
			throw new HttpException(
				'Vous avez déja ajouter ce produit, Pensez a le modifier si besoin',
				HttpStatus.CONFLICT
			);
		}
        const productCreated = await this.prismaService.$transaction(async (prisma) => {
            const product = await prisma.product.create({
                data: {
                    name, 
                    description, 
                    price, 
                    stock, 
                    categoryId, 
                    sellerId,
					status: ProductStatus.PENDING
                }
            });
            // Ajout des images
            const imagePromises = images.map(image => 
                prisma.productImage.create({
                    data: {
                        url: image,
                        productId: product.id
                    }
                })
            );
            // Attendre que toutes les images soient créées
            await Promise.all(imagePromises);
            return (product);
        });
        if (!productCreated) {
            throw new HttpException('Impossible d\'ajouter ce produit', HttpStatus.BAD_REQUEST);
        }
        return (productCreated);
    }

	async get_all_products() {
		const products = await this.prismaService.product.findMany({
			include: {
				images: true,
				seller: true
			}
		});

		if (!products || products.length === 0)
			throw new HttpException('Aucun produit sur l\'app', HttpStatus.NOT_FOUND);
		return (products);
	}

	async get_all_available_products() {
		const products = await this.prismaService.product.findMany({
			where: { status: ProductStatus.AVAILABLE },
			include: {
				images: true,
				seller: true
			}
		});

		if (!products || products.length === 0)
			throw new HttpException('Aucun produit disponible pour l\'instant', HttpStatus.NOT_FOUND);
		return (products);
	}

	async get_all_pending_products_by_admin() {
		const products = await this.prismaService.product.findMany({
			where: { status: ProductStatus.PENDING },
			include: {
				images: true,
				seller: true
			}
		});

		if (!products || products.length === 0)
			throw new HttpException('Aucun produit à valider pour l\'instant', HttpStatus.NOT_FOUND);
		return (products);
	}

	async approved_seller_product_by_id(productId: string) {
		try {
			const approved_product = await this.prismaService.product.update({
				where: { id: productId },
				data: {
					status: ProductStatus.AVAILABLE
				}
			});
			return (approved_product);
		} catch (error) {
			throw new HttpException('Impossible d\'approuver ce produits', HttpStatus.BAD_REQUEST);
		}
	}

	async get_product_by_id(productId: string) {
		const product = await this.prismaService.product.findUnique({
			where: {
				id: productId
			},
			include: {
				images: true
			}
		});
		if (!product)
			throw new HttpException('Aucun produit associer', HttpStatus.NOT_FOUND);
		return (product);
	}

	async get_products_by_category(categoryName: string) {
		const category = await this.prismaService.category.findUnique({
			where: {
				name: categoryName
			}
		});
		if (!category)
			throw new HttpException('Cette categorie est indisponible', HttpStatus.NOT_FOUND);
		const products  = await this.prismaService.product.findMany({
			where: {
				categoryId: category.id
			},
			include: {
				images: true
			}
		});
		if (!products || products.length === 0)
			throw new HttpException('Aucun produit associer à cette categorie', HttpStatus.NOT_FOUND);
		return (products);
	}

	async get_all_category() {
		return (await this.prismaService.category.findMany());
	}

	async delete_product(productId: string, userId: string) {
        try {
			const product = await this.prismaService.product.findUnique({
				where: { id: productId }
			});
			const user = await this.prismaService.user.findUnique({
				where: {id: userId}
			});

			if (!product || !user)
				throw new HttpException('Aucun produit associer', HttpStatus.NOT_FOUND);
			if ((product.sellerId !== userId) && (user.role !== Role.ADMIN))
				throw new HttpException('Accès refusé : Vous n’êtes pas autorisé à supprimer ce produit', HttpStatus.FORBIDDEN);
            return await this.prismaService.$transaction(async (prisma) => {
                await prisma.productImage.deleteMany({ where: { productId } });
                return await prisma.product.delete({ where: { id: productId } });
            });
        } catch (error) {
            throw new HttpException(error.message || 'Erreur lors de la suppression du produit', HttpStatus.BAD_REQUEST);
        }
    }

	async update_product(productId: string, sellerId: string, data: UpdateProductDto) {
		try {
			const product = await this.get_product_by_id(productId);
			if (!product)
				throw new HttpException('Produit non trouvé', HttpStatus.NOT_FOUND);
			if (product.sellerId !== sellerId)
				throw new HttpException('Accès refusé : Vous n\'êtes pas le propriétaire de ce produit', HttpStatus.FORBIDDEN);
			const product_updated = await this.prismaService.product.update({
				where: {
					id: productId,
				},
				data: {
					...data,
					images: data.images ? { deleteMany: {}, create: data.images.map((url) => ({ url }))} : undefined
				},
				include: {
					images: true
				}
			});
			return (product_updated);
		} catch (error) {
			throw new HttpException(error.message || 'Erreur inconnu lors de la mise à jour du produit', HttpStatus.BAD_REQUEST);
		}
	}

}

