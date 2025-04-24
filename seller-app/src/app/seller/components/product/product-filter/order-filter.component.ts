import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';

@Component({
  selector: 'app-order-filter',
  imports: [MatCardModule, MatInputModule, FeathericonsModule, MatMenuModule, CommonModule, MatButtonModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.scss'
})
export class ProductFilterComponent {
    filter = {
        customerName: '',
        orderId: '',
        status: []
      };

      applyFilters() {
        // log ou appel backend
        console.log('Filtres appliqués :', this.filter);
        // à adapter selon logique de filtre réelle
      }

      clearFilters() {
        this.filter = {
          customerName: '',
          orderId: '',
          status: []
        };
      }

}
