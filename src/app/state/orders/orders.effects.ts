import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/services/http.service';
import { DateService } from './../../shared/services/date.service';
import { initialState } from './../filters/filter.reducer';
import { filterOrders, loadOrders, orderRemoved, ordersLoaded, removeOrder, addOrder, orderAdded } from './orders.actions';


@Injectable()
export class OrdersEffects {

  /* TODO: fix infinte calls to api bug */
  addOrder$ = createEffect(() => this.actions$.pipe(
    ofType(addOrder),
    tap((action) => console.log(action))
  ))
  // addOrder$ = createEffect(() => this.actions$.pipe(
  //   ofType(addOrder),
  //   mergeMap((action) => this.api.addOrUpdateOrder(action.payload)
  //     .pipe(
  //       map((order) => (orderAdded({ payload: order }))),
  //       catchError(() => EMPTY)
  //     ))
  // ))

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(loadOrders),
    mergeMap(() => this.api.getOrders()
      .pipe(
        map(orders => (ordersLoaded({ payload: orders }))),
        catchError(() => EMPTY)
      )
    )
  ));

  ordersLoaded$ = createEffect(() => this.actions$.pipe(
    ofType(ordersLoaded),
    map(() => (filterOrders({
      payload: {
        ...initialState, dates: {
          fromDay: '01',
          fromMonth: DateService.month,
          fromYear: DateService.year,
          toDay: '31',
          toMonth: DateService.month,
          toYear: DateService.year
        }
      }
    })))
  ));

  removeOrder$ = createEffect(() => this.actions$.pipe(
    ofType(removeOrder),
    mergeMap((action) => this.api.deleteOrder(action.payload).pipe(
      map((order) => (orderRemoved({ payload: order }))),
      catchError(() => EMPTY)
    ))
  ));

  constructor(private actions$: Actions, private api: HttpService) { }
}
