
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
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdminRoute = this.reflector.get<boolean>('isAdmin', context.getHandler());

    if (!isAdminRoute) return true; // ✅ Si la route n’a pas @IsAdmin(), AdminGuard ne s'active pas

    const request = context.switchToHttp().getRequest();
    console.log('🔍 AdminGuard activé sur la route:', request.url);
    console.log('📦 Session complète:', request.session);

    const user = request.session?.user; // 🔥 Vérifie bien la session
    if (!user) {
      console.log('⛔ Aucun utilisateur dans la session.');
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    console.log('👤 Rôle de l\'utilisateur:', user.role);
    
    if (user.role !== Role.ADMIN) {
      console.log('⛔ Accès refusé: utilisateur sans rôle admin.');
      throw new ForbiddenException('Vous devez être administrateur pour accéder à cette ressource');
    }

    console.log('✅ Accès accordé à l\'administrateur.');
    return true;
  }
}



