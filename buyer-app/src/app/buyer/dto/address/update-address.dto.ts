/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:58:56 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 15:51:05 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { City, ConakryCommune } from "../../enums/address.enums";


export class UpdateAddressDto {
    commune?: string;
    city?: City;
    description?: string;
    country?: string = 'Guinee';
}
