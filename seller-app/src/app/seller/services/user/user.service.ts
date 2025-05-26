/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:59:11 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:44:49 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Inject, Injectable, OnInit, PLATFORM_ID } from "@angular/core";
import { User } from "../../models/user/user.model";
import { SendEmailDto } from "../../dto/user/sendemail.dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Environment } from "../../utils/environment";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { UpdateUserDto } from "../../dto/user/update-user.dto";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User | null>(null);
    user$ =  this.userSubject.asObservable();
    private isBrowser: boolean;

    constructor(
        private http: HttpClient,
        private environment: Environment,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    loadUser(): void {
        if (this.isBrowser) {
            const token = localStorage.getItem('sellerAccessToken');
            if (!token) {
                console.warn('Aucun token présent, utilisateur non connecté.');
                return;
            }
            this.getUserData().subscribe({
                next: (response) => {
                    this.userSubject.next(response.user);
                },
                error: (err) => {
                    console.error('Impossible de récupérer les informations du user', err);
                }
            });
        }
    }


    getUserData(): Observable<{ user: User }> {
        return this.http.get<{ user: User }>(
          `${this.environment.apiUrl}/users/me/info`,
          {
            withCredentials: true,
            headers: new HttpHeaders({
              'Cache-Control': 'no-store' // Empêche le caching
            })
          }
        ).pipe(
          catchError(err => {
            console.error('Session error amigo:', err);
            throw err;
          })
        );
    }

    updateUserProfile(newData: UpdateUserDto): Observable<{ user: User }> {
        return this.http.put<{ user: User }>(
            `${this.environment.apiUrl}/users/me/account`,
            newData,
            { withCredentials: true }
        ).pipe(
            tap((response: any) => {
                // Met à jour le BehaviorSubject avec les nouvelles données
                this.userSubject.next(response.user);
            })
        );
    }

    userSendMail(email: SendEmailDto) {
        return (this.http.post<{ message: string }>(
            `${this.environment.apiUrl}/auth/send-email`,
            email
        ));
    }

    updateProfilePic(file: any) {
        return this.http.post(
            `${this.environment.apiUrl}/users/profile-pic`,
            file,
            { withCredentials: true }
        );
    }

    checkImageExists(url: string, callback: (exists: boolean) => void): void {
        const img = new Image();
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    }
}
