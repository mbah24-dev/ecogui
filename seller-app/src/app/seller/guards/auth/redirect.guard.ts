/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   redirect.guard.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/07 19:14:31 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 01:24:08 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn().pipe(
            map(isAuthenticated => {
                if (isAuthenticated) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/home']);
                }
                return false; // On ne permet jamais l'activation de cette route
            }),
            catchError(() => {
                this.router.navigate(['/home']);
                return of(false);
            })
        );
    }
}
