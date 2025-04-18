import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductFilterComponent } from "./product-filter/product-filter.component";

@Component({
    selector: 'app-products-page',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule, ProductListComponent, ProductFilterComponent],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductsGridComponent {}
