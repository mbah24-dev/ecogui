/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.component.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/18 18:06:52 by mbah              #+#    #+#             */
/*   Updated: 2025/03/19 15:50:35 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [ FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bconnect Shop';
}
