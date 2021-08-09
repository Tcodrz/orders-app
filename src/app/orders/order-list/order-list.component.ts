import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOrder } from './../../shared/models/order.model';
import { FontAwesomeService } from './../../shared/services/font-awesome.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  readonly displayColumns: string[] = ['actions', 'narratorsPrice', 'narrators', 'invoiceNumber', 'bookkeepingNotes', 'status', 'price', 'customer', 'advertiser', 'date', 'id'];
  orders$: Observable<IOrder[]> = of([]);
  @Output() expandOrder: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() collapseOrder: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() removeOrder: EventEmitter<IOrder> = new EventEmitter<IOrder>();
  @Output() sortByStatus = new EventEmitter();
  @Output() sortByPrice = new EventEmitter();
  @Output() sortByDate = new EventEmitter();
  @Input() set orders(val: Observable<IOrder[]>) {
    if (val) {
      this.orders$ = val;
    }
  }

  constructor(
    private router: Router,
    public icons: FontAwesomeService
  ) { }

  goToOrderPage(orderid: string): void {
    this.router.navigate([`order-page/${orderid}`]);
  }
}
