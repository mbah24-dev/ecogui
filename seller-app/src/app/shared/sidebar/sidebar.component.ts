import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from '../header/toggle.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { AuthService } from '../../seller/services/auth/auth.service';

@Component({
    selector: 'app-sidebar',
    imports: [NgScrollbarModule, MatExpansionModule, RouterModule, RouterLink,  RouterLinkActive, FeathericonsModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    hovered = false;
    isMobile!: boolean;
    
    constructor(
        private toggleService: ToggleService,
        private authService: AuthService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
            this.isMobile = window.innerWidth <= 768;
        });
    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
        this.hovered = false;
    }

    // Mat Expansion
    panelOpenState = false;

}
