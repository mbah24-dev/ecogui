/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   role.model.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/24 18:29:22 by mbah              #+#    #+#             */
/*   Updated: 2025/04/24 18:29:27 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

export enum Role {
    BUYER = 'BUYER',
    SELLER = 'SELLER',
    ADMIN = 'ADMIN',
    BANNED = 'BANNED',
    RESTRICTED = 'RESTRICTED',
    BUYER_AND_SELLER = 'BUYER_AND_SELLER',
    ARCHIVED = 'ARCHIVED',
}
