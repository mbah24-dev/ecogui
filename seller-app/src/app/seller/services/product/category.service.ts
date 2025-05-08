/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   category.service.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 17:30:13 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 18:41:26 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../../models/product/category.model";
import { Enviroment } from "../../utils/eviroment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoryApiUrl!: string;
    constructor(private enviroment: Enviroment, private http: HttpClient) {
        this.categoryApiUrl = `${this.enviroment.apiUrl}/products/all-category`;
    }

    getCategories(): Observable<Category[]> {
        return (this.http.get<Category[]>(this.categoryApiUrl));
    }

}
