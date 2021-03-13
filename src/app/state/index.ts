import { ActionReducerMap } from "@ngrx/store";
import { jokesReducer, JokesState } from "./jokes/jokes.reducer";

export interface AppState {
    jokes: JokesState;
}

export const reducers: ActionReducerMap<AppState> = {
    jokes: jokesReducer
}
