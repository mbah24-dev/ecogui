import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";
import { GnfFormatPipe } from "../../../pipes/gnf-format.pipe";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, AlertNotificationComponent, GnfFormatPipe]
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info'

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.loadProducts();
        registerLocaleData(localeFr);

        this.productService.alert$.subscribe(alert => {
          this.alertMsg = alert.message;
          this.alertType = alert.type;
          this.showAlert = true;

          // Disparition automatique apres 4s
          setTimeout(() => this.showAlert = false, 4000);
        });

        this.productService.favorites$.subscribe(() => {
          this.updateProductStates();
        });

        this.productService.cart$.subscribe(() => {
          this.updateProductStates();
        });
    }


    loadProducts() {
      this.products = this.productService.getProducts();
      this.updateProductStates();
    }

    updateProductStates() {
      const favs = this.productService.getFavorites();
      const cart = this.productService.getCart();

      this.products = this.products.map(p => ({
        ...p,
        isFavorite: favs[p.id] ? 1 : 0,
        inCart: cart[p.id] ? 1 : 0
      }));
    }

    toggleFavorite(product: Product) {
      this.productService.toggleFavorite(product);
    }

    toggleCart(product: Product) {
      this.productService.toggleCart(product);
    }

    isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    }
  }
