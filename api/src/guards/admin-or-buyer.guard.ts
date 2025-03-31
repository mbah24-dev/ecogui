/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   admin-or-buyer.guard.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 00:09:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/27 17:28:50 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class AdminOrBuyerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (user.role === Role.ADMIN || user.role === Role.BUYER || user.role === Role.BUYER_AND_SELLER) {
      return true; //  Autorise si Admin OU Buyer
    }

    throw new ForbiddenException('Vous devez être administrateur ou Acheteur pour accéder à cette ressource');
  }
}
