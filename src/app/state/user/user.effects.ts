import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/services/http.service';
import { loggedIn, login } from './user.actions';

@Injectable()
export class UserEffects {

    login$ = createEffect(() => this.actions.pipe(
        ofType(login),
        mergeMap((action) => this.api.login(action.payload).pipe(
            map((user) => (loggedIn({ payload: user }))),
            catchError(() => EMPTY)
        ))
    ));

    constructor(private actions: Actions, private api: HttpService) { }
}