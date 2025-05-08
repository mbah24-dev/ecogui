/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 18:32:46 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 18:37:10 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class CreateProductDto {
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    categoryId!: string;
    size!: string[];
    color!: string[];
    images!: any;
}
