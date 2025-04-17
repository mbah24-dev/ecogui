import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of } from 'rxjs';

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
  // ✅ États internes
  private _favorites: { [id: number]: boolean } = this.loadFromLS('favorites');
  private _cart: { [id: number]: boolean } = this.loadFromLS('cart');

  // ✅ Subjects
  private favoritesSubject = new BehaviorSubject<{ [id: number]: boolean }>(this._favorites);
  private cartSubject = new BehaviorSubject<{ [id: number]: boolean }>(this._cart);

  // ✅ Observables publics
  favorites$ = this.favoritesSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  // ✅ Accès directs
  getFavorites(): { [key: string]: boolean } {
    return this._favorites;
  }

  getCart(): { [key: string]: boolean } {
    return this._cart;
  }

  // ✅ Méthodes de gestion
  toggleFavorite(product: Product) {
    if (this._favorites[product.id]) {
      delete this._favorites[product.id];
    } else {
      this._favorites[product.id] = true;
    }

    this.favoritesSubject.next({ ...this._favorites });
    this.saveToLS('favorites', this._favorites);
  }

  toggleCart(product: Product) {
    if (this._cart[product.id]) {
      delete this._cart[product.id];
    } else {
      this._cart[product.id] = true;
    }

    this.cartSubject.next({ ...this._cart });
    this.saveToLS('cart', this._cart);
  }

  clearFavorites() {
    this._favorites = {};
    this.favoritesSubject.next({});
    this.saveToLS('favorites', {});
  }

  clearCart() {
    this._cart = {};
    this.cartSubject.next({});
    this.saveToLS('cart', {});
  }

  // ✅ Chargement / Sauvegarde
  private saveToLS(key: string, value: any) {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  private loadFromLS(key: string): { [id: number]: boolean } {
    if (typeof window === 'undefined' || !window.localStorage) return {};
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  // ✅ Accès aux produits enrichis
  getProducts(): Product[] {
    const products = [...this.allProducts()];
    const favorites = this._favorites;
    const cart = this._cart;

    return products.map(p => ({
      ...p,
      isFavorite: favorites[p.id] ? 1 : 0,
      inCart: cart[p.id] ? 1 : 0
    }));
  }

  getLiveProducts(): Observable<Product[]> {
    return combineLatest([
      this.favorites$,
      this.cart$
    ]).pipe(
      map(([favorites, cart]) =>
        this.allProducts().map(p => ({
          ...p,
          isFavorite: favorites[p.id] ? 1 : 0,
          inCart: cart[p.id] ? 1 : 0
        }))
      ),
      catchError((error) => {
        console.error('Erreur de récupération des produits:', error);
        return of([]);
      })
    );
  }

  // ✅ Liste des produits (mock)
  allProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'MacBook Air Pro Edition',
        category: 'Ordinateur',
        price: 12000000,
        rating: 5,
        image: ['images/profile.png', 'images/macbook2.png', 'images/macbook.png'],
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
        name: 'Montre',
        category: 'Téléphonie',
        price: 935000,
        rating: 4.5,
        image: ['images/montre.png', 'images/iphone15.png', 'images/iphone14.png'],
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
