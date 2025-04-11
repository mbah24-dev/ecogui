/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   format-image.service.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/11 02:35:53 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 02:45:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp'; // Pour manipuler et redimensionner les images si nécessaire
import * as uuid from 'uuid'; // Pour générer des noms uniques

@Injectable()
export class FormatImageService {
	constructor(private readonly prismaService: PrismaService) {}

	async upload_images(images: any, product: any) {
		const imagePromises = images.map(async (image) => {
			const imageBuffer = Buffer.from(image, 'base64'); 
			const imageName = uuid.v4() + path.extname(image);
			const imagePath = path.join(__dirname, 'src/product/image-upload', imageName);
			try {
				if (!fs.existsSync(path.dirname(imagePath))) {
					fs.mkdirSync(path.dirname(imagePath), { recursive: true });
				}

				await sharp(imageBuffer).toFile(imagePath);

				await this.prismaService.productImage.create({
					data: {
						url: imageName,
						productId: product.id
					}
				});
			} catch (error) {
				console.error('Erreur lors de l\'upload de l\'image', error);
				throw new HttpException('Erreur lors de l\'upload de l\'image', HttpStatus.BAD_REQUEST);
			}
		});

		await Promise.all(imagePromises);
	}
}