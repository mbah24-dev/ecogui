import { Component, Input, OnInit } from '@angular/core';
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
import { OrderItemsComponent } from "../order-items/order-items.component";


@Component({
  selector: 'app-product-list',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule, OrderItemsComponent]
})
export class NewOrderComponent {
   
}
