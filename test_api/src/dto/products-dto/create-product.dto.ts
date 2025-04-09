/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 15:17:29 by mbah              #+#    #+#             */
/*   Updated: 2025/03/25 21:40:48 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ArrayMinSize, IsArray, IsInt, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateProductDto {
	@IsString()
	name:	string

	@IsString()
	description:	string;
	
	@IsNumber()
	@Min(0)
	price:	number;

	@IsInt()
	@Min(0)
	stock:	number;

	@IsUUID()
	categoryId:	string;

	@IsArray()
	@ArrayMinSize(2, { message: 'Un produit doit avoir au moins 2 images.' })
	@IsString({ each: true})
	images: string[]
}