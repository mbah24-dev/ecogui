/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.guard.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 16:32:26 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 23:10:41 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Le guard d'authentification pour protéger les routes sensibles.
 * Ce guard vérifie si un utilisateur est authentifié en vérifiant l'existence d'un token d'accès dans le localStorage.
 * Si le token est valide, l'accès à la route est autorisé, sinon, l'utilisateur est redirigé vers la page de connexion.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    /**
     * Constructeur du guard d'authentification.
     * @param router Le service Router pour rediriger les utilisateurs non authentifiés.
     */
    constructor(private router: Router) {}

    /**
     * Méthode qui vérifie si l'utilisateur peut accéder à la route demandée.
     * Si l'utilisateur est authentifié, il est autorisé à accéder à la route.
     * Sinon, il est redirigé vers la page de connexion.
     *
     * @param route - L'instance de ActivatedRouteSnapshot qui contient les informations sur la route demandée.
     * @param state - L'instance de RouterStateSnapshot qui contient l'état de la route demandée.
     * @returns Un Observable<boolean>, une Promise<boolean>, ou un boolean indiquant si l'utilisateur peut accéder à la route.
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                return true;
            } else {
                this.router.navigate(['/authentication']);
                return false;
            }
        }
        else
            return false;
    }
}
