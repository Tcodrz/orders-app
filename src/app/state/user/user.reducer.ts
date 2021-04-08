import { loggedIn } from './user.actions';
import { createReducer, Action, on } from '@ngrx/store';
import { IUser } from './../../shared/models/user.model';



export interface UserState {
    user: IUser;
}
const initialState: UserState = {
    user: {
        id: null,
        name: '',
        email: '',
        admin: false
    }
};

const _userReducer = createReducer(
    initialState,
    on(loggedIn, (state, action) => {
        return {
            user: action.payload
        };
    }),
);

export function userReducer(state = initialState, action: Action): UserState {
    return _userReducer(state, action);
}
