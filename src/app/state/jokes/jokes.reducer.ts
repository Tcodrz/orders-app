import { Action, createReducer, on } from '@ngrx/store';
import {Joke} from '../../jokes/services/http.service';
import {create, deleteJoke, update, selectJoke, jokesLoaded, showContent, hideContent, unSelectJoke} from './jokes.actions';

const createJoke = (jokes: Joke[], joke: Joke) => [...jokes, joke];
const updateJoke = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke) : j;
});
const removeJoke = (jokes: Joke[], joke: Joke) => jokes.filter(j => j.id !== joke.id);
const addManyJokes = (jokes: Joke[], payload: Joke[]) => jokes.concat(payload);
const showJokeContent = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, {show :true}) : j;
});
const hideJokeContent = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, {show: false}) : j;
});
const selectJokeObject = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, {selected: true}) : j;
});
const unSelectJokeObject = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, {selected: false}) : j;
})

export interface JokesState {
    jokes: Joke[];
    selectedJokeId: number | null;
}

export const initialState: JokesState = {
    jokes: [],
    selectedJokeId: null
}

const _jokesReducer = createReducer(
    initialState,
    on(create, (state, action) => {
        return {
            jokes: createJoke(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId
        }
    }),
    on(deleteJoke, (state, action) => {
        return {
            jokes: removeJoke(state.jokes, action.payload),
            selectedJokeId: null
        }
    }),
    on(update, (state, action) => {
        return {
            jokes: updateJoke(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId
        }
    }),
    on(selectJoke, (state, action) => {
        return {
            jokes: selectJokeObject(state.jokes, action.payload),
            selectedJokeId: action.payload.id
        }
    }),
    on(unSelectJoke, (state, action) => {
        return {
            jokes: unSelectJokeObject(state.jokes, action.payload),
            selectedJokeId: null
        }
    }),
    on(jokesLoaded, (state, action) => {
        return {
            jokes: addManyJokes(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId
        }
    }),
    on(showContent, (state, action) => {
        return {
            jokes: showJokeContent(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId
        }
    }),
    on(hideContent, (state, action) => {
        return {
            jokes: hideJokeContent(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId
        }
    })
    );

export function jokesReducer(state = initialState, action: Action): JokesState {
    return _jokesReducer(state, action);
}