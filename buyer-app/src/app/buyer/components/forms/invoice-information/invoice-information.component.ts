import { Component, Inject, OnInit, OnDestroy, Input, inject } from '@angular/core';
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
import { UserService } from '../../../services/user/user.service';
import { AddressService } from '../../../services/user/address.service';
import { User } from '../../../models/user/user.model';
import { Address } from '../../../models/user/address.model';
import { combineLatest } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { City, ConakryCommune } from '../../../enums/address.enums';

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
    MatTooltipModule,
    MatProgressSpinner
  ],
  templateUrl: './invoice-information.component.html',
  styleUrl: './invoice-information.component.scss'
})
export class InvoiceInformationComponent implements OnInit {
    displayProgressSpiner: boolean = false;
    @Input() duration: number = 4000;
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info';
    userInfo!: User | null;
    userAddress!: Address | null;

    /**  les services injecter */
    userService = inject(UserService);
    addressService = inject(AddressService);

    cityList: string[] = Object.values(City);
    communeList: string[] = Object.values(ConakryCommune);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private productService: ProductService,
    ) {
        this.billingForm = this.fb.group({
            name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,60}$/)]],
            commune: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/)]],
            city: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/)]],
            address: [''],
            phone: ['', [Validators.required, Validators.pattern(/^(\+224|00224)?\s?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/)]],
            email: ['', [Validators.required, Validators.email]],
          });


          combineLatest([
            this.userService.user$,
            this.addressService.getCurrentUserAddress()
          ]).subscribe(([user, address]) => {
            if (user && address) {
              this.billingForm.patchValue({
                name: user.name,
                phone: user.phoneNumber,
                email: user.email,
                city: address.city,
                commune: address.commune,
                address: address.description
              });
            }
          });
    }

    ngOnInit(): void {
        this.handleBillingCityChanges();
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

    isBillingCityConakry(): boolean {
        return this.billingForm.get('city')?.value === City.Conakry;
    }

    private handleBillingCityChanges(): void {
    this.billingForm.get('city')?.valueChanges.subscribe((city: City) => {
        const communeControl = this.billingForm.get('commune');
        if (city === City.Conakry) {
        communeControl?.enable();
        } else {
        communeControl?.disable();
        communeControl?.reset();
        }
    });
    }
}
