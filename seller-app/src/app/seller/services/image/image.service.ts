/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   image.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/08 21:51:01 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:51:12 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, inject } from "@angular/core";
import { Environment } from "../../utils/environment";

/**
 * Service utilitaire pour la gestion des chemins d'accès aux images.
 * Permet de générer les URLs complètes vers les ressources image
 * telles que les produits et les profils utilisateurs.
 */
@Injectable({
    providedIn: 'root',
  })
  export class ImageService {
    private readonly environment = inject(Environment);

    /**
     * Retourne l'URL complète de l'image d'un produit.
     * @param imageName Nom de fichier de l'image.
     * @returns L'URL complète de l'image du produit.
     */
    getProductImageUrl(imageName: string): string {
      return `${this.environment.apiUrl}/static/upload/images/products/${imageName}`;
    }

    /**
     * Retourne l'URL complète de la photo de profil d'un utilisateur.
     * @param imageName Nom de fichier de l'image.
     * @returns L'URL complète de la photo de profil.
     */
    getUserProfileImageUrl(imageName: string): string {
      return `${this.environment.apiUrl}/static/upload/images/user_profiles/${imageName}`;
    }
}
