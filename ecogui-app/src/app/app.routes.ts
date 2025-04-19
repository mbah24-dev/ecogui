import { InvoiceListComponent } from './buyer/components/invoice/invoice-list/invoice-list.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './shared/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './shared/authentication/sign-up/sign-up.component';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { ConfirmEmailComponent } from './shared/authentication/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './shared/authentication/forgot-password/forgot-password.component';
import { LogoutComponent } from './shared/authentication/logout/logout.component';
import { ResetPasswordComponent } from './shared/authentication/reset-password/reset-password.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProductDetailsComponent } from './buyer/components/product/product-details/product-details.component';
import { ProductsGridComponent } from './buyer/components/product/product.component';
import { ProductCartComponent } from './buyer/components/product/product-cart/product-cart.component';
import { ProductCheckoutComponent } from './buyer/components/product/product-checkout/product-checkout.component';
import { OrderComponent } from './buyer/components/order/order.component';
import { OrderDetailsComponent } from './buyer/components/order/order-details/order-details.component';
import { ClientOrderComponent } from './buyer/components/order/client-order/client-order.component';
import { InvoiceComponent } from './buyer/components/invoice/invoice.component';
import { InvoiceDetailsComponent } from './buyer/components/invoice/invoice-details/invoice-details.component';
import { AccountSettingsComponent } from './shared/settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './shared/settings/change-password/change-password.component';
import { PrivacyPolicyComponent } from './shared/settings/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { TermsConditionsComponent } from './shared/settings/terms-conditions/terms-conditions.component';

export const routes: Routes = [
    {path: '', component: ProductsGridComponent},
    {
        path: 'orders',
        component: OrderComponent,
        children: [
            {path: '', component: ClientOrderComponent},
            {path: 'details', component: OrderDetailsComponent},
        ]
    },
    {
        path: 'invoices',
        component: InvoiceComponent,
        children: [
            {path: '', component: InvoiceListComponent},
            {path: 'details', component: InvoiceDetailsComponent}
        ]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'terms-conditions', component: TermsConditionsComponent}
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'sign-up', component: SignUpComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
            {path: 'confirm-email', component: ConfirmEmailComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
    {path: 'ecogui/client/cart', component: ProductCartComponent},
    {path: 'ecogui/client/product-details/:id', component: ProductDetailsComponent},
    {path: 'ecogui/client/checkout', component: ProductCheckoutComponent},
    /* Les autres chemins ici */

    {path: '**', component: NotFoundComponent},
    /** ne rien ecrire ci bas */
];
