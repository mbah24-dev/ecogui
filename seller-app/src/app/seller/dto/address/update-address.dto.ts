/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   update-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:58:56 by mbah              #+#    #+#             */
/*   Updated: 2025/05/09 16:24:41 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { City, ConakryCommune } from "../../enums/address.enums";


/**
 * Data Transfer Object (DTO) utilisé pour la mise à jour d'une adresse utilisateur.
 * Tous les champs sont optionnels afin de permettre une mise à jour partielle.
 */
export class UpdateAddressDto {

    /**
     * Nom de la commune à mettre à jour.
     * Optionnel. Doit correspondre à une valeur de l'enum `ConakryCommune`.
     */
    commune?: string;

    /**
     * Ville associée à l'adresse.
     * Optionnel. Doit être une valeur de l'enum `City`.
     */
    city?: City;

    /**
     * Nouvelle description de l'adresse.
     * Optionnel. Peut contenir des détails comme une rue, un repère ou un bâtiment.
     */
    description?: string;

    /**
     * Pays associé à l'adresse.
     * Optionnel. Par défaut, la valeur est "Guinee".
     */
    country?: string = 'Guinee';
  }

