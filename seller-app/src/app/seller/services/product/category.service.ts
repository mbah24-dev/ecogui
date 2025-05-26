import { filter, map } from 'rxjs';
/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   category.service.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 17:30:13 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 22:49:03 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../../models/product/category.model";
import { Environment } from "../../utils/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categoryApiUrl!: string;
    constructor(private environment: Environment, private http: HttpClient) {
        this.categoryApiUrl = `${this.environment.apiUrl}/products/all-category`;
    }

    getCategories(): Observable<Category[]> {
        return (this.http.get<Category[]>(this.categoryApiUrl));
    }

    getCategoryById(id: string): Observable<Category | undefined> {
        return this.getCategories().pipe(
            map(categories => categories.find(category => category.id === id))
        );
    }


}
