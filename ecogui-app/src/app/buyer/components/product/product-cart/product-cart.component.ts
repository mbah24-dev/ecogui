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
@Component({
  selector: 'app-e-cart',
  imports: [NgFor, CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, FeathericonsModule, MatFormFieldModule, MatInputModule, FormsModule, MatSelectModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit{

  displayedColumns: string[] = ['product', 'price', 'size', 'quantity', 'total', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // Déclarer les variables pour total et grandTotal
  total: number = 0;
  grandTotal: number = 0;

  ngOnInit(): void {
    registerLocaleData(localeFr);
    this.total = this.dataSource.data.reduce((sum, item) => sum + item.total, 0);
    const shippingFee = 150000;
    const discount = 1000000;
    this.grandTotal = this.total + shippingFee - discount;
  }

  getQuantityOptions(max: number): number[] {
    return Array.from({length: max}, (_, i) => i + 1);
  }

  updateTotal() {
    this.dataSource.data.forEach(item => {
      item.total = item.price * item.quantity;
    });

    this.updateOrderSummary();
  }

  updateOrderSummary() {
    this.total = this.dataSource.data.reduce((sum, item) => sum + item.total, 0);
    const shippingFee = 150000;
    const discount = 1000000;
    this.grandTotal = this.total + shippingFee - discount;
  }
}

export interface PeriodicElement {
  product: any;
  price: number;
  size: string;
  quantity: number;
  total: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    product: {
      id: 2,
      img: 'images/macbook2.png',
      title: 'MacBook Pro M2',
    },
    price: 20000000,
    size: '16"',
    quantity: 1,
    total: 20000000,
    action: 'trash-2'
  },
  {
    product: {
      id: 1,
      img: 'images/montre.png',
      title: 'Montre connectée Galaxy Fit',
    },
    price: 1750000,
    size: 'Standard',
    quantity: 1,
    total: 1750000,
    action: 'trash-2'
  },
  {
    product: {
      id: 4,
      img: 'images/iphone14.png',
      title: 'iPhone 14 Pro Max',
    },
    price: 15500000,
    size: '6.7"',
    quantity: 1,
    total: 15500000,
    action: 'trash-2'
  }
];
