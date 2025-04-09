/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   jwt-auth.guard.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/15 23:05:42 by mbah              #+#    #+#             */
/*   Updated: 2025/03/16 15:19:16 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
	if (err || !user) {
	  throw new UnauthorizedException('Vous devez être connecté pour accéder à cette ressource');
	}
	return user;
  }
  
}

