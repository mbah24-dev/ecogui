import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { User } from '../../../seller/models/user/user.model';
import { UserService } from '../../../seller/services/user/user.service';
import { UpdateUserDto } from '../../../seller/dto/user/update-user.dto';
import { enumValidator } from '../../../seller/validators/enum-validator';
import { City, ConakryCommune } from '../../../seller/enums/address.enums';
import { optionalPatternValidator } from '../../../seller/validators/optional-pattern-validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertNotificationComponent } from '../../alert-notification/alert-notification.component';
import { AddressService } from '../../../seller/services/user/address.service';
import { Address } from '../../../seller/models/user/address.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateAddressDto } from '../../../seller/dto/address/update-address.dto';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeathericonsModule,
    MatSelectModule,
    NgIf,
    NgFor,
    CommonModule,
    MatProgressSpinnerModule,
    AlertNotificationComponent,
    MatTooltipModule
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit {

    // === Public state ===
    profileForm!: FormGroup;
    addressForm!: FormGroup;

    userData!: User | null;
    userAddress!: Address;

    cityList: string[] = Object.values(City);
    communeList: string[] = Object.values(ConakryCommune);

    isLoading: boolean = false;
    addressIsLoading: boolean = false;
    showAlert: boolean = false;

    profileFormErrorMessage = '';
    addressFormErrorMessage = '';
    alertMsg = '';
    alertType: 'success' | 'error' | 'info' = 'info';

    // === Internal snapshot for comparison ===
    initialProfileData!: Partial<UpdateUserDto>;
    initialAddressData!: Partial<UpdateAddressDto>;

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private addressService: AddressService
    ) {}

    ngOnInit(): void {
        this.initForms();
        this.loadUserData();
        this.handleCityChanges();
        this.userService.loadUser();
    }

    private initForms(): void {
        this.profileForm = this.fb.group({
            name: ['', [Validators.minLength(5), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,}(?: [a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,})+$/)]],
            email: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            phoneNumber: ['', [Validators.pattern(/^(\+224|00224)?\s?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}$/)]],
        });

        this.addressForm = this.fb.group({
            country: [{ value: 'Guinée', disabled: true }, Validators.required],
            city: ['', enumValidator(City)],
            commune: [{ value: '', disabled: true }],
            description: ['', optionalPatternValidator(/^[A-Za-zÀ-ÿ0-9\s,.\-]{5,200}$/)]
        });
    }

    private loadUserData(): void {
        this.userService.user$.subscribe(user => {
            if (!user) return;
            this.userData = user;
            this.patchProfileForm(user);
            this.loadUserAddress();
        });
    }

    private patchProfileForm(user: User): void {
        this.initialProfileData = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        };

        this.profileForm.patchValue(this.initialProfileData);
    }

    private loadUserAddress(): void {
        this.addressService.getCurrentUserAddress().subscribe({
        next: (address: Address) => {
            this.userAddress = address;
            this.initialAddressData = {
                city: address.city as City,
                commune: address.city === City.Conakry ? address.commune as ConakryCommune : '' as ConakryCommune,
                description: address.description,
                country: address.country,
            };
            this.addressForm.patchValue({
                city: address.city,
                commune: address.city === City.Conakry ? address.commune : '',
                description: address.description || '',
            });

            if (address.city === City.Conakry)
                this.addressForm.get('commune')?.enable();
            else
                this.addressForm.get('commune')?.disable();

            this.addressFormErrorMessage = '';
        },
        error: err => {
            this.addressFormErrorMessage = err.error.message || 'Erreur lors du chargement de l’adresse';
            console.error(err);
        }
        });
    }

    private handleCityChanges(): void {
        this.addressForm.get('city')?.valueChanges.subscribe((city: City) => {
        const communeControl = this.addressForm.get('commune');
        if (city === City.Conakry) {
            communeControl?.enable();
        } else {
            communeControl?.disable();
            communeControl?.reset();
        }
        });
    }

    updateProfileInfo(): void {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        const filteredData: UpdateUserDto = this.getFilteredFormData(this.profileForm.value);
        if (!this.hasFormChanged(this.initialProfileData, filteredData)) {
            this.profileFormErrorMessage = '✅ Votre profil est déjà à jour.';
            return;
        }

        this.isLoading = true;
        this.userService.updateUserProfile(filteredData).subscribe({
        next: () => this.profileFormErrorMessage = '',
        error: (err) => {
            this.showAlertMessage("Impossible de mettre à jour votre profil", 'error');
            this.profileFormErrorMessage = err.error.message || 'Erreur serveur';
        },
        complete: () => {
            this.showAlertMessage("Votre profil a bien été mis à jour", 'info');
            this.isLoading = false;
        }
        });
    }

    updateAddressInfo(): void {
        if (this.addressForm.invalid) {
            this.addressForm.markAllAsTouched();
            return;
        }

        const filteredData: UpdateAddressDto = this.getFilteredFormData(this.addressForm.getRawValue());

        if (!filteredData.commune && !this.isCityConakry())
            filteredData.commune = '';

        if (!this.hasFormChanged(this.initialAddressData, filteredData)) {
            this.addressFormErrorMessage = '✅ Votre adresse est déjà à jour.';
            return;
        }

        this.addressIsLoading = true;
        this.addressService.updateAddressById(this.userAddress.id, filteredData).subscribe({
        next: () => this.addressFormErrorMessage = '',
        error: err => {
            this.showAlertMessage("Impossible de mettre à jour l'adresse", 'error');
            this.addressFormErrorMessage = err.error.message || 'Erreur serveur';
        },
        complete: () => {
            this.showAlertMessage("Votre adresse a bien été mise à jour", 'success');
            this.initialAddressData = { ...this.addressForm.getRawValue() };
            this.addressIsLoading = false;
        }
        });
    }

    // === Helpers ===

    isCityConakry(): boolean {
        return this.addressForm.controls['city'].value === City.Conakry;
    }

    private getFilteredFormData(data: any): any {
        return Object.fromEntries(
          Object.entries(data).filter(([_, val]) => val !== '' && val !== null)
        );
    }


    private hasFormChanged(initialData: any, newData: any): boolean {
        return Object.entries(newData).some(
            ([key, value]) => initialData[key] !== value
        );
    }

    isFormValid(form: FormGroup): boolean {
        return Object.values(form.controls)
          .filter(control => control.enabled) // ignore les champs désactivés
          .every(control => control.valid);   // chaque champ activé doit être valide
    }


    isAllFieldsEmpty(form: FormGroup): boolean {
        return Object.values(form.controls)
          .filter(control => control.enabled)
          .every(control => {
            const value = control.value;
            return value === null || value === undefined || value.toString().trim() === '';
        });
    }

    private showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
        this.alertMsg = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
    }
  }
