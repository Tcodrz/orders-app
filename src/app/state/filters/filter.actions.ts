import { DateRange } from './../../shared/models/date-range.model';
import { createAction, props } from '@ngrx/store';

export const filterByOrderNumber = createAction('[Filter] Order Number', props<{ payload: string }>());
export const filterByCustomerName = createAction('[Filter] Customer Name', props<{ payload: string }>());
export const filterByAdvertiser = createAction('[Filter] Advertiser Name', props<{ payload: string }>());
export const filterByNarrator = createAction('[Filter] Narrator Name', props<{ payload: string }>());
export const filterByAmount = createAction('[Filter] Amount', props<{ payload: { from: number | null, to: number | null } }>());
export const filterByDate = createAction('[Filter] DateRange', props<{ payload: DateRange }>());
export const resetFilters = createAction('[Filter] Reset');
export const navigateBackOneMonth = createAction('[Filter] One Month Backwards');
export const navigateForwardOneMonth = createAction('[Filter] One Month Forward');
