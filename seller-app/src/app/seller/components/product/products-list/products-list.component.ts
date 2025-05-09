import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { forkJoin, map, Observable } from 'rxjs';

import { ProductService } from '../../../services/product/product.service';
import { ImageService } from '../../../services/image/image.service';
import { CategoryService } from '../../../services/product/category.service';
import { Product } from '../../../models/product/product.model';
import { generateStarIcons, generateRandomRating } from '../../../utils/generate-start-icon';

export interface DisplayProduct {
    product: {
      id: string;
      img: string;
      title: string;
      categoryName: string;
    };
    price: number;
    ratings: {
      star: { star: string }[];
      totalRatings: number;
    };
    stock: string | number;
    totalOrders: string;
    action: {
      view: string;
      edit: string;
      delete: string;
    };
}

@Component({
  selector: 'app-e-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
    displayedColumns: string[] = ['product', 'categoryName', 'price', 'ratings', 'stock', 'totalOrders', 'action'];
    dataSource = new MatTableDataSource<DisplayProduct>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private productService: ProductService,
      private imageService: ImageService,
      private categoryService: CategoryService
    ) {
      // Enregistre les locales françaises pour les formats numériques
      registerLocaleData(localeFr);
    }

    /**
     * Initialise le chargement des produits à l'initialisation du composant.
     */
    ngOnInit(): void {
      this.loadProducts();
    }

    /**
     * Connecte le paginator Angular Material à la data source une fois la vue chargée.
     */
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
    }

    /**
     * Récupère les produits du vendeur depuis le service
     * et les enrichit avec leur catégorie pour affichage.
     */
    private loadProducts(): void {
      this.productService.getSellerProducts().subscribe({
        next: ({ products }) => this.resolveProductList(products),
        error: err => console.error('Erreur de chargement des produits :', err)
      });
    }

    /**
     * Pour chaque produit, récupère le nom de sa catégorie,
     * construit l’objet d’affichage, puis injecte le tout dans la table.
     *
     * @param products Liste des produits bruts à enrichir
     */
    private resolveProductList(products: Product[]): void {
      const observables = products.map(product =>
        this.getCategoryName(product.categoryId).pipe(
          map(categoryName => this.mapToDisplayProduct(product, categoryName))
        )
      );

      forkJoin(observables).subscribe(displayProducts => {
        this.dataSource.data = displayProducts;
      });
    }

    /**
     * Récupère le nom d’une catégorie à partir de son identifiant.
     *
     * @param categoryId ID de la catégorie
     * @returns Nom de la catégorie ou 'Inconnue' si non trouvée
     */
    private getCategoryName(categoryId: string): Observable<string> {
      return this.categoryService.getCategoryById(categoryId).pipe(
        map(category => category?.name || 'Inconnue')
      );
    }

    /**
     * Construit un objet `DisplayProduct` à partir d’un produit brut et de son nom de catégorie.
     *
     * @param product Le produit à afficher
     * @param categoryName Nom de la catégorie associée
     * @returns Produit au format adapté pour l’interface
     */
    private mapToDisplayProduct(product: Product, categoryName: string): DisplayProduct {
      return {
        product: {
          id: product.id,
          img: this.imageService.getProductImageUrl(product.images[0]?.url),
          title: product.name,
          categoryName
        },
        price: product.price,
        ratings: {
          star: generateStarIcons(generateRandomRating()),
          totalRatings: 0
        },
        stock: product.stock,
        totalOrders: product.buyCount?.toString() || '0',
        action: {
          view: 'ri-eye-line',
          edit: 'ri-edit-line',
          delete: 'ri-delete-bin-line'
        }
      };
    }

    /**
     * Fonction `trackBy` pour optimiser le rendu des lignes de produits.
     *
     * @param _index Index de la ligne
     * @param item Produit affiché
     * @returns ID unique du produit
     */
    trackByProductId(_index: number, item: DisplayProduct): string {
      return item.product.id;
    }

    /**
     * Fonction `trackBy` pour les étoiles d’un produit (utilisée dans *ngFor).
     *
     * @param productId ID du produit
     * @returns Clé de suivi unique pour chaque icône étoile
     */
    trackByStarIconWithProductId(productId: string) {
      return (index: number, item: { star: string }) => `${productId}-${item.star}-${index}`;
    }
}
