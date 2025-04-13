/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.config.server.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:06:48 by mbah              #+#    #+#             */
/*   Updated: 2025/03/18 18:06:49 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
