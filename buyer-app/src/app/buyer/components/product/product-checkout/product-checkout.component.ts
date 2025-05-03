import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { InvoiceInformationComponent } from "../../forms/invoice-information/invoice-information.component";
import { CartItem, ProductService } from '../../../services/product.service';
import { registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";
import { GnfFormatPipe } from "../../../pipes/gnf-format.pipe";

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatTableModule, InvoiceInformationComponent, GnfFormatPipe],
    templateUrl: './product-checkout.component.html',
    styleUrl: './product-checkout.component.scss'
})
export class ProductCheckoutComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['product', 'price'];
    dataSource = new MatTableDataSource<CartItem>();
    grandTotal = 0;

    private cartSubscription!: Subscription;

    constructor(private productService: ProductService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
      registerLocaleData(localeFr);


      this.cartSubscription = this.productService.cart$.subscribe(() => {
        const updatedItems = this.productService.getCartItems();
        this.dataSource.data = updatedItems;
        this.updateGrandTotal(updatedItems);
      });

      const initialItems = this.productService.getCartItems();
      this.dataSource.data = initialItems;
      this.updateGrandTotal(initialItems);
    }

    updateGrandTotal(items: CartItem[]) {
      this.grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      if (isPlatformBrowser(this.platformId))
        localStorage.setItem('grandTotal', JSON.stringify(this.grandTotal));
    }

    ngOnDestroy(): void {
      if (this.cartSubscription) this.cartSubscription.unsubscribe();
    }
  }

