/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/30 01:31:05 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 01:51:31 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { City, ConakryCommune } from "src/types/address.types";

export class UpdateAddressDto {
	@IsOptional()
	@IsEnum(ConakryCommune)
	commune: ConakryCommune;

	@IsOptional()
	@IsEnum(City)
	city: City;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	country: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string;
}