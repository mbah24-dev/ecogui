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
import { EProductsGridComponent } from './buyer/components/product/product.component';
import { ProductCartComponent } from './buyer/components/product/product-cart/product-cart.component';

export const routes: Routes = [
    {path: '', component: EProductsGridComponent},
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
    /* Les autres chemins ici */

    {path: '**', component: NotFoundComponent},
    /** ne rien ecrire ci bas */
];
