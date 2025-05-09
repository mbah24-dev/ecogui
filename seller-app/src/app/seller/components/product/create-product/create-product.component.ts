import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';
import { allColors, ColorOption } from './products.colors';
import { CategoryService } from '../../../services/product/category.service';
import { Category } from '../../../models/product/category.model';
import { SizeService } from '../../../services/product/size.service';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product/product.model';
import { imagesValidator } from '../../../validators/image-select-validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AlertNotificationComponent } from "../../../../shared/alert-notification/alert-notification.component";

interface FileWithPreview {
    file: File;
    name: string;
    size: number;
    preview: string | ArrayBuffer | null;
}

@Component({
    selector: 'app-e-create-product',
    standalone: true,
    imports: [MatCardModule, MatProgressSpinnerModule, MatButtonModule, ReactiveFormsModule, FormsModule, CommonModule, MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, NgxEditorModule, MatDatepickerModule, FileUploadModule, MatSelectModule, NgIf, AlertNotificationComponent],
    providers: [provideNativeDateAdapter()],
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
/**
 * Composant Angular responsable de la création d’un nouveau produit.
 * Gère le formulaire, la sélection de fichiers/images, les couleurs, tailles et catégories.
 */
export class CreateProductComponent implements OnInit, OnDestroy {
    createProductForm!: FormGroup;
    editor: Editor | null = null;

    toolbar: Toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    categories: Category[] = [];
    selectedCategory: Category | null = null;
    sizes: string[] = [];
    selectedColors: string[] = [];
    selectedFiles: FileWithPreview[] = [];

    colors: ColorOption[] = allColors;
    isLoading: boolean = false;
    isSubmitting: boolean = false;
    dragOver: boolean = false;
    errorMessage!: string;
    alertMsg = '';
    alertType: 'success' | 'error' | 'info' = 'info';
    showAlert: boolean = false;

    @ViewChild('fileInput') fileInput!: ElementRef;

    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private fb: FormBuilder,
      private categoryService: CategoryService,
      private sizeService: SizeService,
      private productService: ProductService,
      private router: Router
    ) {}

    /**
   * Initialise l’éditeur, le formulaire, et charge les catégories au démarrage du composant.
   */
    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.editor = new Editor();
        this.initCreateProductForm();
        this.loadCategories();
      }
    }

    /**
   * Nettoie les ressources utilisées par le composant, notamment l'éditeur.
   */
    ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
        this.editor.destroy();
      }
    }

    /**
   * Initialise le formulaire de création de produit avec les validateurs nécessaires.
   */
    initCreateProductForm(): void {
      this.createProductForm = this.fb.group({
        name: ['', [
          Validators.required,
          Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s.,()'’\-\/+:&]{2,100}$/),
          Validators.maxLength(100)
        ]],
        description: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000)
        ]],
        price: [100, [
          Validators.required,
          Validators.min(500),
          Validators.max(999999000),
          Validators.pattern(/^[0-9]+$/)
        ]],
        stock: [1, [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000000),
          Validators.pattern(/^[0-9]+$/)
        ]],
        category: ['', Validators.required],
        sizes: [[], Validators.required],
        colors: [[], Validators.required],
        images: [null]
      });
    }

    /**
   * Charge les catégories depuis l’API, ou fournit une fallback locale en cas d’erreur.
   */
    loadCategories(): void {
        this.categoryService.getCategories().subscribe({
        next: (categories: Category[]) => {
            this.categories = categories;
        },
        error: (err) => {
            console.error('Erreur lors du chargement des catégories', err);
            this.categories = [
                { id: '1', name: 'Électronique' },
                { id: '2', name: 'Mode' },
                { id: '3', name: 'Maison' },
                { id: '4', name: 'Autre' }
            ];
        }
        });
    }

    /**
   * Gère la logique métier lors du changement de catégorie,
   * et met à jour dynamiquement les tailles disponibles.
   * @param event L’événement de sélection de catégorie.
   */
    onCategoryChange(event: any): void {
        this.selectedCategory = event.value;
        if (this.selectedCategory) {
            this.sizes = this.sizeService.getSizesForCategory(this.selectedCategory.name);
        } else {
            this.sizes = ['Standard'];
        }
        this.createProductForm.get('sizes')?.setValue([]);
    }

    /**
   * Met à jour les tailles sélectionnées dans le formulaire.
   * @param selected Liste des tailles sélectionnées.
   */
    onSizeSelectionChange(selected: string[]): void {
        this.createProductForm.get('sizes')?.setValue(selected);
    }

    /**
   * Met à jour les couleurs sélectionnées et synchronise avec le formulaire.
   * @param selected Liste des couleurs sélectionnées.
   */
    onColorSelectionChange(selected: string[]): void {
        this.selectedColors = selected;
        this.createProductForm.get('colors')?.setValue(selected);
    }

    /**
   * Compare deux catégories pour déterminer si elles sont identiques.
   * @param c1 Première catégorie.
   * @param c2 Deuxième catégorie.
   * @returns `true` si les catégories sont identiques, sinon `false`.
   */
    compareCategories(c1: Category | null, c2: Category | null): boolean {
        return (c1 && c2) ? c1.id === c2.id : c1 === c2;
    }

    /**
   * Soumet le formulaire de création de produit si tous les champs sont valides.
   * Construit le `FormData`, puis appelle le service de création.
   */
    onSubmit(): void {
        if (this.createProductForm.invalid || this.selectedFiles.length < 2) {
            this.createProductForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        const formData = new FormData();
        const formValue = this.createProductForm.value;

        formData.append('name', formValue.name);
        formData.append('description', formValue.description);
        formData.append('price', formValue.price.toString());
        formData.append('stock', formValue.stock.toString());
        formData.append('categoryId', formValue.category['id']);

        formValue.sizes.forEach((s: string) => formData.append('sizes[]', s));
        formValue.colors.forEach((c: string) => formData.append('colors[]', c));

        const files: File[] = this.selectedFiles.map(f => f.file);
        files.forEach(file => formData.append('images', file));

        this.productService.createProduct(formData).subscribe({
            next: (response: Product) => {
                this.errorMessage = '';
                this.isSubmitting = false;
                this.showAlertMessage("Votre produit a bien été creer", 'success');
                setTimeout(() => {
                    this.router.navigate(['/seller/products']);
                }, 3000);
            },
            error: (err) => {
                this.errorMessage = err.error.message;
                this.showAlertMessage(this.errorMessage, 'error');
                this.isSubmitting = false;
            }
        });
    }

    /**
   * Gère la sélection de fichiers depuis l’input fichier,
   * puis ajoute chaque fichier au tableau `selectedFiles`.
   * @param event Événement de sélection de fichiers.
   */
    onFileSelected(event: any): void {
        event.preventDefault();
        const files: FileList = event.target.files;
        if (files && files.length > 0) {
            this.selectedFiles = []; // Reset avant d'ajouter les nouveaux
            Array.from(files).forEach(file => this.addFile(file));
            this.createProductForm.get('images')?.setValue(this.selectedFiles);
            this.createProductForm.get('images')?.updateValueAndValidity();
        }
        this.fileInput.nativeElement.value = '';
    }

    /**
   * Ajoute un fichier image au tableau `selectedFiles`, en générant son aperçu.
   * @param file Le fichier à ajouter.
   */
    addFile(file: File): void {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = () => {
            const newFile: FileWithPreview = {
                file,
                name: file.name,
                size: file.size,
                preview: reader.result
            };
            this.selectedFiles.push(newFile);
        };
        reader.readAsDataURL(file);
    }

    /**
   * Supprime une image de la liste et met à jour la validation du champ `images`.
   * @param index L’index de l’image à supprimer.
   */
    removeImage(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.createProductForm.get('images')?.setValue(this.selectedFiles.length > 0 ? this.selectedFiles : null);
        this.createProductForm.get('images')?.updateValueAndValidity();
    }

    /**
   * Gère la logique de dépôt de fichiers via drag & drop.
   * @param event Événement de dépôt.
   */
    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.dragOver = false;

        if (event.dataTransfer?.files) {
            Array.from(event.dataTransfer.files).forEach(file => this.addFile(file));
            this.updateImagesValidation();
        }
    }

    /**
   * Met à jour dynamiquement la validation du champ `images` en fonction du nombre de fichiers sélectionnés.
   */
    private updateImagesValidation(): void {
        const imagesControl = this.createProductForm.get('images');
        if (this.selectedFiles.length >= 2) {
            imagesControl?.setValue(this.selectedFiles);
            imagesControl?.setErrors(null);
        } else {
            imagesControl?.setValue(null);
            imagesControl?.setErrors({ required: true });
        }
        imagesControl?.markAsTouched();
        imagesControl?.updateValueAndValidity();
    }

     /**
     * Active l’état visuel de survol lors d’un drag & drop de fichiers.
     * @param event Événement de survol.
     */
    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.dragOver = true;
    }

    /**
   * Réinitialise l’état visuel de survol lors du drag & drop.
   * @param event Événement de sortie de zone.
   */
    onDragLeave(event: DragEvent) {
        this.dragOver = false;
    }

    /**
   * Affiche un message d’alerte temporaire dans le composant.
   * @param message Le contenu du message.
   * @param type Le type d’alerte : success | error | info.
   */
    private showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
        this.alertMsg = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
    }
}
