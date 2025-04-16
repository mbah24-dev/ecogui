import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { FeathericonsModule } from '../../../../../shared/icons/feathericons/feathericons.module';
import { Product } from '../../../../services/product.service';

@Component({
    selector: 'app-reviews',
    imports: [MatCardModule, MatButtonModule, MatPaginatorModule, MatTableModule, FeathericonsModule, MatProgressBarModule, MatMenuModule, NgIf],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
    @Input() product!: Product;
    displayedColumns: string[] = ['reviewer', 'ratings', 'date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

}

export interface PeriodicElement {
    reviewer: any;
    ratings: any;
    date: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'BAH Mamadou',
            email: 'bah.mamadou@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-line' },
                { star: 'ri-star-line' }
            ],
            review: `Produit de mauvaise qualité, je suis déçu. Il a cessé de fonctionner après une semaine d'utilisation.`
        },
        date: {
            date: 'Apr 10',
            time: '05:45 PM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'Mamoudou',
            email: 'mamoudou@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-half-fill' }
            ],
            review: `Très bon produit, mais la livraison a pris plus de temps que prévu. Sinon, je suis satisfait.`
        },
        date: {
            date: 'Apr 11',
            time: '03:10 PM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'Golden',
            email: 'golden@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' }
            ],
            review: `Produit excellent, exactement comme décrit. Je le recommande à 100%!`
        },
        date: {
            date: 'Apr 12',
            time: '08:00 AM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'Mawia',
            email: 'mawia@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-line' },
                { star: 'ri-star-line' },
                { star: 'ri-star-line' }
            ],
            review: `La qualité du produit est décevante. Il ne répond pas à mes attentes et il est fragile.`
        },
        date: {
            date: 'Apr 13',
            time: '09:15 AM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'BAH Mamadou',
            email: 'bah.mamadou@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' }
            ],
            review: `Un produit fantastique! Très satisfait de mon achat. La qualité est top et il fonctionne parfaitement.`
        },
        date: {
            date: 'Apr 14',
            time: '06:30 PM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'Golden',
            email: 'golden@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-half-fill' },
                { star: 'ri-star-line' },
                { star: 'ri-star-line' }
            ],
            review: `Le produit est bon mais il manque certaines fonctionnalités que j'avais espérées.`
        },
        date: {
            date: 'Apr 15',
            time: '02:20 PM'
        }
    },
    {
        reviewer: {
            img: 'images/profile.jpg',
            name: 'Mawia',
            email: 'mawia@info.com'
        },
        ratings: {
            stars: [
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-fill' },
                { star: 'ri-star-line' },
                { star: 'ri-star-line' }
            ],
            review: `Produit moyen, mais il correspond à ce que j'avais vu en ligne. Rien d'extraordinaire.`
        },
        date: {
            date: 'Apr 16',
            time: '04:50 PM'
        }
    }
];
