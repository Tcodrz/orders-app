import { OrderPageComponent } from './orders/order-page/order-page.component';
import { OrdersPageGuard } from './shared/guards/orders-page.guard';
import { OrdersComponent } from './orders/orders/orders.component';
import { LoginPageComponent } from './shared/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard], },
  { path: 'orders', component: OrdersComponent, canActivate: [OrdersPageGuard] },
  { path: 'order-page', component: OrderPageComponent },
  { path: 'order-page/:order-id', component: OrderPageComponent },
  { path: 'customers', component: OrdersComponent },
  { path: 'advertisers', component: OrdersComponent },
  { path: 'narrators', component: OrdersComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
