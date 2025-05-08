/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:46:52 by mbah              #+#    #+#             */
/*   Updated: 2025/05/07 12:54:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, map, Observable, of } from "rxjs";
import { Enviroment } from "../../utils/eviroment";
import { User } from "../../models/user/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private enviroment: Enviroment) {
      this.checkSession();
    }

    get isAuthenticatedClean$(): Observable<boolean> {
        return this.isAuthenticated$.pipe(
          filter((val): val is boolean => val !== null)
        );
    }

    private checkSession() {
      this.http.get<User>(`${this.enviroment.apiUrl}/auth/session`, { withCredentials: true })
        .pipe(
          map(() => true),
          catchError(() => of(false))
        )
        .subscribe((isLoggedIn) => this.isAuthenticatedSubject.next(isLoggedIn));
    }

    // Manuels
    login() {
      this.isAuthenticatedSubject.next(true);
    }

    logout() {
      this.isAuthenticatedSubject.next(false);
    }

    isLoggedIn(): Observable<boolean> {
      return this.isAuthenticated$ as Observable<boolean>;
    }
}
