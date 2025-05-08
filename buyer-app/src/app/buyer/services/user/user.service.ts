/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:59:11 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 17:13:32 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, OnInit } from "@angular/core";
import { User } from "../../models/user/user.model";
import { SendEmailDto } from "../../dto/user/sendemail.dto";
import { HttpClient } from "@angular/common/http";
import { Enviroment } from "../../utils/eviroment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UpdateUserDto } from "../../dto/user/update-user.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User | null>(null);
    user$ =  this.userSubject.asObservable();

    constructor(private http: HttpClient, private enviroment: Enviroment) {}

    loadUser(): void {
        this.getUserData().subscribe({
            next: (response) => {
                this.userSubject.next(response.user);
            },
            error: (err) => {
                console.error('Impossible de récupérer les informations du user', err);
            }
        });
    }

    getUserData(): Observable<{ user: User }> {
        return this.http.get<{ user: User }>(
            `${this.enviroment.apiUrl}/users/me/info`,
            { withCredentials: true }
        );
    }

    updateUserProfile(newData: UpdateUserDto): Observable<{ user: User }> {
        return this.http.put<{ user: User }>(
            `${this.enviroment.apiUrl}/users/me/account`,
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
            `${this.enviroment.apiUrl}/auth/send-email`,
            email
        ));
    }

    updateProfilePic(file: any) {
        return this.http.post(
            `${this.enviroment.apiUrl}/users/profile-pic`,
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
