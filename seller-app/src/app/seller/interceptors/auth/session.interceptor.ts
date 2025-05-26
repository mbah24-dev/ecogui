/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   session.interceptor.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/08 15:39:18 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 15:39:23 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";

@Injectable()
export class Silent401Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (req.url.includes('/auth/session') && err.status === 401) {
          // Empêche l'erreur de polluer la console
          return of(new HttpResponse({ status: 401, body: null }));
        }
        return throwError(() => err);
      })
    );
  }
}
