/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login-user.dto.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:32:15 by mbah              #+#    #+#             */
/*   Updated: 2025/03/16 01:58:58 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  role: Role;
}
