import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, Subject } from 'rxjs';

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
  sizeAvailable: string[];
  totalReview: number;
  seller: string;
  colorAvailable: string[];
}

export interface Alert {
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface CartItem extends Product {
  quantity: number;
  total: number;
  action: string;
  size: string;
  color: string;
}

type FavoriteMap = { [id: number]: boolean };
type CartItemMap = {
    [id: number]: {
      size: string;
      color: string;
      qty: number;
    };
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  /** Alert  */
  private alertSubject = new Subject<Alert>();
  alert$ = this.alertSubject.asObservable();

  /** fonction a appeler pour afficher une notif */
  public triggerAlert(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.alertSubject.next({ message, type });
  }

  private readonly FAVORITES_KEY = 'favorites';
  private readonly CART_KEY = 'cart';
  private readonly ORDER_KEY = 'order';

  private _favorites: FavoriteMap = this.loadFromLS(this.FAVORITES_KEY);
  private _cart: CartItemMap = this.loadFromLS(this.CART_KEY);
  private _order: CartItemMap = this.loadFromLS(this.ORDER_KEY);

  private favoritesSubject = new BehaviorSubject<FavoriteMap>(this._favorites);
  private cartSubject = new BehaviorSubject<CartItemMap>(this._cart);
  private orderSubject = new BehaviorSubject<CartItemMap>(this._order);

  favorites$ = this.favoritesSubject.asObservable();
  cart$ = this.cartSubject.asObservable();
  order$ = this.orderSubject.asObservable();

  constructor() {}

  // --- Favoris ---
  getFavorites(): FavoriteMap {
    return this._favorites;
  }

  toggleFavorite(product: Product) {
    if (this._favorites[product.id]) {
      delete this._favorites[product.id];
      this.triggerAlert('Produit supprimé des favoris !');
    } else {
      this.triggerAlert('Produit ajouté aux favoris !');
      this._favorites[product.id] = true;
    }

    this.favoritesSubject.next({ ...this._favorites });
    this.saveToLS(this.FAVORITES_KEY, this._favorites);
  }

  clearFavorites() {
    this.triggerAlert('Liste des souhaits vider !');
    this._favorites = {};
    this.favoritesSubject.next({});
    this.saveToLS(this.FAVORITES_KEY, {});
  }

  // --- Panier ---
  getCart(): CartItemMap {
    return this._cart;
  }

  toggleCart(product: Product, selectedSize?: string | null, selectedColor?: string | null) {
    if (this._cart[product.id]) {
      delete this._cart[product.id];
      this.triggerAlert('Produit supprimé du panier !');
    } else {
      this._cart[product.id] = {
        size: selectedSize || product.sizeAvailable?.[0] || '',
        color: selectedColor || product.colorAvailable?.[0] || '',
        qty: 1,
      };
      this.triggerAlert('Produit ajouté du panier !');
    }

    this.cartSubject.next({ ...this._cart });
    this.saveToLS(this.CART_KEY, this._cart);
  }

  updateCartItemQuantity(productId: number, quantity: number) {
    if (this._cart[productId]) {
      this.triggerAlert('Quantiter mis à jour !');
      this._cart[productId].qty = quantity;
      this.cartSubject.next({ ...this._cart });
      this.saveToLS(this.CART_KEY, this._cart);
    }
  }

  clearCart() {
    this.triggerAlert('Votre panier a été vider !');
    this._cart = {};
    this.cartSubject.next({});
    this.saveToLS(this.CART_KEY, {});
  }

  getCartItems(): CartItem[] {
    const baseProducts = this.allProducts();
    return Object.entries(this._cart).map(([idStr, { size, color, qty }]) => {
      const id = +idStr;
      const product = baseProducts.find(p => p.id === id);
      if (!product) return null!;
      const qty_temp = qty ?? 1;
      return {
        ...product,
        quantity: qty_temp,
        total: product.price * qty_temp,
        action: 'trash-2',
        size,
        color,
      };
    }).filter(Boolean);
  }


  // --- Produits ---
  getProducts(): Product[] {
    const favorites = this._favorites;
    const cart = this._cart;
    return this.allProducts().map(p => ({
      ...p,
      isFavorite: favorites[p.id] ? 1 : 0,
      inCart: cart[p.id] ? 1 : 0,
    }));
  }

  getLiveProducts(): Observable<Product[]> {
    return combineLatest([this.favorites$, this.cart$]).pipe(
      map(([favorites, cart]) =>
        this.allProducts().map(p => ({
          ...p,
          isFavorite: favorites[p.id] ? 1 : 0,
          inCart: cart[p.id] ? 1 : 0,
        }))
      ),
      catchError(err => {
        console.error('Erreur lors du chargement des produits', err);
        return of([]);
      })
    );
  }

  // --- Local Storage ---
  private saveToLS(key: string, value: any) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  private loadFromLS(key: string): any {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  }

  getCartItemsWithTotal(): CartItem[] {
    return this.getCartItems().map(item => ({
      ...item,
      total: item.price * item.quantity,
    }));
  }

  getCartGrandTotal(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
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
        image: ['images/macbook.png', 'images/macbook2.png', 'images/macbook.png'],
        isFavorite: 0,
        inCart: 0,
        description: 'Une version optimisée du MacBook Air avec une puissance professionnelle pour les créatifs et développeurs.',
        stock: 20,
        sizeAvailable: ['13 pouce'],
        totalReview: 1290,
        seller: 'TechGuinée',
        colorAvailable: ['Silver']
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
        sizeAvailable: ['regulier'],
        totalReview: 854,
        seller: 'Guitech Mobile',
        colorAvailable: ['Noir Sidéral']
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
        sizeAvailable: ['13 pouce'],
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
        sizeAvailable: ['regulier'],
        totalReview: 1300,
        seller: 'Phone City',
        colorAvailable: ['Rouge']
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
        sizeAvailable: ['regulier'],
        totalReview: 922,
        seller: 'QuickPhone',
        colorAvailable: ['Blanc']
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
        sizeAvailable: ['15 pouce'],
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
        sizeAvailable: ['regulier'],
        totalReview: 1104,
        seller: 'Mobile Zone',
        colorAvailable: ['Vert']
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
        sizeAvailable: ['15 pouce'],
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
        sizeAvailable: ['regulier'],
        totalReview: 1800,
        seller: 'Smart Zone',
        colorAvailable: ['Blanc']
      }
    ];
  }
}
