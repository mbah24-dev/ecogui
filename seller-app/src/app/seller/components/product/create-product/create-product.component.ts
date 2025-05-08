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

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.editor = new Editor();
        this.initCreateProductForm();
        this.loadCategories();
      }
    }

    ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && this.editor) {
        this.editor.destroy();
      }
    }

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

    onCategoryChange(event: any): void {
        this.selectedCategory = event.value;
        if (this.selectedCategory) {
            this.sizes = this.sizeService.getSizesForCategory(this.selectedCategory.name);
        } else {
            this.sizes = ['Standard'];
        }
        this.createProductForm.get('sizes')?.setValue([]);
    }

    onSizeSelectionChange(selected: string[]): void {
        this.createProductForm.get('sizes')?.setValue(selected);
    }

    onColorSelectionChange(selected: string[]): void {
        this.selectedColors = selected;
        this.createProductForm.get('colors')?.setValue(selected);
    }

    compareCategories(c1: Category | null, c2: Category | null): boolean {
        return (c1 && c2) ? c1.id === c2.id : c1 === c2;
    }

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
                    this.router.navigate(['/']);
                }, 3000);
            },
            error: (err) => {
                this.errorMessage = err.error.message;
                this.showAlertMessage(this.errorMessage, 'error');
                this.isSubmitting = false;
            }
        });
    }

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

    removeImage(index: number): void {
        this.selectedFiles.splice(index, 1);
        this.createProductForm.get('images')?.setValue(this.selectedFiles.length > 0 ? this.selectedFiles : null);
        this.createProductForm.get('images')?.updateValueAndValidity();
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.dragOver = false;

        if (event.dataTransfer?.files) {
            Array.from(event.dataTransfer.files).forEach(file => this.addFile(file));
            this.updateImagesValidation();
        }
    }

    // Nouvelle méthode pour gérer la validation des images
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

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.dragOver = true;
    }

    onDragLeave(event: DragEvent) {
        this.dragOver = false;
    }

    private showAlertMessage(message: string, type: 'success' | 'error' | 'info'): void {
        this.alertMsg = message;
        this.alertType = type;
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
    }
}
