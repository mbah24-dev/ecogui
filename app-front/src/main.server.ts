/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.server.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:07:17 by mbah              #+#    #+#             */
/*   Updated: 2025/03/18 18:07:18 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
