import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './invoice-information.component.html',
  styleUrl: './invoice-information.component.scss'
})
export class InvoiceInformationComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      info: [''],
      ville: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {}
}
