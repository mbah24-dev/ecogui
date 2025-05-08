/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.server.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/15 00:37:26 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 15:15:32 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
