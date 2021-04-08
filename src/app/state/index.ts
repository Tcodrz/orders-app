import { userReducer, UserState } from './user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { filterReducer, FilterState } from './filters/filter.reducer';
import { ordersReducer, OrdersState } from './orders/orders.rducer';

export interface AppState {
    user: UserState;
    orders: OrdersState;
    filters: FilterState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    orders: ordersReducer,
    filters: filterReducer
};
