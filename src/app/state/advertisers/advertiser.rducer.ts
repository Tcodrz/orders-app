import { advertisersLoaded } from './advertiser.action';
import { Action, createReducer, on } from '@ngrx/store';
import { IAdvertiser } from './../../shared/models/advetiser.model';

export interface AdvertiserState {
    advertisers: IAdvertiser[];
}

const initialState: AdvertiserState = {
    advertisers: [],
};


const _advertiserReducer = createReducer(
    initialState,
    on(advertisersLoaded, (state, action) => {
        return {
            advertisers: action.payload
        };
    })
);

export function advertiserReducer(state = initialState, action: Action): AdvertiserState {
    return _advertiserReducer(state, action);
}