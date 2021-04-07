import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { IOrder } from 'src/app/shared/models/order.model';
import { OrdersService } from '../../shared/services/orders.service';
import { FilterState, initialState } from '../../state/filters/filter.reducer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<IOrder[]> = of([]);
  filterObject: FilterState = initialState;
  readonly monthlySales: Observable<number> = this.ordersService.totalOrdersPrice;
  readonly totalClosedOrdersPrice$: Observable<number> = this.ordersService.totalClosedOrdersPrice;
  readonly totalOpenOrdersPrice$: Observable<number> = this.ordersService.totalOpenOrdersPrice;
  readonly ordersAmount$: Observable<number> = this.ordersService.amountOfOrders;
  private filterStateSub: Subscription = new Subscription();

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.orders$ = this.ordersService.orders;
    this.filterStateSub = this.ordersService.filterState.subscribe(state => this.filterObject = state);
  }

  ngOnDestroy(): void {
    this.filterStateSub.unsubscribe();
  }

  navigate(backwards: boolean): void {
    this.ordersService.navigateMonth(backwards);
  }

  sortOrders(sortby: string): void {
    this.ordersService.sortOrders(sortby);
  }

  handleFilter(filter: FilterState): void {
    this.ordersService.setFilterObject(filter);
  }

  removeOrder(order: IOrder): void {
    this.ordersService.removeOrder(order);
  }

}
