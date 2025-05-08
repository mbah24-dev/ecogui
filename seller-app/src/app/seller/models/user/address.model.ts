/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   address.model.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:26:07 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:26:14 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export interface Address {
    id: string;
    userId: string;
    city: string;
    country: string;
    createdAt: string;
    commune?: string;
    description?: string;
}
