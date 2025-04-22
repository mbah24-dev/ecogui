import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { Product, ProductService } from '../../../buyer/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: '../header.component.scss'
})
export class CartPreviewComponent {
  @Input() products: Product[] = [];

  constructor(
    private readonly router: Router,
    private readonly productService: ProductService
  ) {}

  get cartItems(): Product[] {
    return this.products.filter(p => p.inCart === 1);
  }

  clearCart() {
    this.cartItems.forEach(product => this.productService.toggleCart(product));
  }

  removeProductFromCart(product: Product) {
    this.productService.toggleCart(product);
  }
}
