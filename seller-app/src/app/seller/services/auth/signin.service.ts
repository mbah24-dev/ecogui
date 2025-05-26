/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signin.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:49:07 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:43:07 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Environment } from "../../utils/environment";
import { LoginDto } from "../../dto/user/login.dto";
import { tap } from "rxjs";
import { LoginResponseDto } from "../../models/user/login-response.model";

@Injectable({
    providedIn: 'root'
})
export class SigninService {
    private signinApiUrl!: string;

    constructor(private http: HttpClient, private environment: Environment) {
        this.signinApiUrl = `${this.environment.apiUrl}/auth/signin/seller`;
    }

    signin(userData: LoginDto) {
        return this.http.post<LoginResponseDto>(this.signinApiUrl, userData, { withCredentials: true }).pipe(
            tap((response: LoginResponseDto) => {
              if (response.accessToken) {
                localStorage.setItem('sellerAccessToken', response.accessToken);
                localStorage.setItem('seller', JSON.stringify(response.user));
              }
            })
        );
    }
}
