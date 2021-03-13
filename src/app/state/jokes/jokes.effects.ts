import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { HttpService } from "src/app/jokes/services/http.service";
import { jokesLoaded, loadJokes, selectJoke, showContent } from "./jokes.actions";


@Injectable()
export class jokesEffects {

    loadJokes$ = createEffect(() => this.actions$.pipe(
        ofType(loadJokes),
        mergeMap(() => this.api.getJokes()
        .pipe(
            map(jokes => (jokesLoaded({payload: jokes}))),
            catchError(() => EMPTY)
        ))
    ));


    constructor(private actions$: Actions, private api: HttpService) { }
}