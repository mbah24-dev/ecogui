/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   reset-password.service.ts                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/25 01:22:55 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:42:49 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient } from "@angular/common/http";
import { Environment } from "../../utils/environment";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(private http: HttpClient, private environment: Environment) {}

    reset_password(password: string, token: string) {
        return this.http.post<{ message: string }>(
          `${this.environment.apiUrl}/auth/reset-password?token=${token}`,
          { password }
        );
    }
}
