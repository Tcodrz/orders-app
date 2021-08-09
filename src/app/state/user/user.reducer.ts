import { loggedIn, logout, updateLoggedInUser } from './user.actions';
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
    on(logout, () => {
        return initialState;
    }),
    on(updateLoggedInUser, (state, action) => {
        console.log(action.payload);
        return {
            user: {
                _id: action.payload._id,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                admin: action.payload.admin
            }
        };
    })
);

export function userReducer(state = initialState, action: Action): UserState {
    return _userReducer(state, action);
}
