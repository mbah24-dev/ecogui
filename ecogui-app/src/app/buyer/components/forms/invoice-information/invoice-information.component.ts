import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-invoice-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FeathericonsModule,
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './invoice-information.component.html',
  styleUrl: './invoice-information.component.scss'
})
export class InvoiceInformationComponent  {
    displayProgressSpiner: boolean = false;
    @Input() duration: number = 4000;
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private productService: ProductService
    ) {
        this.billingForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,60}$/)]],
            commune: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/)]],
            city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/)]],
            address: [''],
            phone: ['', [Validators.required, Validators.pattern(/^(\+224|00224)?\s?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/)]],
            email: ['', [Validators.required, Validators.email]],
          });

    }

    // Password Hide
    hide = true;

    // Form
    billingForm!: FormGroup;
    onSubmit() {
        if (this.billingForm.valid) {
            this.displayProgressSpiner = true;
            setTimeout(() => {
                this.router.navigate(['/profile/orders/details'], {
                    state: {
                      alert: {
                        message: 'Vous avez payé avec succès ✅',
                        type: 'success'
                      }
                    }
                });
                this.productService.clearCart();
                this.displayProgressSpiner = false;
            }, this.duration);

        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }
}
