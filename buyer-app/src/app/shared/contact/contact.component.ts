import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [
            MatFormField, FeathericonsModule, MatButton, MatLabel, ReactiveFormsModule,
            CommonModule, MatButton, FormsModule, MatFormFieldModule,
            MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf
        ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
    contactForm: FormGroup;
    isSubmitted = false;
    isLoading = false;

    constructor(private fb: FormBuilder) {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        message: ['', Validators.required]
      });
    }

    onSubmit(): void {
      if (this.contactForm.invalid) {
        this.contactForm.markAllAsTouched();
        return;
      }

      this.isLoading = true;

      const formData = this.contactForm.value;
      console.log('Message envoyé ✅ :', formData);

      // Simule une requête (ex: envoi via API, EmailJS, etc.)
      setTimeout(() => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.contactForm.reset();
      }, 2000);
    }
  }
