/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   signup.service.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 20:06:08 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 13:56:36 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enviroment } from "../../utils/eviroment";
import { LoginDto } from "../../dto/user/login.dto";
import { tap } from "rxjs";
import { LoginResponseDto } from "../../models/user/login-response.model";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private signupApiUrl!: string;

    constructor(private http: HttpClient, private enviroment: Enviroment) {
        this.signupApiUrl = `${this.enviroment.apiUrl}/auth/signup/seller`;
    }

    signup(userData: LoginDto) {
        return this.http.post<LoginResponseDto>(this.signupApiUrl, userData, { withCredentials: true }).pipe(
            tap((response: LoginResponseDto) => {
              if (response.accessToken) {
                localStorage.setItem('sellerAccessToken', response.accessToken);
                localStorage.setItem('seller', JSON.stringify(response.user));
              }
            })
        );
    }
}
