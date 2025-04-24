import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToggleService } from '../header/toggle.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';

@Component({
    selector: 'app-sidebar',
    imports: [NgScrollbarModule, MatExpansionModule, RouterModule, RouterLink,  RouterLinkActive, NgClass, FeathericonsModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    constructor(
        private toggleService: ToggleService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

}
