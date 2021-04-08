import { Router } from '@angular/router';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { login, loggedIn } from './user.actions';
import { HttpService } from 'src/app/shared/services/http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';

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