import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TopSellingProductsService } from './top-selling-products.service';

@Component({
    selector: 'app-top-selling-products',
    imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, CarouselModule],
    templateUrl: './top-selling-products.component.html',
    styleUrl: './top-selling-products.component.scss'
})
export class TopSellingProductsComponent {

	constructor(
        private topSellingProductsService: TopSellingProductsService
    ) {}

    ngOnInit(): void {
        this.topSellingProductsService.loadChart();
    }

    // Owl Carousel
    productsSlides: OwlOptions = {
        items: 1,
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		]
    }

}