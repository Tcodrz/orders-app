import { DateService } from './../../shared/services/date.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeService } from './../../shared/services/font-awesome.service';
import { FilterState, initialState } from './../../state/filters/filter.reducer';

@Component({
  selector: 'app-orders-active-filters',
  templateUrl: './orders-active-filters.component.html',
  styleUrls: ['./orders-active-filters.component.css']
})
export class OrdersActiveFiltersComponent {

  filterObject: FilterState = initialState;
  currentMonth = DateService.month;
  currentYear = DateService.year;

  @Input() set filter(val: FilterState) {
    if (val) {
      this.filterObject = val;
    }
  }
  @Output() removeFilter = new EventEmitter<FilterState>();

  constructor(public icons: FontAwesomeService) { }

  remove(filterKey: string): void {
    const filterObj: FilterState = {
      orderNumber: filterKey === 'orderNumber' ? '' : this.filterObject.orderNumber,
      customerName: filterKey === 'customerName' ? '' : this.filterObject.customerName,
      advertiserName: filterKey === 'advertiserName' ? '' : this.filterObject.advertiserName,
      narratorName: filterKey === 'narratorName' ? '' : this.filterObject.narratorName,
      fromAmount: filterKey === 'fromAmount' ? null : this.filterObject.fromAmount,
      toAmount: filterKey === 'toAmount' ? null : this.filterObject.toAmount,
      dates: {
        fromDay: filterKey === 'date' ? '01' : this.filterObject.dates.fromDay,
        fromMonth: filterKey === 'date' ? this.currentMonth : this.filterObject.dates.fromMonth,
        fromYear: filterKey === 'date' ? this.currentYear : this.filterObject.dates.fromYear,
        toDay: filterKey === 'date' ? DateService.getMonthEnd(this.currentMonth) : this.filterObject.dates.toDay,
        toMonth: filterKey === 'date' ? this.currentMonth : this.filterObject.dates.toMonth,
        toYear: filterKey === 'date' ? this.currentYear : this.filterObject.dates.toYear,
      }
    };
    this.removeFilter.emit(filterObj);
  }

}
