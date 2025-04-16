import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
    selector: 'app-e-products-grid',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatSelectModule, FormsModule, ReactiveFormsModule, ProductListComponent],
    templateUrl: './e-product-grid.component.html',
    styleUrl: './e-product-grid.component.scss'
})
export class EProductsGridComponent {}
