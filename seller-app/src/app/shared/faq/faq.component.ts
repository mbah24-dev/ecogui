import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  imports: [MatCardModule, MatButtonModule, MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
    panelOpenState: boolean = false;
}
