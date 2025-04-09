
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   admin.guard.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/16 01:25:54 by mbah              #+#    #+#             */
/*   Updated: 2025/03/16 16:43:27 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (user.role === Role.ADMIN) {
      return true; //  Autorise si Admin
    }

    throw new ForbiddenException('Vous devez être administrateur pour accéder à cette ressource');
  }
}



