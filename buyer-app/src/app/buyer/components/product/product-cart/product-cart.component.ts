import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CartItem, Product, ProductService } from '../../../services/product.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { GnfFormatPipe } from "../../../pipes/gnf-format.pipe";


@Component({
  selector: 'app-cart',
  imports: [NgFor, MatTooltipModule, CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, FeathericonsModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule, GnfFormatPipe],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})

export class ProductCartComponent implements OnInit {
    displayedColumns: string[] = ['product', 'price', 'color', 'size', 'quantity', 'total', 'action'];
    dataSource = new MatTableDataSource<CartItem>([]);
    total = 0;
    grandTotal = 0;

    constructor(private productService: ProductService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
      registerLocaleData(localeFr);

      const cartItems = this.productService.getCartItems();
      this.dataSource.data = cartItems;
      this.updateOrderSummary();
    }

    getQuantityOptions(max: number): number[] {
      return Array.from({ length: max }, (_, i) => i + 1);
    }

    onQuantityChange(item: CartItem, quantity: number) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.productService.updateCartItemQuantity(item.id, quantity);
      this.updateOrderSummary();
    }

    updateOrderSummary() {
      this.total = this.dataSource.data.reduce((sum, item) => sum + item.total, 0);
      const shippingFee = 0;
      const discount = 0;
      this.grandTotal = Math.max(this.total + shippingFee - discount, 0);
      if (isPlatformBrowser(this.platformId))
        localStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
    }

    removeProduct(productId: number): void {
      this.productService.toggleCart({ id: productId } as any);
      this.dataSource.data = this.productService.getCartItems();
      this.updateOrderSummary();
    }
  }
