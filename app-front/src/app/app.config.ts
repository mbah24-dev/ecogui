/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.config.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:06:45 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 23:45:28 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';  // Assure-toi que le chemin est correct
import { httpConfig } from './http-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),  // Cette ligne ajoute HTTP client avec l'option fetch
      ...httpConfig
    ),
    importProvidersFrom(FormsModule)
  ]
};

