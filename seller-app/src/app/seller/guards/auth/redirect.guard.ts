/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   redirect.guard.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/07 19:14:31 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 14:28:56 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// redirect.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, take, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticatedClean$.pipe(
          take(1),
          tap(isAuthenticated => {
            this.router.navigate([isAuthenticated ? '/dashboard' : '/home']);
          }),
          mapTo(false),
          catchError(() => {
            this.router.navigate(['/home']);
            return of(false);
          })
        );
    }
}
