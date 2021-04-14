import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StateModule } from '../state/state.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrderMonthNavigationComponent } from './order-month-navigation/order-month-navigation.component';
import { OrdersFilterComponent } from './orders-filter/orders-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersActiveFiltersComponent } from './orders-active-filters/orders-active-filters.component';
import { SharedModule } from '../shared/shared.module';
import { OrderPageComponent } from './order-page/order-page.component';
import { AddNarratorFormComponent } from './add-narrator-form/add-narrator-form.component';
import { OrderNotesFormComponent } from './order-notes-form/order-notes-form.component';
import { OrderPriceFormComponent } from './order-price-form/order-price-form.component';




@NgModule({
  declarations: [
    OrderListComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    OrderMonthNavigationComponent,
    OrdersFilterComponent,
    OrdersActiveFiltersComponent,
    OrderPageComponent,
    AddNarratorFormComponent,
    OrderNotesFormComponent,
    OrderPriceFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StateModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [OrdersComponent]
})
export class OrdersModule { }
