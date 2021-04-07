import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/shared/models/order.model';
import { FilterState } from './../filters/filter.reducer';


export const addOrder = createAction('[Orders] Add', props<{ payload: IOrder }>());
export const orderAdded = createAction('[Orders] Add', props<{ payload: IOrder }>());
export const removeOrder = createAction('[Order] Remove', props<{ payload: IOrder }>());
export const orderRemoved = createAction('[Order] Removed', props<{ payload: IOrder }>());
export const updateOrder = createAction('[Orders] Update', props<{ payload: IOrder }>());
export const loadOrders = createAction('[Orders] Load');
export const ordersLoaded = createAction('[Orders] Loaded', props<{ payload: IOrder[] }>());
export const sortOrders = createAction('[Orders] Sort', props<{ payload: { sortby: string, up: boolean } }>());
export const filterOrders = createAction('[Orders] Filter', props<{ payload: FilterState }>());


