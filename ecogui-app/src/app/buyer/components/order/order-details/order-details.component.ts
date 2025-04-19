import { Component } from '@angular/core';
import { ItemsFromOrderComponent } from "./items-from-order/items-from-order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { BillingInformationComponent } from "./billing-information/billing-information.component";
import { MatCardModule } from '@angular/material/card';
import { OrderActionComponent } from "./order-action/order-action.component";

@Component({
  selector: 'app-order-details',
  imports: [ItemsFromOrderComponent, OrderSummaryComponent, BillingInformationComponent, MatCardModule, ItemsFromOrderComponent, OrderSummaryComponent, BillingInformationComponent, OrderActionComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {

}
