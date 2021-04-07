import { Action, createReducer, on } from '@ngrx/store';
import { DateRange } from './../../shared/models/date-range.model';
import { DateService } from './../../shared/services/date.service';
import { filterByAdvertiser, filterByAmount, filterByCustomerName, filterByDate, filterByNarrator, filterByOrderNumber, navigateBackOneMonth, navigateForwardOneMonth, resetFilters } from './filter.actions';
import { oneMonthBackwards, oneMonthForward } from './filter.utils';

export interface FilterState {
    dates: DateRange;
    fromAmount: number | null;
    toAmount: number | null;
    orderNumber: string;
    customerName: string;
    advertiserName: string;
    narratorName: string;
}

export const initialState: FilterState = {
    dates: {
        fromDay: '01',
        fromMonth: DateService.month,
        fromYear: DateService.year,
        toDay: DateService.getMonthEnd(DateService.month),
        toMonth: DateService.month,
        toYear: DateService.year
    },
    fromAmount: null,
    toAmount: null,
    orderNumber: '',
    customerName: '',
    advertiserName: '',
    narratorName: ''
};

const _filterReducer = createReducer(
    initialState,
    on(filterByOrderNumber, (state, action) => {
        return { ...state, orderNumber: action.payload };
    }),
    on(filterByCustomerName, (state, action) => {
        return { ...state, customerName: action.payload };
    }),
    on(filterByAdvertiser, (state, action) => {
        return { ...state, advertiserName: action.payload };
    }),
    on(filterByNarrator, (state, action) => {
        return { ...state, narratorName: action.payload };
    }),
    on(filterByAmount, (state, action) => {
        return { ...state, fromAmount: action.payload.from, toAmount: action.payload.to };
    }),
    on(filterByDate, (state, action) => {
        return { ...state, dates: action.payload };
    }),
    on(resetFilters, () => {
        return initialState;
    }),
    on(navigateBackOneMonth, (state) => {
        return oneMonthBackwards(state);
    }),
    on(navigateForwardOneMonth, (state) => {
        return oneMonthForward(state);
    })
);

export function filterReducer(state = initialState, action: Action): FilterState {
    return _filterReducer(state, action);
}
