/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   no-auth.guard.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:52:26 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 14:28:22 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticatedClean$.pipe(
          map(isAuthenticated => {
            if (isAuthenticated) {
              this.router.navigate(['/dashboard']);
              return false;
            }
            return true;
          }),
          catchError(() => of(true))
        );
    }

}
