import { Component, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-earnings-reports',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatPaginatorModule],
    templateUrl: './earnings-reports.component.html',
    styleUrl: './earnings-reports.component.scss'
})
export class EarningsReportsComponent {

    displayedColumns: string[] = ['date', 'itemCount', 'earnings'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    date: string;
    itemCount: number;
    earnings: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: '01 Janvier', itemCount: 145, earnings: '60 000 000 GNF' },
    { date: '02 Février', itemCount: 72, earnings: '142 500 000 GNF' },
    { date: '03 Mars', itemCount: 532, earnings: '15 000 000 GNF' },
    { date: '04 Avril', itemCount: 158, earnings: '240 000 000 GNF' },
    { date: '05 Mai', itemCount: 91, earnings: '75 000 000 GNF' },
    { date: '06 Juin', itemCount: 68, earnings: '105 000 000 GNF' },
    { date: '07 Juillet', itemCount: 21, earnings: '92 340 000 GNF' },
    { date: '08 Août', itemCount: 91, earnings: '75 000 000 GNF' },
    { date: '09 Septembre', itemCount: 158, earnings: '240 000 000 GNF' },
    { date: '10 Octobre', itemCount: 532, earnings: '15 000 000 GNF' },
    { date: '11 Novembre', itemCount: 72, earnings: '142 500 000 GNF' },
    { date: '12 Décembre', itemCount: 145, earnings: '60 000 000 GNF' },
    { date: '13 Janvier', itemCount: 72, earnings: '142 500 000 GNF' },
    { date: '14 Février', itemCount: 145, earnings: '60 000 000 GNF' }
];
