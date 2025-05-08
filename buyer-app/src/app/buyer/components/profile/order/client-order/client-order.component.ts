import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf, registerLocaleData, CommonModule } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { GnfFormatPipe } from "../../../../pipes/gnf-format.pipe";

@Component({
    selector: 'app-e-orders-list',
    imports: [CommonModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, GnfFormatPipe],
    templateUrl: './client-order.component.html',
    styleUrl: './client-order.component.scss'
})
export class ClientOrderComponent {

    displayedColumns: string[] = ['orderID', 'product', 'price', 'quantity', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor() {
        registerLocaleData(localeFr);
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    trackingID: string;
    product: any;
    price: number;
    quantity: number;
    status: any;
    action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
      trackingID: 'CMD-1001',
      product: {
        id: 5,
        img: 'images/iphone14.png',
        title: 'iPhone 14 Compact',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      },
      price: 790000,
      quantity: 4,
      status: {
        pending: 'En cours'
      },
      action: {
        view: 'ri-eye-line'
      }
    },
    {
      trackingID: 'CMD-1001',
      product: {
        id: 8,
        img: 'images/macbook.png',
        title: 'MacBook Air M2',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      },
      price: 18500000,
      quantity: 1,
      status: {
        pending: 'En cours'
      },
      action: {
        view: 'ri-eye-line'
      }
    },
    {
      trackingID: 'CMD-1001',
      product: {
        id: 2,
        img: 'images/montre.png',
        title: 'Montre Connectée Série 9',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      },
      price: 935000,
      quantity: 2,
      status: {
        pending: 'En cours'
      },
      action: {
        view: 'ri-eye-line'
      }
    },
    {
      trackingID: 'CMD-1002',
      product: {
        id: 4,
        img: 'images/iphone15.png',
        title: 'iPhone 15 Mini',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      },
      price: 850000,
      quantity: 1,
      status: {
        delivered: 'Livré'
      },
      action: {
        view: 'ri-eye-line'
      }
    },
    {
      trackingID: 'CMD-1003',
      product: {
        id: 3,
        img: 'images/macbook2.png',
        title: 'MacBook Student Edition',
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      },
      price: 15000000,
      quantity: 3,
      status: {
        canceled: 'Annulée'
      },
      action: {
        view: 'ri-eye-line'
      }
    }
  ];
