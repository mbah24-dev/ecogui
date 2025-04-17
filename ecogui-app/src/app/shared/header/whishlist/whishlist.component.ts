import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { Product, ProductService } from '../../../buyer/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, CommonModule],
  templateUrl: './whishlist.component.html',
  styleUrl: '../header.component.scss'
})
export class WhishlistComponent {
  @Input() products: Product[] = [];

  constructor(
    private readonly router: Router,
    private readonly productService: ProductService
  ) {}

  get favorites(): Product[] {
    return this.products.filter(p => p.isFavorite === 1);
  }

  clearFavorites() {
    this.favorites.forEach(product => this.productService.toggleFavorite(product));
  }

  removeProductFromWishlist(product: Product) {
    this.productService.toggleFavorite(product);
  }
}
