import { Action, createReducer, on } from '@ngrx/store';
import { ICustomer } from './../../shared/models/customer.model';
import { customersLoaded } from './customers.actions';

export interface CustomerState {
    customers: ICustomer[];
}

const initialState: CustomerState = {
    customers: [],
};

const _customerReducer = createReducer(
    initialState,
    on(customersLoaded, (state, action) => {
        return {
            customers: action.payload
        };
    })
);

export function customerReducer(state = initialState, action: Action): CustomerState {
    return _customerReducer(state, action);
}
