import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

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
    NgIf
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Infos utilisateur
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      countryCode: [''],

      // Adresse
      country: [{ value: 'Guinée', disabled: true }, Validators.required],
      city: ['', Validators.required],
      commune: ['', Validators.required],
      description: ['']
    });

    const user = {
      name: 'BAH Mamadou',
      email: 'mbah@student.42lyon.fr',
      phoneNumber: '621 66 66 85',
      countryCode: '+224'
    };

    const address = {
      city: 'Conakry',
      commune: 'Ratoma',
      description: 'Derrière la station Total a madina ka djoma foutti'
    };

    this.form.patchValue({
      ...user,
      ...address
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userData = this.form.getRawValue(); // getRawValue pour inclure country (disabled)
      console.log('Formulaire valide ! 🎉', userData);
      // TODO: Envoie les données au backend
    } else {
      this.form.markAllAsTouched();
      console.warn('Formulaire invalide 😬');
    }
  }
}
