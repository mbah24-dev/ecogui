import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { User } from '../../../buyer/models/user/user.model';
import { UserService } from '../../../buyer/services/user/user.service';
import { UpdateUserDto } from '../../../buyer/dto/user/update-user.dto';
import { enumValidator } from '../../../buyer/validators/enum-validator';
import { City, ConakryCommune } from '../../../buyer/enums/address.enums';
import { optionalPatternValidator } from '../../../buyer/validators/optional-pattern-validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertNotificationComponent } from '../../alert-notification/alert-notification.component';
import { AddressService } from '../../../buyer/services/user/address.service';
import { Address } from '../../../buyer/models/user/address.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateAddressDto } from '../../../buyer/dto/address/update-address.dto';

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
    profileForm!: FormGroup;
    addressForm!: FormGroup;
    userData!: User | null;
    profileFormErrorMessage!: string;
    addressFormErrorMessage!: string;
    initialProfileData!: Partial<UpdateUserDto>;
    initialAddressData!: Partial<UpdateAddressDto>;
    isLoading: boolean = false;
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info'
    cityList: string[] = Object.values(City);
    communeList: string[] = Object.values(ConakryCommune);
    addressErrorMessage!: string;
    userAddress!: Address;
    addressIsLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private addressService: AddressService
    ) {}

    ngOnInit(): void {
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

        this.userService.user$.subscribe(user => {
            if (user) {
                this.userData = user;
                this.addressService.getCurrentUserAddress().subscribe({
                    next: (response: Address) => {
                        this.userAddress = response;
                        this.addressForm.patchValue({
                            city: response.city,
                            commune: response.city === City.Conakry ? response.commune : '',
                            description: response.description || ''
                        });
                        this.initialAddressData = {
                            commune: response.city === City.Conakry ? response.commune as ConakryCommune : '' as ConakryCommune,
                            city: response.city as City,
                            description: response.description,
                            country: response.country,
                        };
                        if (response.city === City.Conakry)
                            this.addressForm.get('commune')?.enable();
                        else
                            this.addressForm.get('commune')?.disable();
                        this.addressErrorMessage = '';
                    },
                    error: (err) => {
                        console.log(err);
                        this.addressErrorMessage = err.error.message;
                    }
                });

                this.initialProfileData = {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                };

                this.profileForm.patchValue({
                    ...this.userData,
                });
            }
        });

        // Réagir au changement de ville
        this.addressForm.get('city')?.valueChanges.subscribe((city: City) => {
            const communeControl = this.addressForm.get('commune');

            if (city === City.Conakry) {
              communeControl?.enable();
            } else {
              communeControl?.disable();
              communeControl?.reset(); // vide la commune
            }
        });
        // Charge les données utilisateur initiales
        this.userService.loadUser();
    }

    isCityConakry(): boolean {
        if (this.addressForm.controls['city'].value === City.Conakry)
            return (true);
        return (false);
    }

    updateProfileInfo() {
        if (this.profileForm.valid) {
            const filteredData: UpdateUserDto = Object.fromEntries(
                Object.entries(this.profileForm.value).filter(([_, val]) => val !== '' && val !== null)
            );

            const hasChanged = Object.entries(filteredData).some(
                ([key, value]) => this.initialProfileData[key as keyof UpdateUserDto] !== value
            );

            if (!hasChanged) {
                this.profileFormErrorMessage = '✅ votre profile est déjà à jour. Aucune modification détectée.';
                return;
            }
            this.isLoading = true;
            this.userService.updateUserProfile(filteredData).subscribe({
                next: (response) => {
                    this.profileFormErrorMessage = '';
                },
                error: (err) => {
                    this.isLoading = false;
                    this.showAlertMessage("Impossible de mettre à jour votre profil", 'error');
                    this.profileFormErrorMessage = 'Impossible de mettre à jour votre profil';
                    setTimeout(() => this.showAlert = false, 4000);
                },
                complete: () => {
                    this.showAlertMessage('Votre profil a bien été mis à jour', 'info');
                    this.isLoading = false;
                    setTimeout(() => this.showAlert = false, 4000);
                }
            });
        } else {
          this.profileForm.markAllAsTouched();
        }
    }


    updateAddressInfo() {
        if (this.addressForm.valid) {
            const filteredData: UpdateAddressDto = Object.fromEntries(
                Object.entries(this.addressForm.getRawValue()).filter(([_, val]) => val !== '' && val !== null)
            );

            const hasChanged = Object.entries(filteredData).some(
                ([key, value]) => this.initialAddressData[key as keyof UpdateAddressDto] !== value
            );

            if (!filteredData.commune && !this.isCityConakry())
                filteredData.commune = '';

            if (!hasChanged) {
                this.addressErrorMessage = '✅ Votre adresse est déjà à jour. Aucune modification détectée.';
                return;
            }
            this.addressIsLoading = true;
            this.addressService.updateAddressById(this.userAddress.id, filteredData).subscribe({
                next: (response: Address) => {
                    this.addressErrorMessage = '';
                },
                error: (err) => {
                    this.showAlertMessage("Impossible de mettre à jour l\'adresse", 'error');
                    this.addressIsLoading = false;
                    this.addressErrorMessage = err.error.message;
                    setTimeout(() => this.showAlert = false, 4000);
                },
                complete: () => {
                    this.showAlertMessage("Votre adresse à bien été mis à jour", 'success');
                    this.addressIsLoading = false;
                    this.initialAddressData = { ...this.addressForm.getRawValue() };
                    setTimeout(() => this.showAlert = false, 4000);
                }
            });
        } else
            this.addressForm.markAllAsTouched();
    }

    // Fonction qui vérifie si les champs non vides sont valides
    isFormValid(form: any) {
        const formControls = form.controls;
        for (const key in formControls) {
            if (formControls[key].value && formControls[key].invalid) {
                return false;
            }
        }
        return true;
    }

    isAllFieldsEmpty(form: any): boolean {
        const formControls = form.controls;
        for (const controlName in formControls) {
          const control = formControls[controlName];
          if (control.value && control.value.trim() !== '') {
            return false;
          }
        }
        return true;
    }

    private showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
        this.alertMsg = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
    }

}
