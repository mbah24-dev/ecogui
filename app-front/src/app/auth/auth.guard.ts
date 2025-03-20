/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.guard.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/19 14:52:38 by mbah              #+#    #+#             */
/*   Updated: 2025/03/20 01:55:40 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// auth.guard.ts ou autre fichier où tu accèdes à localStorage
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si on est côté client avant d'accéder à localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // Si le token existe, permettre la navigation
        return true;
      } else {
        // Si le token n'existe pas, rediriger vers la page de login
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Si on est côté serveur, ne pas tenter d'accéder à localStorage
      return false;
    }
  }
}

