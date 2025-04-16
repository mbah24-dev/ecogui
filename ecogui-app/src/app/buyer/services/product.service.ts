// src/app/services/product.service.ts
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string[];
  isFavorite: number;
  inCart: number;
  description: string;
  stock: number;
  size: string;
  totalReview: number;
  seller: string;
  colorAvailable: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'MacBook Air Pro Edition',
        category: 'Ordinateur',
        price: 12000000,
        rating: 5,
        image: ['images/macbook.png', 'images/macbook2.png', 'images/macbook.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Une version optimisée du MacBook Air avec une puissance professionnelle pour les créatifs et développeurs.',
        stock: 20,
        size: '13 pouces',
        totalReview: 1290,
        seller: 'TechGuinée',
        colorAvailable: ['Silver', 'Space Gray']
      },
      {
        id: 2,
        name: 'iPhone 16 Pro Max',
        category: 'Téléphonie',
        price: 13500000,
        rating: 4.5,
        image: ['images/iphone14.png', 'images/iphone15.png', 'images/iphone14.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Dernière génération de l’iPhone avec appareil photo avancé et autonomie prolongée.',
        stock: 14,
        size: '6.7 pouces',
        totalReview: 854,
        seller: 'Guitech Mobile',
        colorAvailable: ['Noir Sidéral', 'Bleu Nuit', 'Or']
      },
      {
        id: 3,
        name: 'MacBook Ultra Light',
        category: 'Ordinateur',
        price: 15000000,
        rating: 4.8,
        image: ['images/macbook2.png', 'images/macbook.png', 'images/macbook2.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'MacBook ultraléger, idéal pour les déplacements fréquents sans compromis sur la performance.',
        stock: 10,
        size: '14 pouces',
        totalReview: 472,
        seller: 'IT World Conakry',
        colorAvailable: ['Silver']
      },
      {
        id: 4,
        name: 'iPhone 14 Classic',
        category: 'Téléphonie',
        price: 850000,
        rating: 4.6,
        image: ['images/iphone15.png', 'images/iphone14.png', 'images/iphone15.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Un iPhone équilibré entre performance, design et prix abordable.',
        stock: 35,
        size: '6.1 pouces',
        totalReview: 1300,
        seller: 'Phone City',
        colorAvailable: ['Rouge', 'Noir', 'Blanc']
      },
      {
        id: 5,
        name: 'iPhone 14 Compact',
        category: 'Téléphonie',
        price: 790000,
        rating: 4.2,
        image: ['images/iphone14.png', 'images/iphone15.png', 'images/iphone14.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'La version compacte et légère de l’iPhone 14 pour un usage pratique au quotidien.',
        stock: 40,
        size: '5.8 pouces',
        totalReview: 922,
        seller: 'QuickPhone',
        colorAvailable: ['Blanc', 'Bleu']
      },
      {
        id: 6,
        name: 'MacBook Student Edition',
        category: 'Ordinateur',
        price: 2200000,
        rating: 4.7,
        image: ['images/macbook2.png', 'images/macbook.png', 'images/macbook2.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'MacBook abordable et performant, idéal pour les étudiants et les jeunes professionnels.',
        stock: 28,
        size: '13 pouces',
        totalReview: 761,
        seller: 'EDUtech',
        colorAvailable: ['Silver']
      },
      {
        id: 7,
        name: 'iPhone 15 Mini',
        category: 'Téléphonie',
        price: 150000,
        rating: 4.1,
        image: ['images/iphone15.png', 'images/iphone14.png', 'images/iphone15.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Une version mini de l’iPhone 15 pour ceux qui aiment la discrétion sans perdre la puissance.',
        stock: 22,
        size: '5.4 pouces',
        totalReview: 1104,
        seller: 'Mobile Zone',
        colorAvailable: ['Vert', 'Noir']
      },
      {
        id: 8,
        name: 'MacBook Creator Series',
        category: 'Ordinateur',
        price: 1850000,
        rating: 4.4,
        image: ['images/macbook.png', 'images/macbook2.png', 'images/macbook.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Conçu pour les créateurs de contenu, le Creator Series offre performance graphique et autonomie.',
        stock: 17,
        size: '15 pouces',
        totalReview: 682,
        seller: 'ProTech',
        colorAvailable: ['Space Gray']
      },
      {
        id: 9,
        name: 'iPhone SE Lite',
        category: 'Téléphonie',
        price: 2950000,
        rating: 4.9,
        image: ['images/iphone14.png', 'images/iphone15.png', 'images/iphone14.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Version économique de l’iPhone SE avec un design moderne et de bonnes performances.',
        stock: 50,
        size: '4.7 pouces',
        totalReview: 1800,
        seller: 'Smart Zone',
        colorAvailable: ['Rouge', 'Blanc']
      }
    ];
  }
}
