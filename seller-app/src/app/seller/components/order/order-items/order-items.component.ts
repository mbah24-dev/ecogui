import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";
import { Product, ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.scss',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, AlertNotificationComponent]
})
export class OrderItemsComponent implements OnInit {
    products: Product[] = [];
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info'
    @Input() userName: string = 'unknown';
    @Input() orderId: string =  'CMD-0000'

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

    confirmProduct(product: any): void {
        // Traitement de confirmation
        console.log('Produit confirmé :', product);
        // Tu peux ici appeler un service, changer l'état, etc.
      }

      rejectProduct(product: any): void {
        // Traitement de rejet
        console.log('Produit refusé :', product);
        // Pareil : appel à l'API ou changement d'état.
      }

  }
