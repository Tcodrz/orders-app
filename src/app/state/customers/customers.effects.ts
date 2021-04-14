import { mergeMap, map, catchError } from 'rxjs/operators';
import { loadCustomers, customersLoaded } from './customers.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from './../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';


@Injectable()
export class CustomersEffects {

    loadCustomers$ = createEffect(() => this.actions$.pipe(
        ofType(loadCustomers),
        mergeMap(() => this.api.getAllCustomers().pipe(
            map((customers) => (customersLoaded({ payload: customers }))),
            catchError(() => EMPTY)
        ))
    ));

    constructor(private api: HttpService, private actions$: Actions) { }
}