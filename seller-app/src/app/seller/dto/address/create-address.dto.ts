/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:54:40 by mbah              #+#    #+#             */
/*   Updated: 2025/05/01 10:45:06 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { City, ConakryCommune } from "../../enums/address.enums";


export class CreateAddressDto {
    commune!: string;
    city!: City;
    description!: string;
    country?: string = 'Guinee';
}
