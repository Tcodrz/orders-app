import { IUser } from './../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ payload: { username: string; password: string } }>());
export const loggedIn = createAction('[Auth] Logged In', props<{ payload: IUser }>());
export const logout = createAction('[Auth] Logout');
export const updateLoggedInUser = createAction('[Auth] Update Logged In User', props<{ payload: { id: number; name: string; _id: string; email: string; admin: boolean } }>());
