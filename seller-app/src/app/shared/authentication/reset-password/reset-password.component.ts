import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { ResetPasswordService } from '../../../seller/services/auth/reset-password.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-reset-password',
    imports: [RouterLink, MatProgressSpinnerModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FeathericonsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
    // Password Hide
    hide = true;
    hide2 = true;

    formInfo!: FormGroup;
    token!: string;
    isLoading: boolean = false;
    errorMessage!: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private resetPasswordService: ResetPasswordService,
        private route: ActivatedRoute) {
        this.token = route.snapshot.queryParams['token'];
        if (!this.token) {
            throw new Error('Invalid token');
        }
        this.formInfo = this.fb.group({
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ]
            ],
            confirm_password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ]
            ],
        });
    }

    onSubmit() {
        if (this.formInfo.valid) {
            if (this.passwordsMatch())
            {
                this.isLoading = true;
                const password = this.formInfo.controls['password'].value;
                this.resetPasswordService.reset_password(password, this.token).subscribe({
                    next: (res) => {
                        this.router.navigate(['/authentication/confirm-reset-password']);
                    },
                    error: (err) => {
                        this.isLoading = false;
                        this.errorMessage = err.error?.message;
                    },
                    complete: () => {
                        this.isLoading = false;
                    }
                });
            }
            else
                this.errorMessage = 'Les deux mot de passe doivent être identique';
        }
    }

    private passwordsMatch(): boolean {
        const password = this.formInfo.controls['password'].value;
        const confirmPassword = this.formInfo.controls['confirm_password'].value;
        return password === confirmPassword;
    }



}
