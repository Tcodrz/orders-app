import { ICustomer } from './../../shared/models/customer.model';
import { createAction, props } from '@ngrx/store';

export const addCustomer = createAction('[Customers] Add', props<{ payload: ICustomer }>());
export const removeCustomer = createAction('[Customers] Remove', props<{ payload: ICustomer }>());
export const updateCustomer = createAction('[Customers] update', props<{ payload: ICustomer }>());
