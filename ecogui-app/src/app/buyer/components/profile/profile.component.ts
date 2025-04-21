import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { FeathericonsModule } from '../../../shared/icons/feathericons/feathericons.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, MatCardModule, RouterLinkActive, RouterLink, FeathericonsModule, MatButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    constructor(public router: Router){}

    isSidebarHidden(): boolean {
        return this.router.url === '/profile/orders/details' || this.router.url === '/profile/invoices/details'
            || this.router.url === '/profile/faq' || this.router.url === '/profile/contact';
    }
}
