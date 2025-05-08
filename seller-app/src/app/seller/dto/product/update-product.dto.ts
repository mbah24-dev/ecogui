/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-product.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 18:35:40 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 18:36:47 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
    size?: string[];
    color?: string[];
    images?: any
}
