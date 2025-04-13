/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   send-email.dto.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 03:43:50 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 18:12:51 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class SendEmailDto {

  @ApiProperty({
    description: 'L\'adresse email de l\'utilisateur à laquelle envoyer l\'email',
    type: String,
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

