import { Component, OnInit } from '@angular/core';
import { ItemsFromOrderComponent } from "./items-from-order/items-from-order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AlertNotificationComponent } from '../../../../shared/alert-notification/alert-notification.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-order-details',
  imports: [FormsModule, MatInputModule, ItemsFromOrderComponent, MatFormFieldModule, CommonModule, AlertNotificationComponent,  OrderSummaryComponent, MatCardModule, ItemsFromOrderComponent, OrderSummaryComponent, AlertNotificationComponent, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
    showAlert = false;
    alertMsg = '';
    alertType!: 'success' | 'error' | 'info';

    currentStepIndex = 0;
    stepLabels = ['Préparée', 'Expédiée', 'Livrer', 'Commande livrée'];
    isDelivered = false;

    deliveryCode = '';
    inputCode = '';

    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        const state = window.history.state as { alert?: { message: string; type: 'success' | 'error' | 'info' } };

        if (state?.alert) {
          this.alertMsg = state.alert.message;
          this.alertType = state.alert.type;
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 4000);
        }

        // Simule un code à partager avec le client
        this.deliveryCode = '1234';
        console.log('Code de validation à transmettre au client :', this.deliveryCode);
      }
    }

    advanceStep(): void {
      if (this.stepLabels[this.currentStepIndex] === 'Livrer') {
        return; // On attend la validation du code
      }

      if (this.currentStepIndex < this.stepLabels.length - 1) {
        this.currentStepIndex++;
      }

      if (this.stepLabels[this.currentStepIndex] === 'Commande livrée') {
        this.isDelivered = true;
      }
    }

    validateDeliveryCode(): void {
      if (this.inputCode === this.deliveryCode) {
        this.currentStepIndex++;
        this.isDelivered = true;
        this.alertMsg = 'Commande livrée avec succès.';
        this.alertType = 'success';
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
      } else {
        this.alertMsg = 'Code incorrect. Veuillez réessayer.';
        this.alertType = 'error';
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 4000);
      }
    }
  }
