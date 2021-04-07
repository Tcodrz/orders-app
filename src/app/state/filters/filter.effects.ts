import { sortByPrice } from './../orders/orders.utils';
import { DateService } from './../../shared/services/date.service';
import { filterOrders } from './../orders/orders.actions';
import { resetFilters, filterByAmount } from './filter.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable()
export class FilterEffects {

    resetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(resetFilters),
        map(() => (filterOrders({
            payload: {
                orderNumber: '',
                customerName: '',
                advertiserName: '',
                narratorName: '',
                fromAmount: null,
                toAmount: null,
                dates: {
                    fromDay: '01',
                    fromMonth: DateService.month,
                    fromYear: DateService.year,
                    toDay: DateService.getMonthEnd(DateService.month),
                    toMonth: DateService.month,
                    toYear: DateService.year
                }
            }
        })))
    ));

    constructor(private actions$: Actions) { }
}
