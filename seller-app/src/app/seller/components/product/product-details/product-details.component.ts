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
import localeFr from '@angular/common/locales/fr';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";
import { ColorService } from '../../../services/color.service';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product/product.model';
import { CategoryService } from '../../../services/product/category.service';
import { ImageService } from '../../../services/image/image.service';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-e-product-details',
    imports: [CommonModule, MatCardModule, MatButtonModule, FeathericonsModule, CarouselModule, NgFor, MatProgressBarModule, MatMenuModule, ReviewsComponent, AlertNotificationComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    product?: Product;
    selectedImage!: string;
    selectedColor: string | null = null;
    selectedSize: string | null = null;
    showAlert = false;
    alertMsg = '';
    alertType: 'success' | 'error' | 'info' = 'info';
    sanitizedDescription!: SafeHtml;
    productImages: { url: string }[] = [];

    constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private colorService: ColorService,
      private categoryService: CategoryService,
      private imageService: ImageService,
      private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
      registerLocaleData(localeFr);

      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id) {
            this.productService.getSellerProductById(id).subscribe({
                next: (res) => {
                  this.getCategoryName(res.categoryId).subscribe((categoryName) => {
                    this.product = { ...res, categoryName };
                    if (this.product?.description) {
                        this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
                    }
                    if (this.product && this.product.images) {
                      this.productImages = this.product.images.map(img => ({ url: this.imageService.getProductImageUrl(img.url) })) || [];
                      this.selectedImage = this.imageService.getProductImageUrl(this.productImages[0]?.url);
                      this.selectedColor = this.product.colors?.[0] || null;
                      this.selectedSize = this.product.sizes?.[0] || null;
                    } else {
                      console.error('Le produit ou ses images sont undefined');
                    }
                  });
                },
                error: (err) => {
                  console.error(err);
                  this.showAlertMessage('Erreur lors du chargement du produit', 'error');
                }
            });
        }
      });
    }

    selectColor(color: string): void {
      this.selectedColor = color;
    }

    private getCategoryName(categoryId: string): Observable<string> {
          return this.categoryService.getCategoryById(categoryId).pipe(
            map(category => category?.name || 'Inconnue')
          );
    }

    selectSize(size: string): void {
      this.selectedSize = size;
    }

    changeimage(url: string): void {
      this.selectedImage = url;
    }

    isValidColor(color: string): boolean {
      return this.colorService.isValidCssColor(color);
    }

    showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
      this.alertMsg = message;
      this.alertType = type;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 4000);
    }
}
