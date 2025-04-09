/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   buyer.guard.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/26 00:09:04 by mbah              #+#    #+#             */
/*   Updated: 2025/03/26 01:38:27 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class BuyerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session?.user;

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (user.role === Role.BUYER  || user.role === Role.BUYER_AND_SELLER) {
      return true; //  Autorise si Buyer OU BUYER_AND_SELLER
    }

    throw new ForbiddenException('Vous devez être Acheteur pour accéder à cette ressource');
  }
}
