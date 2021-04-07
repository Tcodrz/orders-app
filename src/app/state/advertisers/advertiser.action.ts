import { IAdvertiser } from './../../shared/models/advetiser.model';
import { props, createAction } from '@ngrx/store';

export const addAdvertiser = createAction('{Advertiser] Add', props<{ payload: IAdvertiser }>());
export const removerAdvertiser = createAction('[Advertiser] Remove', props<{ payload: IAdvertiser }>());
export const updateAdvertiser = createAction('[Advertiser] Update', props<{ payload: IAdvertiser }>());
