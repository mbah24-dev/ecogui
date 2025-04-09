/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   admin-or-seller.guard.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 00:09:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 00:22:47 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class AdminOrSellerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (user.role === Role.ADMIN || user.role === Role.SELLER || user.role === Role.BUYER_AND_SELLER) {
      return true; //  Autorise si Admin OU Seller
    }

    throw new ForbiddenException('Vous devez être administrateur ou vendeur pour accéder à cette ressource');
  }
}
