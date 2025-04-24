import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

@Component({
    selector: 'app-e-products-list',
    imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, CommonModule],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

    displayedColumns: string[] = ['product', 'category', 'price', 'ratings', 'stock', 'totalOrders', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(){
        registerLocaleData(localeFr);
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}
export interface PeriodicElement {
    product: any;
    category: string;
    price: number;
    ratings: any;
    stock: string;
    totalOrders: string;
    action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
    {
      product: { img: 'images/iphone14.png', title: 'iPhone 14 Pro Max' },
      category: 'Smartphones',
      price: 12500000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }], totalRatings: '7800' },
      stock: '120',
      totalOrders: '8k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone15.png', title: 'iPhone 15 Pro' },
      category: 'Smartphones',
      price: 14500000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }], totalRatings: '9200' },
      stock: '96',
      totalOrders: '9.5k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook.png', title: 'MacBook Air M2' },
      category: 'Informatique',
      price: 18000000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }], totalRatings: '3150' },
      stock: '45',
      totalOrders: '3.4k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook2.png', title: 'Sneakers Urban' },
      category: 'Chaussures',
      price: 950000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }], totalRatings: '610' },
      stock: '320',
      totalOrders: '1.2k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/montre.png', title: 'Montre Galaxy Watch' },
      category: 'Accessoires',
      price: 2800000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }], totalRatings: '1850' },
      stock: '670',
      totalOrders: '3.9k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone14.png', title: 'AirPods Pro' },
      category: 'Audio',
      price: 3200000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }], totalRatings: '4300' },
      stock: '210',
      totalOrders: '4.2k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone15.png', title: 'Apple Watch Series 9' },
      category: 'Montres',
      price: 6100000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }], totalRatings: '1700' },
      stock: 'En rupture de stock',
      totalOrders: '3.1k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook2.png', title: 'Chaussures de ville' },
      category: 'Chaussures',
      price: 840000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '240' },
      stock: '450',
      totalOrders: '590',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook.png', title: 'MacBook Pro M3' },
      category: 'Informatique',
      price: 22000000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }], totalRatings: '4000' },
      stock: 'En rupture de stock',
      totalOrders: '2.5k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/montre.png', title: 'Casque Sony WH-1000XM5' },
      category: 'Audio',
      price: 4500000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }], totalRatings: '1800' },
      stock: '310',
      totalOrders: '3.6k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone14.png', title: 'Chargeur MagSafe' },
      category: 'Accessoires',
      price: 580000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '600' },
      stock: '180',
      totalOrders: '1.1k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone15.png', title: 'iPhone 15 Clear Case' },
      category: 'Accessoires',
      price: 240000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '150' },
      stock: 'En rupture de stock',
      totalOrders: '820',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook2.png', title: 'Sac à dos en cuir' },
      category: 'Sacs',
      price: 1950000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }], totalRatings: '900' },
      stock: '320',
      totalOrders: '1.9k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/montre.png', title: 'Bracelet Montre Cuir' },
      category: 'Accessoires',
      price: 450000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-half-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '210' },
      stock: '130',
      totalOrders: '300',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/macbook.png', title: 'Trackpad Apple Magic' },
      category: 'Informatique',
      price: 1250000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '620' },
      stock: '99',
      totalOrders: '1.2k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    },
    {
      product: { img: 'images/iphone15.png', title: 'iPhone 15 Leather Wallet' },
      category: 'Accessoires',
      price: 750000,
      ratings: { star: [{ star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-fill' }, { star: 'ri-star-line' }, { star: 'ri-star-line' }], totalRatings: '850' },
      stock: '215',
      totalOrders: '1.6k',
      action: { view: 'ri-eye-line', edit: 'ri-edit-line', delete: 'ri-delete-bin-line' }
    }
  ];
