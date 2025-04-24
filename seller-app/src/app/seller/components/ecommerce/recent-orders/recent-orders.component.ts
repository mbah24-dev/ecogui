import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-recent-orders',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './recent-orders.component.html',
    styleUrl: './recent-orders.component.scss'
})
export class RecentOrdersComponent {

    displayedColumns: string[] = ['orderId', 'product', 'customer', 'price', 'quantity', 'status'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    orderId: string;
    product: any;
    customer: string;
    price: string;
    quantity: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        orderId: 'CMD-1001',
        product: {
            img: 'images/macbook2.png',
            title: 'Ordinateur Portable HP',
            date: '16 Avr, 08:30'
        },
        customer: 'Mamadou BAH',
        price: '9 500 000 GNF',
        quantity: '01 article',
        status: {
            pending: 'En attente'
        }
    },
    {
        orderId: 'CMD-1002',
        product: {
            img: 'images/iphone14.png',
            title: 'iPhone 14',
            date: '15 Avr, 11:10'
        },
        customer: 'Mamoudou Diallo',
        price: '12 000 000 GNF',
        quantity: '02 articles',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1003',
        product: {
            img: 'images/macbook.png',
            title: 'MacBook Pro M2',
            date: '14 Avr, 09:45'
        },
        customer: 'Mawia Bah',
        price: '22 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1004',
        product: {
            img: 'images/macbook2.png',
            title: 'Ordinateur Lenovo ThinkPad',
            date: '13 Avr, 17:20'
        },
        customer: 'SaNoussy RyAn',
        price: '8 000 000 GNF',
        quantity: '01 article',
        status: {
            pending: 'En attente'
        }
    },
    {
        orderId: 'CMD-1005',
        product: {
            img: 'images/iphone14.png',
            title: 'iPhone 15 Pro Max',
            date: '12 Avr, 13:40'
        },
        customer: 'Said Balde',
        price: '15 500 000 GNF',
        quantity: '01 article',
        status: {
            pending: 'En attente'
        }
    },
    {
        orderId: 'CMD-1006',
        product: {
            img: 'images/iphone15.png',
            title: 'iPhone 14',
            date: '16 Avr, 08:30'
        },
        customer: 'Fatoumata Bah',
        price: '12 000 000 GNF',
        quantity: '02 articles',
        status: {
            pending: 'En attente'
        }
    },
    {
        orderId: 'CMD-1007',
        product: {
            img: 'images/macbook.png',
            title: 'MacBook Pro M2',
            date: '16 Avr, 08:30'
        },
        customer: 'Ibrahima Sow',
        price: '22 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1008',
        product: {
            img: 'images/macbook2.png',
            title: 'Ordinateur Lenovo ThinkPad',
            date: '16 Avr, 08:30'
        },
        customer: 'Sidy Diallo',
        price: '8 000 000 GNF',
        quantity: '01 article',
        status: {
            pending: 'En attente'
        }
    },
    {
        orderId: 'CMD-1009',
        product: {
            img: 'images/iphone14.png',
            title: 'iPhone 15 Pro Max',
            date: '16 Avr, 08:30'
        },
        customer: 'Abdoulaye Bah',
        price: '15 500 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1010',
        product: {
            img: 'images/macbook.png',
            title: 'Ordinateur Portable HP',
            date: '16 Avr, 08:30'
        },
        customer: 'Elhadj Amadou Barry',
        price: '9 500 000 GNF',
        quantity: '01 article',
        status: {
            pending: 'En attente'
        }
    }
];
