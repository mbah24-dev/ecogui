/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-review.dto.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/30 14:11:57 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 14:12:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateReviewDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	message: string;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(10)
	rating: number
}