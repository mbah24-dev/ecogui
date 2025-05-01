import { tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AlertNotificationComponent } from "../../alert-notification/alert-notification.component";
import { UserService } from '../../../buyer/services/user/user.service';
import { UpdateUserDto } from '../../../buyer/dto/user/update-user.dto';

@Component({
  selector: 'app-change-password',
  imports: [MatProgressSpinnerModule, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, AlertNotificationComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
    hide = true;
    hide2 = true;
    hide3 = true;
    updatePasswordForm!: FormGroup;
    errorMessage!: string;
    isLoading: boolean = false;
    showAlert!: boolean;
    alertMsg!: string;
    alertType!: 'success' | 'error' | 'info'

    constructor(private fb: FormBuilder, private userService: UserService) {}

    ngOnInit(): void {
        this.updatePasswordForm = this.fb.group({
            old_password: ['', [Validators.required, Validators.minLength(8)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirm_password: ['', [Validators.required, Validators.minLength(8)]],
        });

    }

    updatePassword() {
        if (this.updatePasswordForm.valid) {
            this.isLoading = true;
            if (this.updatePasswordForm.controls['password'].value ===
                this.updatePasswordForm.controls['confirm_password'].value) {
                const data: UpdateUserDto = this.updatePasswordForm.value;
                this.userService.updateUserProfile(data).subscribe({
                    next: () => {
                        this.errorMessage = '';
                    },
                    error: (err) => {
                        this.isLoading = false;
                        this.errorMessage = err.error.message;
                        this.showAlertMessage(err.error.message, 'error');
                        setTimeout(() => this.showAlert = false, 4000);
                    },
                    complete: () => {
                        this.isLoading = false;
                        this.showAlertMessage('Votre mot de passe a bien été mis à jour', 'success');
                        setTimeout(() => this.showAlert = false, 4000);
                    }
                });
            }
            else
            {
                this.errorMessage = 'Les deux mots de passe doivent être identique';
                this.isLoading = false;
            }
        } else {
            this.updatePasswordForm.markAllAsTouched();
            return;
        }
    }

    private showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
        this.alertMsg = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
    }
}
