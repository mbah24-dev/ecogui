/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.config.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:06:45 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 14:02:02 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule)
  ]
};
