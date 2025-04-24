

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';

@Component({
    selector: 'app-order-delivered',
    imports: [MatCardModule, FeathericonsModule,  MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule, NgIf, RouterLink],
    templateUrl: './order-delivered.component.html',
    styleUrl: './order-delivered.component.scss',
})
export class OrderDeliveredComponent implements AfterViewInit {

     displayedColumns: string[] = ['orderId', 'customer', 'price', 'quantity', 'status', 'action'];
        dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

        @ViewChild(MatPaginator) paginator!: MatPaginator;

        ngAfterViewInit() {
            this.dataSource.paginator = this.paginator;

            // je Défini la logique du filtre
            this.dataSource.filterPredicate = (data: PeriodicElement, filter: string): boolean => {
                const normalizedFilter = filter.trim().toLowerCase();
                return (
                    data.orderId.toLowerCase().includes(normalizedFilter) ||
                    data.customer.toLowerCase().includes(normalizedFilter)
                );
            };
        }

        applyFilter(event: Event): void {
            const input = event.target as HTMLInputElement;
            if (input) {
                this.dataSource.filter = input.value;
            }
        }

}

export interface PeriodicElement {
    orderId: string;
    customer: string;
    price: string;
    quantity: string;
    status: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        orderId: 'CMD-1001',
        customer: 'Mamadou BAH',
        price: '9 500 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1002',
        customer: 'Mamoudou Diallo',
        price: '12 000 000 GNF',
        quantity: '02 articles',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1001',
        customer: 'Mamadou BAH',
        price: '22 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1002',
        customer: 'Mamoudou Diallo',
        price: '8 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1005',
        customer: 'Said Balde',
        price: '15 500 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1006',
        customer: 'Fatoumata Bah',
        price: '12 000 000 GNF',
        quantity: '02 articles',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1007',
        customer: 'Ibrahima Sow',
        price: '22 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1008',
        customer: 'Sidy Diallo',
        price: '8 000 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1009',
        customer: 'Abdoulaye Bah',
        price: '15 500 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    },
    {
        orderId: 'CMD-1010',
        customer: 'Elhadj Amadou Barry',
        price: '9 500 000 GNF',
        quantity: '01 article',
        status: {
            delivered: 'Livré'
        }
    }
];
