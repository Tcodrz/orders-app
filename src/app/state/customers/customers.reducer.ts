import { addCustomer, removeCustomer, updateCustomer } from './customers.actions';
import { createReducer, Action, on } from '@ngrx/store';
import { ICustomer } from './../../shared/models/customer.model';

export interface CustomerState {
    customers: ICustomer[];
    selectedCustomerId: number | null;
}

const initialState: CustomerState = {
    customers: [],
    selectedCustomerId: null
};

const add = (customers: ICustomer[], customer: ICustomer) => [...customers, customer];
const remove = (customers: ICustomer[], customer: ICustomer) => customers.filter(x => x.id !== customer.id);
const update = (customers: ICustomer[], customer: ICustomer) => customers.map(x => {
    return x.id === customer.id ? Object.assign({}, customer) : x;
});

// tslint:disable-next-line: variable-name
const _customerReducer = createReducer(
    initialState,
    on(addCustomer, (state, action) => {
        return {
            customers: add(state.customers, action.payload),
            selectedCustomerId: state.selectedCustomerId
        };
    }),
    on(removeCustomer, (state, action) => {
        return {
            customers: remove(state.customers, action.payload),
            selectedCustomerId: null
        };
    }),
    on(updateCustomer, (state, action) => {
        return {
            customers: update(state.customers, action.payload),
            selectedCustomerId: state.selectedCustomerId
        };
    })
);

export function customerReducer(state = initialState, action: Action): CustomerState {
    return _customerReducer(state, action);
}
