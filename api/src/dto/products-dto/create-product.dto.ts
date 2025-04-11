/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 15:17:29 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 00:30:08 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateProductDto {
	@IsString()
	name:	string

	@IsString()
	description:	string;
	
	@Transform(({ value }) => parseFloat(value))
	@IsNumber()
	@Min(0)
	price:	number;

	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@Min(0)
	stock:	number;

	@IsUUID()
	categoryId:	string;

	/*@IsArray()
	@ArrayMinSize(2, { message: 'Un produit doit avoir au moins 2 images.' })
	@IsString({ each: true})
	images: string[]*/

	/*@IsArray()
	@ArrayMinSize(2) // au moins 2 images
	images: Express.Multer.File[]; // On attend un tableau de fichiers, pas de chaînes*/
}