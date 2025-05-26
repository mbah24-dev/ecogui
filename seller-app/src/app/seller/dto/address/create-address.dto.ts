/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   create-address.dto.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/30 23:54:40 by mbah              #+#    #+#             */
/*   Updated: 2025/05/09 16:18:47 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { City, ConakryCommune } from "../../enums/address.enums";


/**
 * Data Transfer Object (DTO) utilisé pour la création d'une adresse utilisateur.
 */
export class CreateAddressDto {

    /**
     * Nom de la commune dans la ville spécifiée.
     * Doit correspondre à une valeur de l'enum `ConakryCommune`.
     */
    commune!: string;

    /**
     * Ville associée à l'adresse.
     * Doit être une valeur définie dans l'enum `City`.
     */
    city!: City;

    /**
     * Description textuelle de l'adresse (ex : rue, repère, immeuble, etc.).
     */
    description!: string;

    /**
     * Pays associé à l'adresse. Valeur par défaut : "Guinee".
     */
    country?: string = 'Guinee';
  }

