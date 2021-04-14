import { narratorsReducer, NarratorsState } from './narrators/narrators.reducer';
import { customerReducer, CustomerState } from './customers/customers.reducer';
import { advertiserReducer, AdvertiserState } from './advertisers/advertiser.rducer';
import { userReducer, UserState } from './user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { filterReducer, FilterState } from './filters/filter.reducer';
import { ordersReducer, OrdersState } from './orders/orders.rducer';

export interface AppState {
    user: UserState;
    orders: OrdersState;
    filters: FilterState;
    advertisers: AdvertiserState;
    customers: CustomerState;
    narrators: NarratorsState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    orders: ordersReducer,
    filters: filterReducer,
    advertisers: advertiserReducer,
    customers: customerReducer,
    narrators: narratorsReducer
};
