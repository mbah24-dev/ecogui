import { Component, OnInit } from '@angular/core';
import { ItemsFromOrderComponent } from "./items-from-order/items-from-order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { BillingInformationComponent } from "./billing-information/billing-information.component";
import { MatCardModule } from '@angular/material/card';
import { OrderActionComponent } from "./order-action/order-action.component";
import { Router } from '@angular/router';
import { AlertNotificationComponent } from "../../../../../shared/alert-notification/alert-notification.component";
import { CommonModule } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [ItemsFromOrderComponent, OrderSummaryComponent, BillingInformationComponent, MatCardModule, ItemsFromOrderComponent, OrderSummaryComponent, BillingInformationComponent, OrderActionComponent, AlertNotificationComponent, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
    showAlert = false;
    alertMsg = '';
    alertType!: 'success' | 'error' | 'info';

    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
          const state = window.history.state as { alert?: { message: string; type: 'success' | 'error' | 'info' } };
          console.log('State from window.history:', state);

          if (state?.alert) {
            this.alertMsg = state.alert.message;
            this.alertType = state.alert.type;
            this.showAlert = true;

            setTimeout(() => this.showAlert = false, 4000);
          }
        }
    }


}
