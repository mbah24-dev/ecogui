/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.component.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/14 17:33:31 by mbah              #+#    #+#             */
/*   Updated: 2025/05/07 12:51:34 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

declare let $: any;
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ToggleService } from './shared/header/toggle.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterOutlet, Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { AlertNotificationComponent } from "./shared/alert-notification/alert-notification.component";
import { AuthService } from './seller/services/auth/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {

    title = 'Ecogui - Ecommerce App';
    routerSubscription: any;
    location: any;
    showAlert = false;
    alertMsg = '';
    alertType: 'success' | 'error' | 'info' = 'success';
    isAuthenticated!: boolean;

    // Toggle Service
    isToggled = false;

    constructor(
        public router: Router,
        public toggleService: ToggleService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private authService: AuthService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

    // Settings Button Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // ngOnInit
    ngOnInit(){
        if (isPlatformBrowser(this.platformId)) {
            this.recallJsFuntions();
            this.authService.isAuthenticatedClean$.subscribe(isLoggedIn => {
                this.isAuthenticated = isLoggedIn;
            });
        }
    }

    // recallJsFuntions
    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            this.scrollToTop();
        });
    }
    scrollToTop() {
        if (isPlatformBrowser(this.platformId)) {
            window.scrollTo(0, 0);
        }
    }

}

