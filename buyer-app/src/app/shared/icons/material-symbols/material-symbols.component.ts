import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-material-symbols',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './material-symbols.component.html',
    styleUrl: './material-symbols.component.scss'
})
export class MaterialSymbolsComponent {}