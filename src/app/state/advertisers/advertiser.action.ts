import { IAdvertiser } from './../../shared/models/advetiser.model';
import { props, createAction } from '@ngrx/store';

export const loadAdvertisers = createAction('[Advertisers] Load');
export const advertisersLoaded = createAction('[Advertisers] Loaded', props<{ payload: IAdvertiser[] }>());
