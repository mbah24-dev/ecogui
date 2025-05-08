/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   category.model.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:25:12 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:31:24 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Product } from "./product.model";

export interface Category {
    id: string;
    name: string;
    products: Product[];
}
