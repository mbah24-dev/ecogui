/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   generate-start-icon.ts                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/08 17:42:51 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 22:15:30 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/**
 * Génère une note aléatoire entre 0 et 5, par pas de 0.5.
 * Utile pour simuler des notations de produits avec étoiles.
 *
 * @returns Un nombre entre 0 et 5 (ex: 3.5, 4.0, etc.)
 */
export function generateRandomRating(): number {
    const steps = 10;
    const randomStep = Math.floor(Math.random() * (steps + 1));
    return randomStep * 0.5;
}

/**
 * Génère une liste d'icônes représentant une notation par étoiles à partir d'une note numérique.
 *
 * @param rating - La note du produit, entre 0 et 5, pouvant inclure des demi-points (ex : 3.5).
 * @returns Un tableau d'objets contenant les icônes d'étoiles à afficher :
 *          - 'ri-star-fill' pour une étoile pleine,
 *          - 'ri-star-half-fill' pour une demi-étoile,
 *          - 'ri-star-line' pour une étoile vide.
 *
 * Exemple :
 *   generateStarIcons(3.5) retournera :
 *   [
 *     { star: 'ri-star-fill' },
 *     { star: 'ri-star-fill' },
 *     { star: 'ri-star-fill' },
 *     { star: 'ri-star-half-fill' },
 *     { star: 'ri-star-line' }
 *   ]
 */
export function generateStarIcons(rating: number): { star: string }[] {
    const fullStars = Math.floor(rating);               // Nombre d'étoiles pleines
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;          // Une demi-étoile si >= 0.5
    const emptyStars = 5 - fullStars - halfStar;        // Le reste en étoiles vides

    return [
      ...Array(fullStars).fill({ star: 'ri-star-fill' }),        // Étoiles pleines
      ...Array(halfStar).fill({ star: 'ri-star-half-fill' }),    // Étoile demi
      ...Array(emptyStars).fill({ star: 'ri-star-line' }),       // Étoiles vides
    ];
}

