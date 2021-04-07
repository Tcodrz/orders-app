import { addAdvertiser, removerAdvertiser, updateAdvertiser } from './advertiser.action';
import { Action, createReducer, on } from '@ngrx/store';
import { IAdvertiser } from './../../shared/models/advetiser.model';

export interface AdvertiserState {
    advertisers: IAdvertiser[],
    selectedAdvertiserId: number | null;
}

const initialState: AdvertiserState = {
    advertisers: [],
    selectedAdvertiserId: null
};

const add = (advertisers: IAdvertiser[], adv: IAdvertiser) => [...advertisers, adv];
const remove = (advertisers: IAdvertiser[], adv: IAdvertiser) => advertisers.filter(x => x.id !== adv.id);
const update = (advertisers: IAdvertiser[], adv: IAdvertiser) => advertisers.map(x => {
    return x.id === adv.id ? Object.assign({}, adv) : x;
});

const _advertiserReducer = createReducer(
    initialState,
    on(addAdvertiser, (state, action) => {
        return {
            advertisers: add(state.advertisers, action.payload),
            selectedAdvertiserId: state.selectedAdvertiserId
        };
    }),
    on(removerAdvertiser, (state, action) => {
        return {
            advertisers: remove(state.advertisers, action.payload),
            selectedAdvertiserId: null
        };
    }),
    on(updateAdvertiser, (state, action) => {
        return {
            advertisers: update(state.advertisers, action.payload),
            selectedAdvertiserId: action.payload.id
        };
    })
);

export function advertiserReducer(state = initialState, action: Action): AdvertiserState {
    return _advertiserReducer(state, action);
}