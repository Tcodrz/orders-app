import { createReducer, on, Action } from '@ngrx/store';
import { Joke } from '../../jokes/services/http.service';
import { 
    create, 
    editJoke, 
    hideContent, 
    jokeDeleted, 
    jokesLoaded, 
    selectJoke, 
    showContent, 
    unSelectJoke, 
    update ,
    cancelEdit
} from './jokes.actions';


/* HELPER FUNCTIONS */
const createJoke = (jokes: Joke[], joke: Joke) => [...jokes, joke];
const updateJoke = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, { joke: joke.joke, edit: false }) : j;
});
const removeJoke = (jokes: Joke[], joke: Joke) => jokes.filter(j => j.id !== joke.id);
const addManyJokes = (jokes: Joke[], payload: Joke[]) => {
    payload.forEach(joke => { 
        jokes = jokes.findIndex(x => x.id === joke.id) < 0 ? jokes.concat(joke) : jokes 
    });
    return [...jokes];
}
const showJokeContent = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, { show: true }) : j;
});
const hideJokeContent = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, { show: false }) : j;
});
const selectJokeObject = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, { selected: true, show: true }) : j;
});
const unSelectJokeObject = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? Object.assign({}, joke, { selected: false, edit: false, show: false }) : j;
});
const editSelectedJoke = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? { ...joke, edit: true, show: true } : j;
});
const unEditJoke = (jokes: Joke[], joke: Joke) => jokes.map(j => {
    return j.id === joke.id ? { ...joke, edit: false } : j;
});


export interface JokesState {
    jokes: Joke[];
    selectedJokeId: number | null;
    selectedJokes: Joke[];
}

export const initialState: JokesState = {
    jokes: [],
    selectedJokeId: null,
    selectedJokes: []
}

const _jokesReducer = createReducer(
    initialState,
    on(create, (state, action) => {
        return {
            jokes: createJoke(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId,
            selectedJokes: state.selectedJokes
        }
    }),
    on(jokeDeleted, (state, action) => {
        return {
            jokes: removeJoke(state.jokes, action.payload),
            selectedJokeId: state.selectedJokes.length >= 2 ? removeJoke(state.selectedJokes, action.payload)[removeJoke(state.selectedJokes, action.payload).length - 1].id : null,
            selectedJokes: removeJoke(state.selectedJokes, action.payload)
        }
    }),
    on(update, (state, action) => {
        return {
            jokes: updateJoke(state.jokes, action.payload),
            selectedJokeId: action.payload.id,
            selectedJokes: updateJoke(state.selectedJokes, { ...action.payload, edit: false })
        }
    }),
    on(selectJoke, (state, action) => {
        return {
            jokes: selectJokeObject(state.jokes, action.payload),
            selectedJokeId: action.payload.id,
            selectedJokes: createJoke(state.selectedJokes, { ...action.payload, selected: true, show: true })
        }
    }),
    on(unSelectJoke, (state, action) => {
        return {
            jokes: unSelectJokeObject(state.jokes, action.payload),
            selectedJokeId: state.selectedJokes.length >= 2 ? removeJoke(state.selectedJokes, action.payload)[removeJoke(state.selectedJokes, action.payload).length - 1].id : null,
            selectedJokes: removeJoke(state.selectedJokes, {...action.payload, selected: false, show: false})
        }
    }),
    on(jokesLoaded, (state, action) => {
        return {
            jokes: addManyJokes(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId,
            selectedJokes: state.selectedJokes
        }
    }),
    on(showContent, (state, action) => {
        return {
            jokes: showJokeContent(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId,
            selectedJokes: updateJoke(state.selectedJokes, { ...action.payload, show: true })
        }
    }),
    on(hideContent, (state, action) => {
        return {
            jokes: hideJokeContent(state.jokes, action.payload),
            selectedJokeId: state.selectedJokeId,
            selectedJokes: updateJoke(state.selectedJokes, { ...action.payload, show: false })
        }
    }),
    on(editJoke, (state, action) => {
        return {
            jokes: editSelectedJoke(state.jokes, action.payload),
            selectedJokeId: action.payload.id,
            selectedJokes: updateJoke(state.selectedJokes, { ...action.payload, edit: true })
        }
    }),
    on(cancelEdit, (state, action) => {
        return {
            jokes: unEditJoke(state.jokes, action.payload),
            selectedJokeId: action.payload.id,
            selectedJokes: updateJoke(state.selectedJokes, {...action.payload, edit: false})
        }
    })
);

export function jokesReducer(state = initialState, action: Action): JokesState {
    return _jokesReducer(state, action);
}