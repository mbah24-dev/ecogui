/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   http-config.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/19 23:45:08 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 23:49:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { AuthInterceptor } from './auth/auth.interceptor';  // Assure-toi que le chemin est correct
import { HTTP_INTERCEPTORS, HttpFeatureKind } from '@angular/common/http';

export const httpConfig = [
  {
    ɵkind: HttpFeatureKind.Interceptors,  // Utilisation de 'Interceptors' au lieu de 'HttpInterceptor'
    ɵproviders: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
  }
];
