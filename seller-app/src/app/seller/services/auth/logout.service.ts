/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logout.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 19:35:24 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 00:20:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enviroment } from "../../utils/eviroment";
import { AuthService } from "./auth.service";  // Ajoute le AuthService
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    private logoutApiUrl!: string;

    constructor(
        private http: HttpClient,
        private enviroment: Enviroment,
        private authService: AuthService  // Injection de AuthService
    ) {
        this.logoutApiUrl = `${this.enviroment.apiUrl}/auth/logout`;
    }

    logout() {
        const token = localStorage.getItem('sellerAccessToken');
        if (!token) {
            throw new Error('Token manquant');
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.logoutApiUrl, {}, { headers, withCredentials: true }).pipe(
            tap(() => {
                // Suppression des éléments dans le localStorage
                localStorage.removeItem('sellerAccessToken');
                localStorage.removeItem('user');

                // Mettre à jour l'état de l'authentification
                this.authService.logout();
            })
        );
    }
}
