/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   product.service.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 18:55:52 by mbah              #+#    #+#             */
/*   Updated: 2025/05/09 19:05:17 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Environment } from "../../utils/environment";
import { HttpClient } from "@angular/common/http";
import { CreateProductDto } from "../../dto/product/create-product.dto";
import { Observable } from "rxjs";
import { Product } from "../../models/product/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    createProductApiUrl!: string;
    sellerProductsApiUrl!: string;

    constructor(private enviroment: Environment, private http: HttpClient) {
        this.createProductApiUrl = `${this.enviroment.apiUrl}/products/add-product`;
        this.sellerProductsApiUrl = `${this.enviroment.apiUrl}/users/connected/products`;
    }

    createProduct(data: FormData): Observable<Product> {
        return this.http.post<Product>(this.createProductApiUrl, data, { withCredentials: true });
    }

    getSellerProducts(): Observable<{ products: Product[] }> {
        return this.http.get<{ products: Product[] }>(this.sellerProductsApiUrl, {withCredentials: true});
    }

    getSellerProductById(productId: string): Observable<Product> {
        return (this.http.get< Product >(`${this.enviroment.apiUrl}/products/id=${productId}`, { withCredentials: true}));
    }

}
