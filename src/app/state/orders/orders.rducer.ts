import { Action, createReducer, on } from '@ngrx/store';
import { IOrder } from './../../shared/models/order.model';
import { filterOrders, orderRemoved, ordersLoaded, sortOrders, orderAdded, addOrder } from './orders.actions';
import { filter, findAndUpdate, handleSortOrders, sortByDate } from './orders.utils';

export interface OrdersState {
  orders: IOrder[];
  filteredOrders: IOrder[];
  selectedOrderId: string;
}

const initialState: OrdersState = {
  orders: [],
  filteredOrders: [],
  selectedOrderId: ''
};

const _ordersReducer = createReducer(
  initialState,
  on(ordersLoaded, (state, action) => {
    return {
      orders: action.payload,
      filteredOrders: sortByDate(action.payload),
      selectedOrderId: state.selectedOrderId
    };
  }),
  on(sortOrders, (state, action) => {
    return handleSortOrders(state, action);
  }),
  on(filterOrders, (state, action) => {
    return {
      orders: state.orders,
      filteredOrders: sortByDate(filter(state.orders, action.payload)),
      selectedOrderId: state.selectedOrderId
    };
  }),
  on(orderRemoved, (state, action) => {
    return {
      orders: state.orders.filter(order => order.id !== action.payload.id),
      filteredOrders: state.filteredOrders.filter(order => order.id !== action.payload.id),
      selectedOrderId: ''
    };
  }),
  on(orderAdded, (state, action) => {
    return {
      orders: findAndUpdate(state.orders, action.payload),
      filteredOrders: state.filteredOrders,
      selectedOrderId: state.selectedOrderId
    }
  })
);

export function ordersReducer(state = initialState, action: Action): OrdersState {
  return _ordersReducer(state, action);
}
