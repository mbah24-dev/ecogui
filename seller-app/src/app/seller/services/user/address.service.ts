/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   address.service.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:35:40 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 11:15:57 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Enviroment } from "../../utils/eviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateAddressDto } from '../../dto/address/create-address.dto';
import { Address } from "../../models/user/address.model";
import { UpdateAddressDto } from "../../dto/address/update-address.dto";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    constructor(private enviroment: Enviroment, private http: HttpClient) {}

    getCurrentUserAddress(): Observable<Address> {
        return (this.http.get<Address>(
            `${this.enviroment.apiUrl}/address/me`, { withCredentials: true }
        ));
    }

    createNewAddress(addressData: CreateAddressDto): Observable<Address> {
        return (this.http.post<Address>(
            `${this.enviroment.apiUrl}/address/create`, addressData, { withCredentials: true }
        ));
    }

    updateAddressById(addressId: string, newAddress: UpdateAddressDto): Observable<Address> {
        return (this.http.put<Address>(
            `${this.enviroment.apiUrl}/address/update/address=${addressId}`,
            newAddress,
            { withCredentials: true }
        ));
    }
}
