/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   set-user-role.dto.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 17:32:19 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 01:43:02 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class SetUserRoleDto {
  @IsEnum(Role, { message: 'Le rôle doit être ADMIN, SELLER, BUYER_AND_SELLER ou BUYER' })
  role: Role;
}
