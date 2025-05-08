import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AccountSettingsComponent } from './shared/settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './shared/settings/change-password/change-password.component';
import { PrivacyPolicyComponent } from './shared/settings/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { TermsConditionsComponent } from './shared/settings/terms-conditions/terms-conditions.component';
import { FaqComponent } from './shared/faq/faq.component';
import { ContactComponent } from './shared/contact/contact.component';
import { ProductDetailsComponent } from './seller/components/product/product-details/product-details.component';
import { InvoiceDetailsComponent } from './seller/components/order/invoice/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './seller/components/order/invoice/invoice-list/invoice-list.component';
import { InvoiceComponent } from './seller/components/order/invoice/invoice.component';
import { ProfileComponent } from './seller/components/profile/profile.component';
import { EcommerceComponent } from './seller/components/ecommerce/ecommerce.component';
import { CreateProductComponent } from './seller/components/product/create-product/create-product.component';
import { ProductsListComponent } from './seller/components/product/products-list/products-list.component';
import { NewOrderComponent } from './seller/components/order/new-order/new-order.component';
import { OrderDeliveredComponent } from './seller/components/order/order-delivered/order-delivered.component';
import { ToDoComponent } from './seller/components/order/to-do/to-do.component';
import { SellerOverviewComponent } from './seller/components/profile/seller-overview/seller-overview.component';
import { OrderDetailsComponent } from './seller/components/order/order-details/order-details.component';
import { StatsComponent } from './seller/components/profile/stats/stats.component';
import { PayementListComponent } from './seller/components/payement/payement-list.component';
import { HowToSellComponent } from './seller/components/how-to-sell/how-to-sell.component';
import { AuthGuard } from './seller/guards/auth/auth.guard';
import { NoAuthGuard } from './seller/guards/auth/no-auth.guard';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { ConfirmEmailComponent } from './shared/authentication/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './shared/authentication/forgot-password/forgot-password.component';
import { LogoutComponent } from './shared/authentication/logout/logout.component';
import { ResetPasswordComponent } from './shared/authentication/reset-password/reset-password.component';
import { SignInComponent } from './shared/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './shared/authentication/sign-up/sign-up.component';
import { SellerHomeComponent } from './seller/components/seller-home/seller-home.component';
import { AuthRedirectGuard } from './seller/guards/auth/redirect.guard';

export const routes: Routes = [
    // Redirection intelligente pour la racine
  {
    path: '',
    canActivate: [AuthRedirectGuard],
    children: []
  },

  { path: 'contact', component: ContactComponent },

  // Zone publique
  {
    path: '',
    canActivate: [NoAuthGuard],
    children: [
      { path: 'home', component: SellerHomeComponent },
      {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
          { path: 'sign-in', component: SignInComponent },
          { path: 'sign-up', component: SignUpComponent },
          { path: 'forgot-password', component: ForgotPasswordComponent },
          { path: 'reset-password', component: ResetPasswordComponent },
          { path: 'confirm-email', component: ConfirmEmailComponent }
        ]
      },
      { path: 'howtosell', component: HowToSellComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent }
    ]
  },

  // Zone privée
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: EcommerceComponent },

      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', component: AccountSettingsComponent },
          { path: 'change-password', component: ChangePasswordComponent },
        ]
      },

      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'orders',
            children: [
              { path: '', component: SellerOverviewComponent },
              { path: 'details', component: OrderDetailsComponent },
            ]
          },
          { path: 'stats', component: StatsComponent },
        ]
      },

      {
        path: 'seller',
        children: [
          { path: 'products', component: ProductsListComponent },
          { path: 'add-product', component: CreateProductComponent },
          { path: 'new-orders', component: NewOrderComponent },
          { path: 'orders/delivered', component: OrderDeliveredComponent },
          { path: 'orders/tasks', component: ToDoComponent },
          {
            path: 'invoices',
            component: InvoiceComponent,
            children: [
              { path: '', component: InvoiceListComponent },
              { path: 'details', component: InvoiceDetailsComponent }
            ]
          },
          { path: 'payments', component: PayementListComponent }
        ]
      },

      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'logout', component: LogoutComponent }
    ]
  },

  // Route de fallback
  { path: '**', component: NotFoundComponent }    /** ne rien ecrire ci bas */
];
