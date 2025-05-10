/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.component.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/14 17:20:04 by mbah              #+#    #+#             */
/*   Updated: 2025/05/08 21:55:02 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToggleService } from './toggle.service';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { Observable, of } from 'rxjs';
import { User } from '../../seller/models/user/user.model';
import { AuthService } from '../../seller/services/auth/auth.service';
import { LogoutService } from '../../seller/services/auth/logout.service';
import { UserService } from '../../seller/services/user/user.service';
import { Environment } from '../../seller/utils/environment';
import { Product, ProductService } from '../../seller/services/product.service';
import { ImageService } from '../../seller/services/image/image.service';


@Component({
    selector: 'app-header',
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, NgClass, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        DatePipe
    ]
})
export class HeaderComponent implements OnInit {
    products$: Observable<Product[]> = of([]);
    isAuthenticated: boolean = false;
    userData!: User | null;
    profileImage!: string;

    constructor(
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private productService: ProductService,
        private logoutService: LogoutService,
        private authService: AuthService,
        private userService: UserService,
        private environment: Environment,
        private router: Router,
        private imageService: ImageService
    ) {
    }

    ngOnInit(): void {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.products$ = this.productService.getLiveProducts();

        this.authService.isAuthenticatedClean$.subscribe(isLoggedIn => {
            this.isAuthenticated = isLoggedIn;
            if (isLoggedIn) {
                this.userService.user$.subscribe((user) => {
                    this.userData = user;
                    if (user?.profilePic) {
                        const imageUrl = this.imageService.getUserProfileImageUrl(user.profilePic);

                        this.userService.checkImageExists(imageUrl, (exists) => {
                            this.profileImage = exists ? imageUrl : 'images/user_avatar.png';
                        });

                    } else {
                        this.profileImage = 'images/user_avatar.png';
                    }
                });
                this.userService.loadUser();
            } else {
                this.userData = null;
            }
        });
    }

    /** DEBUT DE LA LOGIQUE COTER ANGULAR DU PROJET  */

    /**
     * Deconnecte l'utilisateur connecter
    */
   logout() {
        this.logoutService.logout().subscribe({
            next: () => {
                this.router.navigate(['/home']);
            }
        });
   }


    /** FIN DE LA LOGIQUE COTER ANGULAR DU PROJET  */

    isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    }

    // Toggle Service
    isToggled = false;
    toggle() {
        this.toggleService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.toggleService.toggleTheme();
    }

}

