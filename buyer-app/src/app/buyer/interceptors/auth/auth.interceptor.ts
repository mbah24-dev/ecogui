/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.interceptor.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 16:22:54 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 17:56:52 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.interceptor.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/19 23:38:16 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 23:40:11 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * L'`AuthInterceptor` est un intercepteur HTTP qui intercepte toutes les requêtes sortantes.
 * Il ajoute un en-tête d'autorisation avec le token d'accès dans le cas où un token valide est présent.
 * Si le token est disponible dans le localStorage, il est ajouté à l'en-tête `Authorization` de la requête HTTP.
 * Sinon, la requête est envoyée sans modification.
 *
 * @see HttpInterceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Intercepte la requête HTTP sortante pour y ajouter le token d'authentification dans l'en-tête.
   *
   * @param req La requête HTTP initiale.
   * @param next Le gestionnaire HTTP qui continue le traitement de la requête.
   * @returns Un observable contenant la réponse HTTP après traitement de l'intercepteur.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
