/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   seller.guard.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 17:57:54 by mbah              #+#    #+#             */
/*   Updated: 2025/03/25 21:23:18 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
	const isSellerRoute = this.reflector.get<boolean>('isSeller', context.getHandler());
	if (!isSellerRoute) return true; // ✅ Si la route n’a pas @IsSeller(), SellerGuard ne s'active pas
	const request = context.switchToHttp().getRequest();
	const user = request.session?.user; // 🔥 Vérifie bien la session
	if (!user) {
	  throw new UnauthorizedException('Utilisateur non authentifié --');
	}
	if ((user.role !== Role.SELLER) && (user.role !== Role.BUYER_AND_SELLER)) {
	  throw new ForbiddenException('Vous devez être Vendeur pour accéder à cette ressource');
	}
	return true;
  }
}