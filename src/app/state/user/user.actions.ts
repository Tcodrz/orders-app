import { IUser } from './../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ payload: { username: string; password: string } }>());
export const loggedIn = createAction('[Auth] Logged In', props<{ payload: IUser }>());
