import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state';
import { OrdersState } from 'src/app/state/orders/orders.rducer';
import { filterByAdvertiser, filterByAmount, filterByCustomerName, filterByDate, filterByNarrator, filterByOrderNumber, navigateBackOneMonth, navigateForwardOneMonth, resetFilters } from './../../state/filters/filter.actions';
import { FilterState, initialState } from './../../state/filters/filter.reducer';
import { filterOrders, loadOrders, removeOrder, sortOrders } from './../../state/orders/orders.actions';
import { IOrder } from './../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders$: Observable<IOrder[]> = of([]);
  private sortObj = {
    date: {
      active: true,
      name: 'date',
      up: false
    },
    status: {
      active: false,
      name: 'status',
      up: true
    },
    price: {
      active: false,
      name: 'price',
      up: true
    }
  };
  private filterState$: Observable<FilterState> = of(initialState);

  constructor(private store: Store<AppState>) {
    this.init();
  }

  private init(): void {
    this.store.dispatch(loadOrders());
    this.orders$ = this.store.pipe(
      select('orders'),
      map((state: OrdersState) => state.filteredOrders)
    );
    this.filterState$ = this.store.pipe(
      select('filters')
    );
  }

  get orders(): Observable<IOrder[]> {
    return this.orders$;
  }

  get filterState(): Observable<FilterState> {
    return this.filterState$;
  }

  get totalOrdersPrice(): Observable<number> {
    return this.orders$.pipe(
      map(orders => orders.map(x => x.price)
        .reduce((x, y) => x + y, 0)
      )
    );
  }

  get totalClosedOrdersPrice(): Observable<number> {
    return this.orders$.pipe(
      map(orders => orders.filter(o => o.status === 'closed' || o.status === 'done' || o.status === 'signed and done')
        .map(o => o.price)
        .reduce((x, y) => x + y, 0)
      )
    );
  }

  get totalOpenOrdersPrice(): Observable<number> {
    return this.orders$.pipe(
      map(orders => orders.filter(o => o.status === 'open')
        .map(o => o.price)
        .reduce((x, y) => x + y, 0)
      )
    );
  }

  get amountOfOrders(): Observable<number> {
    return this.orders$.pipe(
      map(orders => orders.length)
    );
  }


  setFilterObject(filter: FilterState): void {
    if (!filter.orderNumber && !filter.customerName && !filter.advertiserName && !filter.narratorName && !filter.fromAmount && !filter.toAmount &&
      !filter.dates.fromDay && !filter.dates.fromMonth && !filter.dates.fromYear && !filter.dates.toDay && !filter.dates.toMonth && !filter.dates.toYear) {
      this.store.dispatch(resetFilters());
    } else {
      this.store.dispatch(filterByOrderNumber({ payload: filter.orderNumber }));
      this.store.dispatch(filterByCustomerName({ payload: filter.customerName }));
      this.store.dispatch(filterByAdvertiser({ payload: filter.advertiserName }));
      this.store.dispatch(filterByNarrator({ payload: filter.narratorName }));
      this.store.dispatch(filterByAmount({ payload: { from: filter.fromAmount, to: filter.toAmount } }));
      this.store.dispatch(filterByDate({ payload: filter.dates }));
      this.store.dispatch(filterOrders({ payload: filter }));
    }
  }

  navigateMonth(backwards: boolean): void {
    if (backwards) {
      this.store.dispatch(navigateBackOneMonth());
    } else {
      this.store.dispatch(navigateForwardOneMonth());
    }
    this.filterState.subscribe((state: FilterState) => {
      this.store.dispatch(filterOrders({ payload: state }));
    }).unsubscribe();
  }

  sortOrders(sortby: string): void {
    switch (sortby) {
      case 'date':
        this.store.dispatch(sortOrders({ payload: { sortby: this.sortObj.date.name, up: this.sortObj.date.up } }));
        this.sortObj.date.up = !this.sortObj.date.up;
        break;
      case 'price':
        this.store.dispatch(sortOrders({ payload: { sortby: this.sortObj.price.name, up: this.sortObj.price.up } }));
        this.sortObj.price.up = !this.sortObj.price.up;
        break;
      case 'status':
        this.store.dispatch(sortOrders({ payload: { sortby: this.sortObj.status.name, up: this.sortObj.status.up } }));
        this.sortObj.status.up = !this.sortObj.status.up;
        break;
      default:
        this.store.dispatch(sortOrders({ payload: { sortby: this.sortObj.date.name, up: this.sortObj.date.up } }));
        this.sortObj.date.up = !this.sortObj.date.up;
    }
  }

  removeOrder(order: IOrder): void {
    this.store.dispatch(removeOrder({ payload: order }));
  }

}
