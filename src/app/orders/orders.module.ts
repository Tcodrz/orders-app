import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { StateModule } from './../state/state.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { MatButtonModule } from '@angular/material/button';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { OrderMonthNavigationComponent } from './order-month-navigation/order-month-navigation.component';
import { OrdersNavbarComponent } from './orders-navbar/orders-navbar.component';
import { OrdersFilterComponent } from './orders-filter/orders-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersActiveFiltersComponent } from './orders-active-filters/orders-active-filters.component';




@NgModule({
  declarations: [
    OrderListComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    OrderMonthNavigationComponent,
    OrdersNavbarComponent,
    OrdersFilterComponent,
    OrdersActiveFiltersComponent
  ],
  imports: [
    CommonModule,
    StateModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
    MatDatepickerModule,
    MatChipsModule
  ],
  exports: [OrdersComponent]
})
export class OrdersModule { }
