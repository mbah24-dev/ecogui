/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   size.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/05/05 17:55:51 by mbah              #+#    #+#             */
/*   Updated: 2025/05/05 18:28:04 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private sizeMapping: { [categoryName: string]: string[] } = {
    // Électronique
    'Électronique': [
      '13"', '14"', '15"', '16"', '17"', '18"', '20"', '22"', '24"', '27"', '30"', '32"',
      '40"', '50"', '55"', '60"', '65"', '75"', '85"',
      'Portable', 'Compact', 'Standard', 'Grand format'
    ],

    // Mode
    'Mode': [
      'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
      '34', '36', '38', '40', '42', '44', '46', '48', '50',
      'Taille unique', 'Plus size'
    ],

    // Maison et Décoration
    'Maison et Décoration': [
      'Petit (30x30cm)', 'Moyen (50x50cm)', 'Grand (70x70cm)',
      'Extra Large (100x100cm)',
      'Simple', 'Double', 'Queen', 'King', 'Super King',
      '10x10cm', '20x20cm', '30x30cm', '50x50cm'
    ],

    // Santé et Bien-être
    'Santé et Bien-être': [
      '50ml', '100ml', '200ml', '500ml', '1L',
      'S', 'M', 'L', 'XL',
      'Unitaire', 'Pack de 3', 'Pack de 6', 'Pack de 12'
    ],

    // Jouets et Jeux
    'Jouets et Jeux': [
      '0-6 mois', '6-12 mois', '1-3 ans', '3-6 ans',
      '6-9 ans', '9-12 ans', '12+ ans',
      'Petit', 'Moyen', 'Grand',
      'Standard'
    ],

    // Sport et Loisirs
    'Sport et Loisirs': [
      'XS', 'S', 'M', 'L', 'XL', 'XXL',
      '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
      'Taille unique', 'Ajustable'
    ],

    // Beauté et Soins
    'Beauté et Soins': [
      '5ml', '10ml', '30ml', '50ml', '100ml', '200ml', '500ml',
      'Mini', 'Voyage', 'Standard', 'Famille', 'Économique',
      '1 unité', '3 unités', '6 unités', '12 unités'
    ],

    // Alimentation et Boissons
    'Alimentation et Boissons': [
      '50g', '100g', '250g', '500g', '1kg', '2kg', '5kg',
      '10cl', '25cl', '33cl', '50cl', '75cl', '1L', '1.5L', '2L',
      'Sachet', 'Boîte', 'Bouteille', 'Pack'
    ],

    // Bricolage et Jardinage
    'Bricolage et Jardinage': [
      '5mm', '10mm', '15mm', '20mm', '25mm',
      'Petit', 'Moyen', 'Grand', 'Professionnel',
      '1m', '2m', '5m', '10m', '20m',
      'Kit débutant', 'Kit complet'
    ],

    // Animaux
    'Animaux': [
      'XS (1-5kg)', 'S (5-10kg)', 'M (10-20kg)', 'L (20-40kg)', 'XL (40+kg)',
      'Chat', 'Petit chien', 'Chien moyen', 'Grand chien',
      'Aquarium 10L', 'Aquarium 20L', 'Aquarium 50L', 'Aquarium 100L+',
      'Standard'
    ],

    // Livres, Musique et Films
    'Livres, Musique et Films': [
      'Poche', 'Broché', 'Relié',
      'CD', 'Vinyle', 'DVD', 'Blu-ray', '4K UHD',
      'Digital', 'Physique',
      'Single', 'Album', 'Collector'
    ],

    // Services
    'Services': [
      '1 heure', '2 heures', 'Demi-journée', 'Journée', 'Semaine', 'Mois',
      'Basique', 'Standard', 'Premium',
      'Petit projet', 'Moyen projet', 'Grand projet'
    ],

    // Automobile et Moto
    'Automobile et Moto': [
      'Compacte', 'Berline', 'SUV', 'Utilitaire',
      '10"', '12"', '14"', '15"', '16"', '17"', '18"', '19"', '20"', '22"',
      'Universal', 'Modèle spécifique'
    ],

    // Technologie et Informatique
    'Technologie et Informatique': [
      '32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB', '4TB', '8TB',
      '13"', '14"', '15"', '16"', '17"',
      'Smart', 'Standard', 'Pro', 'Max'
    ],

    // Art et Collectibles
    'Art et Collectibles': [
      'A4 (21x30cm)', 'A3 (30x42cm)', 'A2 (42x60cm)', 'A1 (60x84cm)',
      'Petite', 'Moyenne', 'Grande', 'Sur mesure',
      'Édition limitée', 'Exemplaire unique', 'Série numérotée'
    ],

    // Autre
    'Autre': ['Standard', 'Unique', 'Sur mesure', 'Variable']
  };

  getSizesForCategory(categoryName: string): string[] {
    // Normalisation du nom de catégorie pour correspondre exactement
    const normalizedCategory = Object.keys(this.sizeMapping).find(
      key => key.toLowerCase() === categoryName.toLowerCase()
    );

    return normalizedCategory
      ? this.sizeMapping[normalizedCategory]
      : ['Standard', 'Unique', 'Variable'];
  }

  getAllSizeCategories(): {category: string, sizes: string[]}[] {
    return Object.entries(this.sizeMapping).map(([category, sizes]) => ({
      category,
      sizes
    }));
  }
}
