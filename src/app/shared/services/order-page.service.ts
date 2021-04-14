import { loadOrders } from './../../state/orders/orders.actions';
import { IOrder } from 'src/app/shared/models/order.model';
import { OrdersState } from 'src/app/state/orders/orders.rducer';
import { DateService } from './date.service';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICustomer } from 'src/app/shared/models/customer.model';
import { AppState } from 'src/app/state';
import { AdvertiserState } from 'src/app/state/advertisers/advertiser.rducer';
import { CustomerState } from 'src/app/state/customers/customers.reducer';
import { NarratorsState } from 'src/app/state/narrators/narrators.reducer';
import { IAdvertiser } from '../models/advetiser.model';
import { INarrator } from '../models/narrator.model';
import { loadAdvertisers } from './../../state/advertisers/advertiser.action';
import { loadCustomers } from './../../state/customers/customers.actions';
import { loadNarrators } from './../../state/narrators/narrators.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderPageService {

  advertisers$: Observable<IAdvertiser[]> = of([]);
  customers$: Observable<ICustomer[]> = of([]);
  narrators$: Observable<INarrator[]> = of([]);
  orders: IOrder[] = [];

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadCustomers());
    this.store.dispatch(loadAdvertisers());
    this.store.dispatch(loadNarrators());
    this.init();
  }
  private init(): void {
    this.customers$ = this.store.pipe(
      select('customers'),
      map((customerState: CustomerState) => customerState.customers)
    );
    this.advertisers$ = this.store.pipe(
      select('advertisers'),
      map((advertiserState: AdvertiserState) => advertiserState.advertisers)
    );
    this.narrators$ = this.store.pipe(
      select('narrators'),
      map((narratorsState: NarratorsState) => narratorsState.narrators)
    );
    this.store.pipe(
      select('orders'),
      map((ordersState: OrdersState) => ordersState.orders)
    ).subscribe(orders => this.orders = orders);
  }

  getAdvertisers(): Observable<IAdvertiser[]> {
    return this.advertisers$;
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.customers$;
  }

  getNarrators(): Observable<INarrator[]> {
    return this.narrators$;
  }
  getNextOrderNumber(): string {
    const year = DateService.year;
    let month = DateService.month;
    const monthlyOrders = this.orders.filter(o => o.date.split('/')[1] === month);
    let nextOrderNumber = `S${year.split('')[2]}${year.split('')[3]}`;
    let orderNumber = (monthlyOrders.length + 1).toString();

    if (parseInt(orderNumber, 10) < 10) {
      orderNumber = '00' + orderNumber.toString();
    } else if (parseInt(orderNumber, 10) < 100) {
      orderNumber = '0' + orderNumber.toString();
    }

    month = (parseInt(month, 10) < 10) ? '0' + month : month;
    nextOrderNumber = `${nextOrderNumber}-${month}${orderNumber}`;
    return nextOrderNumber;
  }
}
