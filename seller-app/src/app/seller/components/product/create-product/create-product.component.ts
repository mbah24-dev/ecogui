import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSelectModule } from '@angular/material/select';
import { FeathericonsModule } from '../../../../shared/icons/feathericons/feathericons.module';

type Category = 'electronique' | 'chaussures' | 'mode' | 'accessoires' | 'autre';

@Component({
    selector: 'app-e-create-product',
    imports: [MatCardModule, MatButtonModule, CommonModule, MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, FeathericonsModule, NgxEditorModule, MatDatepickerModule, FileUploadModule, MatSelectModule, NgIf],
    providers: [provideNativeDateAdapter()],
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

    editor!: Editor | null;  // Make it nullable
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

    selectedCategory!: Category;
    selectedSize!: string;;
    sizes!: string[];

    // Type explicit pour categorySizes
    categorySizes: { [key in Category]: string[] } = {
        electronique: ['13"', '14"', '15"', '18"', '20"', '27"', '30"'],
        chaussures: ['40', '41', '42', '43', '44', '45'],
        mode: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        accessoires: ['Regulier'],
        autre: ['autre']
    };

    // Cette fonction est déclenchée lorsqu'une catégorie est sélectionnée
    onCategoryChange(event: any) {
        const category = event.value as Category;
        this.sizes = this.categorySizes[category] || [];
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Initialise l'éditeur uniquement dans le navigateur
            this.editor = new Editor();
            this.selectedCategory = 'autre';
            this.selectedSize = '';
            this.sizes = [];
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
        this.editor.destroy();
        }
    }

}
