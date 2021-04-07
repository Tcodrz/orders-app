import { DateService } from './../../shared/services/date.service';
import { DateRange } from './../../shared/models/date-range.model';
import { FilterState } from './filter.reducer';

export const oneMonthForward = (state: FilterState): FilterState => {

    let newDateRange: DateRange;

    if (!state.dates.fromMonth || !state.dates.toMonth) {
        newDateRange = {
            fromDay: '01',
            fromMonth: (parseInt(DateService.month, 10) + 1) > 12 ? '01' : (parseInt(DateService.month, 10) + 1).toString(),
            fromYear: (parseInt(DateService.month, 10) + 1) > 12 ? (parseInt(DateService.year, 10) + 1).toString() : DateService.year,
            toDay: '',
            toMonth: (parseInt(DateService.month, 10) + 1) > 12 ? '01' : (parseInt(DateService.month, 10) + 1).toString(),
            toYear: (parseInt(DateService.month, 10) + 1) > 12 ? (parseInt(DateService.year, 10) + 1).toString() : DateService.year,
        };
    } else {
        newDateRange = {
            fromDay: '01',
            fromMonth: (parseInt(state.dates.fromMonth, 10) + 1) > 12 ? '01' : (parseInt(state.dates.fromMonth, 10) + 1).toString(),
            fromYear: (parseInt(state.dates.fromMonth, 10) + 1) > 12 ? (parseInt(state.dates.fromYear, 10) + 1).toString() : state.dates.fromYear,
            toDay: '',
            toMonth: (parseInt(state.dates.fromMonth, 10) + 1) > 12 ? '01' : (parseInt(state.dates.fromMonth, 10) + 1).toString(),
            toYear: (parseInt(state.dates.fromMonth, 10) + 1) > 12 ? (parseInt(state.dates.fromYear, 10) + 1).toString() : state.dates.fromYear,
        };
    }
    newDateRange.toDay = DateService.getMonthEnd(newDateRange.fromMonth);
    return { ...state, dates: newDateRange };
};

export const oneMonthBackwards = (state: FilterState): FilterState => {
    let newDateRange: DateRange;

    if (!state.dates.fromMonth || !state.dates.toMonth) {
        newDateRange = {
            fromDay: '01',
            fromMonth: (parseInt(DateService.month, 10) - 1) <= 0 ? '12' : (parseInt(DateService.month, 10) - 1).toString(),
            fromYear: (parseInt(DateService.month, 10) - 1) <= 0 ? (parseInt(DateService.year, 10) - 1).toString() : DateService.year,
            toDay: '',
            toMonth: (parseInt(DateService.month, 10) - 1) <= 0 ? '12' : (parseInt(DateService.month, 10) - 1).toString(),
            toYear: (parseInt(DateService.month, 10) - 1) <= 0 ? (parseInt(DateService.year, 10) - 1).toString() : DateService.year,
        };
    } else {
        newDateRange = {
            fromDay: '01',
            fromMonth: (parseInt(state.dates.fromMonth, 10) - 1) <= 0 ? '12' : (parseInt(state.dates.fromMonth, 10) - 1).toString(),
            fromYear: (parseInt(state.dates.fromMonth, 10) - 1) <= 0 ? (parseInt(state.dates.fromYear, 10) - 1).toString() : state.dates.fromYear,
            toDay: '',
            toMonth: (parseInt(state.dates.fromMonth, 10) - 1) <= 0 ? '12' : (parseInt(state.dates.fromMonth, 10) - 1).toString(),
            toYear: (parseInt(state.dates.fromMonth, 10) - 1) <= 0 ? (parseInt(state.dates.fromYear, 10) - 1).toString() : state.dates.fromYear,
        };
    }
    newDateRange.toDay = DateService.getMonthEnd(newDateRange.fromMonth);
    return { ...state, dates: newDateRange };
};
