import { createAction, props } from "@ngrx/store";
import { Joke } from "src/app/jokes/services/http.service";

export const create = createAction('[Jokes Component] Create', props<{payload: Joke}>());
export const update = createAction('[Jokes Component] Update', props<{payload: Joke}>());
export const deleteJoke = createAction('[Jokes Component] Delete', props<{payload: Joke}>());
export const selectJoke = createAction('[Jokes Component] Select Joke', props<{payload: Joke}>());
export const unSelectJoke = createAction('[Jokes Component] unSelect Joke', props<{payload: Joke}>());
export const loadJokes = createAction('[Jokes Component] Load Jokes');
export const jokesLoaded = createAction('[Jokes Component] Jokes Loaded', props<{payload: Joke[]}>());
export const showContent = createAction('[Jokes Component] Show Content', props<{payload: Joke}>());
export const hideContent = createAction('[Jokes Component] Hide Content', props<{payload: Joke}>());

export interface Action {
    type: string;
    payload: any;
}