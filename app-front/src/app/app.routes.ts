/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.routes.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:06:32 by mbah              #+#    #+#             */
/*   Updated: 2025/03/23 18:53:20 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Routes } from '@angular/router';
import { DashboardComponent } from './home/components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { SendMail } from './auth/components/send-mail/send-mail.component';
import { ResetPassword } from './auth/components/reset-password/reset-password.component';

export const routes: Routes = [
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'send-mail', component: SendMail},
  {path: 'reset-password', component: ResetPassword},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: 'home'}
];
