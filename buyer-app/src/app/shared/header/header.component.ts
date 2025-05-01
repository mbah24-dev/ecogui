/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.component.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/14 17:20:04 by mbah              #+#    #+#             */
/*   Updated: 2025/04/30 14:42:36 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ToggleService } from './toggle.service';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { Product, ProductService } from '../../buyer/services/product.service';
import { WhishlistComponent } from "./whishlist/whishlist.component";
import { CartPreviewComponent } from "./cart-preview/cart-preview.component";
import { Observable, of } from 'rxjs';
import { LogoutService } from '../../buyer/services/auth/logout.service';
import { AuthService } from '../../buyer/services/auth/auth.service';
import { UserService } from '../../buyer/services/user/user.service';
import { User } from '../../buyer/models/user/user.model';
import { Enviroment } from '../../buyer/utils/eviroment';


@Component({
    selector: 'app-header',
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, NgClass, WhishlistComponent, CartPreviewComponent, AsyncPipe, CommonModule],
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
        private enviroment: Enviroment
    ) {
    }

    ngOnInit(): void {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.formattedDate = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
        this.products$ = this.productService.getLiveProducts();

        this.authService.isAuthenticated$.subscribe(isLoggedIn => {
            this.isAuthenticated = isLoggedIn;
            if (isLoggedIn) {
                this.userService.user$.subscribe((user) => {
                    this.userData = user;
                    if (user?.profilePic) {
                        const imageUrl = `${this.enviroment.apiUrl}/static/upload/images/user_profiles/${user.profilePic}`;

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
        this.logoutService.logout().subscribe();
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

    // Current Date
    currentDate: Date = new Date();
    formattedDate: any;

}
