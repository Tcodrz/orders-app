import { ApiResponse } from './../../jokes/services/http.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, repeat, take } from "rxjs/operators";
import { HttpService } from "src/app/jokes/services/http.service";
import { deleteJoke, jokeDeleted, jokesLoaded, loadJokes } from "./jokes.actions";


@Injectable()
export class jokesEffects {

    loadJokes$ = createEffect(() => this.actions$.pipe(
        ofType(loadJokes),
        mergeMap(() => this.api.getJokes(2)
            .pipe(
                map(jokes => (jokesLoaded({ payload: jokes }))),
                catchError(() => EMPTY)
            ))
    ));

    deleteJoke$ = createEffect(() => this.actions$.pipe(
        ofType(deleteJoke),
        mergeMap((action) => this.api.removeJoke(action.payload)
            .pipe(
                map(joke => (jokeDeleted({ payload: joke }))),
                catchError(() => EMPTY)
            ))
    ))


    constructor(private actions$: Actions, private api: HttpService) { }
}