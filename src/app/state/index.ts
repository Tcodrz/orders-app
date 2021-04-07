import { ActionReducerMap } from '@ngrx/store';
import { filterReducer, FilterState } from './filters/filter.reducer';
import { ordersReducer, OrdersState } from './orders/orders.rducer';

export interface AppState {
    orders: OrdersState;
    filters: FilterState;
}

export const reducers: ActionReducerMap<AppState> = {
    orders: ordersReducer,
    filters: filterReducer
};
