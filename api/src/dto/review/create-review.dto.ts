/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-review.dto.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/30 14:08:32 by mbah              #+#    #+#             */
/*   Updated: 2025/03/30 14:11:51 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
	@IsString()
	@IsNotEmpty()
	message: string;

	@IsInt()
	@Min(0)
	@Max(10)
	rating: number
}
