import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { FeathericonsModule } from '../../../../../shared/icons/feathericons/feathericons.module';
import { Product } from '../../../../services/product.service';
import { ELEMENT_DATA, PeriodicElement } from '../../../../services/reviews.service';

@Component({
    selector: 'app-reviews',
    imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatTableModule, FeathericonsModule, MatProgressBarModule, MatMenuModule],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
    @Input() product!: Product;
    displayedColumns: string[] = ['reviewer', 'ratings', 'date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
