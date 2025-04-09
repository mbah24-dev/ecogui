/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-user.dto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:12:01 by mbah              #+#    #+#             */
/*   Updated: 2025/04/08 00:10:45 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;
  
	@MinLength(6)
	@IsNotEmpty()
	password: string;
  
	@IsNotEmpty()
	@Matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/, {
		message: 'Name must be a full name (at least first and last name, letters only)',
	})
	name: string;
  
	role: Role;
  }
