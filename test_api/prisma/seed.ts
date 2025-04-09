/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   seed.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 16:15:07 by mbah              #+#    #+#             */
/*   Updated: 2025/03/25 16:15:43 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Électronique",
    "Mode",
    "Maison et Décoration",
    "Santé et Bien-être",
    "Jouets et Jeux",
    "Sport et Loisirs",
    "Beauté et Soins",
    "Alimentation et Boissons",
    "Bricolage et Jardinage",
    "Animaux",
    "Livres, Musique et Films",
    "Services",
    "Automobile et Moto",
    "Technologie et Informatique",
    "Art et Collectibles",
    "Autre",
  ];

  // Insère les catégories dans la base de données
  for (const categoryName of categories) {
    await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }

  console.log('Categories inserted!');
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
