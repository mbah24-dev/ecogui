/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   seed.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/03/25 16:15:07 by mbah              #+#    #+#             */
/*   Updated: 2025/04/11 03:08:14 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/*import { PrismaClient } from '@prisma/client';

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
  */


  
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const generateGuineaPhoneNumber = (): string => {
	const get3Digits = () => Math.floor(100 + Math.random() * 900);
	return `+224 ${get3Digits()} ${get3Digits()} ${get3Digits()}`;
  };
  

async function main() {
  console.log('🌱 Starting seed...')

  const roles = ['BUYER', 'SELLER', 'ADMIN', 'BUYER_AND_SELLER']
  const imagesBank = [
    'https://source.unsplash.com/random/800x600?product',
    'https://source.unsplash.com/random/800x600?tech',
    'https://source.unsplash.com/random/800x600?gadget',
    'https://source.unsplash.com/random/800x600?fashion',
    'https://source.unsplash.com/random/800x600?accessory',
    'https://source.unsplash.com/random/800x600?tool',
  ]

  const usersData = [
    {
      email: 'bah311802@gmail.com',
      name: 'Aliou Bah',
      role: 'BUYER',
    },
    {
      email: 'mamadoualioubah191@gmail.com',
      name: 'Mamadou Bah',
      role: 'SELLER',
    },
    {
      email: 'ecogui.sociale@gmail.com',
      name: 'BConnect SARL',
      role: 'SELLER',
    },
    {
      email: 'mbah@student.42lyon.fr',
      name: 'Admin 42',
      role: 'ADMIN',
    },
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: 'BUYER',
    },
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: 'BUYER_AND_SELLER',
    },
  ]

  for (const user of usersData) {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        role: user.role as any,
        password: faker.internet.password(),
        phoneNumber: generateGuineaPhoneNumber(),
        countryCode: '+224',
        addresses: {
          create: {
            city: faker.location.city(),
            commune: faker.location.county(),
            description: faker.location.streetAddress(),
          },
        },
      },
    })

    if (['SELLER', 'BUYER_AND_SELLER'].includes(user.role)) {
      for (let i = 0; i < 2; i++) {
        const category = await prisma.category.upsert({
          where: { name: 'Tech' },
          update: {},
          create: { name: 'Tech' },
        })

        const product = await prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({ min: 5, max: 20 }),
            sellerId: createdUser.id,
            categoryId: category.id,
            images: {
              create: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }).map(() => ({
                url: faker.helpers.arrayElement(imagesBank) + '&' + faker.string.uuid(),
              })),
            },
          },
        })

        console.log(`🛒 Produit "${product.name}" créé pour ${user.email}`)
      }
    }

    console.log(`✅ Utilisateur "${user.email}" créé avec le rôle ${user.role}`)
  }

  console.log('🌱 Seed terminé avec succès')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })

