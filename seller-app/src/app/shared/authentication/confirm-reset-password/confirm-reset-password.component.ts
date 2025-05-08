import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FeathericonsModule } from '../../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-confirm-reset-password',
    imports: [RouterLink, MatButtonModule, FeathericonsModule],
    templateUrl: './confirm-reset-password.component.html',
    styleUrl: './confirm-reset-password.component.scss'
})
export class ConfirmResetPasswordComponent {}
