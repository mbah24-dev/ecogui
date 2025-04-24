import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-products-page',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, MatSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductsGridComponent {}
