/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:46:52 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 22:02:59 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  // Observable qui va émettre des changements d'authentification
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('accessToken');
      return token ? true : false;
    }
    return false;
  }

  // Change l'état d'authentification et émet un événement
  login() {
    this.isAuthenticatedSubject.next(true);
  }

  // Déconnexion et mise à jour de l'état
  logout() {
    this.isAuthenticatedSubject.next(false);
  }
}
