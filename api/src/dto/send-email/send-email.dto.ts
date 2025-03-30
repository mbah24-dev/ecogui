/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   send-email.dto.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:50 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 03:43:51 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string
}
