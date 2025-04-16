import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: '../e-product-grid/e-product-grid.component.scss',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    if (this.isBrowser()) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
      const cartItems = JSON.parse(localStorage.getItem('cart') || '{}');

      this.products = this.products.map(p => ({
        ...p,
        isFavorite: favorites[p.id] ? 1 : 0,
        inCart: cartItems[p.id] ? 1 : 0
      }));
    }
  }



  toggleFavorite(product: Product) {
    product.isFavorite = product.isFavorite ? 0 : 1;

    if (this.isBrowser()) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');

      if (product.isFavorite) {
        favorites[product.id] = true;
      } else {
        delete favorites[product.id];
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }


  toggleCart(product: Product) {
    product.inCart = product.inCart ? 0 : 1;
    if (this.isBrowser())
    {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');

        if (product.inCart) {
        cart[product.id] = true;
        } else {
        delete cart[product.id];
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

}
