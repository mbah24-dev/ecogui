/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   set-user-role.dto.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 17:32:19 by mbah              #+#    #+#             */
/*   Updated: 2025/04/12 18:14:28 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';  // Importer ApiProperty pour Swagger

export class SetUserRoleDto {
  
  @ApiProperty({
    description: 'Le rôle de l\'utilisateur à définir. Les valeurs possibles sont ADMIN, SELLER, BUYER_AND_SELLER ou BUYER.',
    enum: Role,  // Utiliser l'enum Role pour générer la liste des rôles possibles
    example: Role.ADMIN,  // Exemple de rôle
  })
  @IsEnum(Role, { message: 'Le rôle doit être ADMIN, SELLER, BUYER_AND_SELLER ou BUYER' })
  role: Role;
}

