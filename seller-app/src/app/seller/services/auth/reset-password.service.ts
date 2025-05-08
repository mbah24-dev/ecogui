/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reset-password.service.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/25 01:22:55 by mbah              #+#    #+#             */
/*   Updated: 2025/04/25 14:42:03 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient } from "@angular/common/http";
import { Enviroment } from "../../utils/eviroment";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(private http: HttpClient, private enviroment: Enviroment) {}

    reset_password(password: string, token: string) {
        return this.http.post<{ message: string }>(
          `${this.enviroment.apiUrl}/auth/reset-password?token=${token}`,
          { password }
        );
    }
}
