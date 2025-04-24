import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, MatButton, MatIconButton, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.router.navigate(['/']);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

}
