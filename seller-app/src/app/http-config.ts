/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   http-config.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/19 23:45:08 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 15:41:31 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HTTP_INTERCEPTORS, HttpFeatureKind } from '@angular/common/http';
import { AuthInterceptor } from './seller/interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from './seller/interceptors/error/error.interceptor';
import { Silent401Interceptor } from './seller/interceptors/auth/session.interceptor';

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
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: Silent401Interceptor,
        multi: true
      }
    ]
  }
];
