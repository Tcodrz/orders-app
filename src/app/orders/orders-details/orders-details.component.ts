import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent {

  totalAmount$: Observable<number> = of(0);
  totalClosedOrdersPrice$: Observable<number> = of(0);
  totalOpenOrdersPrice$: Observable<number> = of(0);
  amountOfOrders$: Observable<number> = of(0);

  @Input() set allOrdersTotal(val: Observable<number>) {
    if (val) {
      this.totalAmount$ = val;
    }
  }
  @Input() set closedOrdersTotal(val: Observable<number>) {
    if (val) {
      this.totalClosedOrdersPrice$ = val;
    }
  }
  @Input() set openedOrdersTotal(val: Observable<number>) {
    if (val) {
      this.totalOpenOrdersPrice$ = val;
    }
  }
  @Input() set amountOfOrders(val: Observable<number>) {
    if (val) {
      this.amountOfOrders$ = val;
    }
  }
}
