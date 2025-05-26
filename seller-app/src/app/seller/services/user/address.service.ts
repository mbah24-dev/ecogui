/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   address.service.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:35:40 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:44:23 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Environment } from "../../utils/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateAddressDto } from '../../dto/address/create-address.dto';
import { Address } from "../../models/user/address.model";
import { UpdateAddressDto } from "../../dto/address/update-address.dto";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    constructor(private environment: Environment, private http: HttpClient) {}

    getCurrentUserAddress(): Observable<Address> {
        return (this.http.get<Address>(
            `${this.environment.apiUrl}/address/me`, { withCredentials: true }
        ));
    }

    createNewAddress(addressData: CreateAddressDto): Observable<Address> {
        return (this.http.post<Address>(
            `${this.environment.apiUrl}/address/create`, addressData, { withCredentials: true }
        ));
    }

    updateAddressById(addressId: string, newAddress: UpdateAddressDto): Observable<Address> {
        return (this.http.put<Address>(
            `${this.environment.apiUrl}/address/update/address=${addressId}`,
            newAddress,
            { withCredentials: true }
        ));
    }
}
