/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   product.service.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 18:55:52 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 21:16:47 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Enviroment } from "../../utils/eviroment";
import { HttpClient } from "@angular/common/http";
import { CreateProductDto } from "../../dto/product/create-product.dto";
import { Observable } from "rxjs";
import { Product } from "../../models/product/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    createProductApiUrl!: string;

    constructor(private enviroment: Enviroment, private http: HttpClient) {
        this.createProductApiUrl = `${this.enviroment.apiUrl}/products/add-product`;
    }

    createProduct(data: FormData): Observable<Product> {
        return this.http.post<Product>(this.createProductApiUrl, data, { withCredentials: true });
    }
}
