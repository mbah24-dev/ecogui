import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-box',
  imports: [MatCardModule, RouterModule, MatButtonModule],
  templateUrl: './empty-box.component.html',
  styleUrl: './empty-box.component.scss'
})
export class EmptyBoxComponent {
    @Input() title: string = '';
    @Input() message: string = '';
    @Input() buttonText: string = '';
    @Input() linkTo: string = '';
}
