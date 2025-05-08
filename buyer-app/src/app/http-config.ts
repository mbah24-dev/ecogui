/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   http-config.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/19 23:45:08 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 17:49:22 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HTTP_INTERCEPTORS, HttpFeatureKind } from '@angular/common/http';
import { AuthInterceptor } from './buyer/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from './buyer/interceptors/error/error.interceptor';

export const httpConfig = [
  {
    ɵkind: HttpFeatureKind.Interceptors,
    ɵproviders: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
      }
    ]
  }
];
