/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 16:47:10 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 23:30:21 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ArrayMinSize, IsArray, IsInt, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class UpdateProductDto {
	@IsOptional()
	@IsString()
	name:	string

	@IsOptional()
	@IsString()
	description:	string;
	
	@IsOptional()
	@IsNumber()
	@Min(0)
	price:	number;

	@IsOptional()
	@IsInt({ message: 'Le stock doit être un nombre entier' })
	@Min(0, { message: 'Le stock ne peut pas être négatif' })
	stock: number;

	@IsOptional()
	@IsUUID()
	categoryId:	string;

	/*@IsOptional()
	@IsArray()
	@ArrayMinSize(2, { message: 'Un produit doit avoir au moins 2 images.' })
	@IsString({ each: true})
	images: string[]*/
}