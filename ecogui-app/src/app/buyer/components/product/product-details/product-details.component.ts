import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { Product, ProductService } from '../../../services/product.service';

@Component({
    selector: 'app-e-product-details',
    imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, FeathericonsModule, CarouselModule, NgFor, MatProgressBarModule, MatMenuModule, ReviewsComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    product!: Product;
    productImages: { url: string }[] = [];
    selectedImage!: string;
    selectedColor: string | null = null;

    constructor(
      private route: ActivatedRoute,
      private productService: ProductService
    ) {}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const product = this.productService.getProducts().find(p => p.id === id);

      if (product) {
        this.product = product;
        this.productImages = product.image.map(img => ({ url: img }));
      }

      if (this.product.colorAvailable && this.product.colorAvailable.length > 0) {
        this.selectedColor = this.product.colorAvailable[0]; // 1ère couleur sélectionnée
      }
    }

    selectColor(color: string): void {
        this.selectedColor = color;
    }

    changeimage(image: string) {
        this.selectedImage = image;
    }
  }

