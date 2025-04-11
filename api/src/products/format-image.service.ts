/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   format-image.service.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/11 02:35:53 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 01:32:35 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
	Injectable,
	HttpException,
	HttpStatus
  } from '@nestjs/common';
  import * as sharp from 'sharp';
  import * as fs from 'fs';
  import * as path from 'path';
  import * as uuid from 'uuid';
import { get_upload_path } from 'src/utility/get_path';
  
  @Injectable()
  export class FormatImageService {
	
	async upload_images(files: Express.Multer.File[], product: any, prismaService: any) {
	  const imagePromises = files.map(async (file) => {
		try {
		  const extension = file.mimetype.split('/')[1];
		  const imageName = `${uuid.v4()}.${extension}`;
		  const uploadDir = get_upload_path('images', 'products');
		  const imagePath = path.join(uploadDir, imageName);

		  if (!fs.existsSync(path.dirname(imagePath))) {
			fs.mkdirSync(path.dirname(imagePath), { recursive: true });
		  }
  
		  await sharp(file.buffer)
			.resize(800, 800)
			.toFile(imagePath);
  
		  await prismaService.productImage.create({
			data: {
			  url: imageName,
			  productId: product.id,
			},
		  });
		} catch (error) {
		  console.error('Erreur lors de l\'upload de l\'image', error);
		  throw new HttpException('Erreur lors de l\'upload de l\'image', HttpStatus.BAD_REQUEST);
		}
	  });
  
	  await Promise.all(imagePromises);
	}
  }
  