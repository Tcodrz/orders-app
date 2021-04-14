import { ICustomer } from './../../shared/models/customer.model';
import { createAction, props } from '@ngrx/store';

export const loadCustomers = createAction('[Customers] Load');
export const customersLoaded = createAction('[Customers] Loaded', props<{ payload: ICustomer[] }>());
