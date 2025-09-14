import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { JuicePageComponent } from './components/pages/juice-page/juice-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { AdminItemsComponent } from './components/pages/admin-items/admin-items.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { AdminOrdersComponent } from './components/pages/admin-orders/admin-orders.component';
//import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path:'', component:HomeComponent}, //my Home aplication
  {path:'search/:searchTerm', component:HomeComponent},
  { path:'tag/:tag', component:HomeComponent},
  {path: 'juice/:id', component:JuicePageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'checkout', component: CheckoutPageComponent, /*canActivate:[AuthGuard]*/},
  {path: 'payment', component: PaymentPageComponent, /*canActivate:[AuthGuard]*/},
  {path: 'track/:orderId', component: OrderTrackPageComponent , /*canActivate:[AuthGuard]*/},
  {path: 'admin-page', component: AdminPageComponent},
  {path:'admin-items',component:AdminItemsComponent},
  { path: 'orders', component: AdminOrdersComponent },












];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
