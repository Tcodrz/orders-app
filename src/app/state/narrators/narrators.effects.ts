import { loadNarrators, narratorsLoaded } from './narrators.actions';
import { HttpService } from './../../shared/services/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Injectable()
export class NarratorsEffects {

    loadNarrators$ = createEffect(() => this.actions$.pipe(
        ofType(loadNarrators),
        mergeMap(() => this.api.getAllNarrators().pipe(
            map((narrators) => (narratorsLoaded({ payload: narrators }))),
            catchError(() => EMPTY)
        ))
    ));

    constructor(private actions$: Actions, private api: HttpService) { }
}
