import { mergeMap, map, catchError } from 'rxjs/operators';
import { loadAdvertisers, advertisersLoaded } from './advertiser.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class AdvertisersEffects {

    loadAdvertisers$ = createEffect(() => this.actions$.pipe(
        ofType(loadAdvertisers),
        mergeMap(() => this.api.getAllAdvertisers().pipe(
            map((advertisers) => (advertisersLoaded({ payload: advertisers }))),
            catchError(() => EMPTY)
        ))
    ));

    constructor(private api: HttpService, private actions$: Actions) { }
}