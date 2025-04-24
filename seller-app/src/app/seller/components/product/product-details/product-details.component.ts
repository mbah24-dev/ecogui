import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, NgFor, registerLocaleData } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { Product, ProductService } from '../../../services/product.service';
import localeFr from '@angular/common/locales/fr';
import { ColorService } from '../../../services/color.service';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";

@Component({
    selector: 'app-e-product-details',
    imports: [CommonModule, MatCardModule, MatButtonModule, FeathericonsModule, CarouselModule, NgFor, MatProgressBarModule, MatMenuModule, ReviewsComponent, AlertNotificationComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    product!: Product;
    productImages: { url: string }[] = [];
    selectedImage!: string;
    selectedColor: string | null = null;
    sizeSelected: string | null = null;
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info';

    constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private colorService: ColorService
    ) {

    }

    ngOnInit(): void {
        registerLocaleData(localeFr);
        this.route.paramMap.subscribe(params => {
          const id = Number(params.get('id'));

          this.productService.getLiveProducts().subscribe(products => {
            const found = products.find(p => p.id === id);
            if (found) {
              this.product = found;
              this.productImages = found.image.map(img => ({ url: img }));
              this.selectedImage = this.productImages[0]?.url || '';
              this.selectedColor = found.colorAvailable?.[0] || null;
              this.sizeSelected = found.sizeAvailable?.[0] || null;
            }
          });
        });
        this.productService.alert$.subscribe(alert => {
            this.alertMsg = alert.message;
            this.alertType = alert.type;
            this.showAlert = true;

            // Disparition automatique apres 4s
            setTimeout(() => this.showAlert = false, 4000);
        });
    }

    selectColor(color: string): void {
        this.selectedColor = color;
    }

    selectSize(size: string): void {
        this.sizeSelected = size;
    }

    changeimage(image: string) {
        this.selectedImage = image;
    }

    toggleCart(): void {
        this.productService.toggleCart(this.product, this.sizeSelected, this.selectedColor);
    }

    isValidColor(color: string): boolean {
        return (this.colorService.isValidCssColor(color));
    }

  }

