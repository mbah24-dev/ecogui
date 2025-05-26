import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EmptyBoxComponent } from '../../../shared/empty-box/empty-box.component';

@Component({
    selector: 'app-invoices',
    imports: [
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        CommonModule,
        EmptyBoxComponent
    ],
    templateUrl: './payement-list.component.html',
    styleUrl: './payement-list.component.scss'
})
export class PayementListComponent {

    displayedColumns: string[] = ['transactionId', 'issuesDate', 'amount'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    transactionId: string;
    issuesDate: string;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        transactionId: 'TRX-230041',
        issuesDate: '12 Avril 2025',
        amount: '2 500 000 GNF',
    },
    {
        transactionId: 'TRX-230042',
        issuesDate: '15 Avril 2025',
        amount: '1 150 000 GNF',
    },
    {
        transactionId: 'TRX-230043',
        issuesDate: '17 Avril 2025',
        amount: '3 800 000 GNF',
    }
];
