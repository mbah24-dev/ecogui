/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/30 00:30:58 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 01:53:01 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { City, ConakryCommune } from "src/types/address.types";

export class CreateAddressDto {
	@IsEnum(ConakryCommune)
	commune: ConakryCommune;

	@IsEnum(City)
	city: City;

	@IsString()
	@IsNotEmpty()
	country: string;

	@IsString()
	@IsNotEmpty()
	description: string;
}
