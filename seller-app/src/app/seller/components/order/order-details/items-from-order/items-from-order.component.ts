import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-items-from-order',
    imports: [MatCardModule, MatButtonModule, RouterLink, MatTableModule],
    templateUrl: './items-from-order.component.html',
    styleUrl: './items-from-order.component.scss'
})
export class ItemsFromOrderComponent {

    displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

}

export interface PeriodicElement {
    product: any;
    quantity: string;
    price: string;
    total: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        product: {
            id: 5,
            img: 'images/iphone14.png',
            title: 'iPhone 14 Compact',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '4',
        price: '790 000 GNF',
        total: '3 160 000 GNF'
    },
    {
        product: {
            id: 8,
            img: 'images/macbook.png',
            title: 'MacBook Air M2',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '1',
        price: '18 500 000 GNF',
        total: '18 500 000 GNF'
    },
    {
        product: {
            id: 2,
            img: 'images/montre.png',
            title: 'Montre Connectée Série 9',
            date: 'Dec 16, 08:30 PM'
        },
        quantity: '2',
        price: '935 000 GNF',
        total: '1 870 000 GNF'
    }
];
