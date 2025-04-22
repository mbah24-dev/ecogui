/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   header.component.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mbah <mbah@student.42lyon.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/04/14 17:20:04 by mbah              #+#    #+#             */
/*   Updated: 2025/04/16 15:16:22 by mbah             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ToggleService } from './toggle.service';
import { FeathericonsModule } from '../icons/feathericons/feathericons.module';
import { Product, ProductService } from '../../buyer/services/product.service';
import { WhishlistComponent } from "./whishlist/whishlist.component";
import { CartPreviewComponent } from "./cart-preview/cart-preview.component";
import { Observable, of } from 'rxjs';


@Component({
    selector: 'app-header',
    imports: [FeathericonsModule, MatButtonModule, MatMenuModule, RouterLink, NgClass, WhishlistComponent, CartPreviewComponent, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        DatePipe
    ]
})
export class HeaderComponent implements OnInit {
    products$: Observable<Product[]> = of([]);

    constructor(
        public toggleService: ToggleService,
        private datePipe: DatePipe,
        private productService: ProductService

    ) {
    }

    ngOnInit(): void {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.formattedDate = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy');
        this.products$ = this.productService.getLiveProducts();
    }

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
