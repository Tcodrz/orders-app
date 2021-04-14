import { narratorsLoaded } from './narrators.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { INarrator } from './../../shared/models/narrator.model';

export interface NarratorsState {
    narrators: INarrator[];
}

const initialState: NarratorsState = {
    narrators: []
};

const _narratorsReducer = createReducer(
    initialState,
    on(narratorsLoaded, (state, action) => {
        return { narrators: action.payload };
    })
);

export function narratorsReducer(state = initialState, action: Action): NarratorsState {
    return _narratorsReducer(state, action);
}
