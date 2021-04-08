import { DateService } from './../../shared/services/date.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from './../../shared/models/date-range.model';
import { FontAwesomeService } from './../../shared/services/font-awesome.service';
import { FilterState } from './../../state/filters/filter.reducer';

export interface FilterOutput {
  active: boolean;
  orderNumber: string;
  customerName: string;
  advertiserName: string;
  amount: { from: number | null; to: number | null };
  narratorName: string;
  dates: DateRange;
}

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.css']
})
export class OrdersFilterComponent {

  form = new FormGroup({
    orderNumber: new FormControl(''),
    customerName: new FormControl(''),
    advertiserName: new FormControl(''),
    narratorName: new FormControl('')
  });
  amount = new FormGroup({
    from: new FormControl(''),
    to: new FormControl('')
  });
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('')
  });

  @Input() set filterObj(val: FilterState) {
    if (val) {
      this.form = new FormGroup({
        orderNumber: new FormControl(val.orderNumber),
        customerName: new FormControl(val.customerName),
        advertiserName: new FormControl(val.advertiserName),
        narratorName: new FormControl(val.narratorName)
      });
      this.amount = new FormGroup({
        from: new FormControl(val.fromAmount),
        to: new FormControl(val.toAmount)
      });
      this.range = new FormGroup({
        start: new FormControl(val.dates.fromMonth ? new Date(`${val.dates.fromMonth}/${val.dates.fromDay}/${val.dates.fromYear}`) : null),
        end: new FormControl(val.dates.toMonth ? new Date(`${val.dates.toMonth}/${val.dates.toDay}/${val.dates.toYear}`) : null)
      });
    }
  }

  @Output() filter: EventEmitter<FilterState> = new EventEmitter();

  constructor(public icons: FontAwesomeService) { }

  dispatch(): void {
    if (!this.range.value.start) {
      this.range.value.start = '';
    }
    if (!this.range.value.end) {
      this.range.value.end = '';
    }
    let startDate = this.range.value.start.toString();
    startDate = [DateService.convertMonthNameToNumber(startDate.split(' ')[1]), startDate.split(' ')[2], startDate.split(' ')[3]];
    let endDate = this.range.value.end.toString();
    endDate = [DateService.convertMonthNameToNumber(endDate.split(' ')[1]), endDate.split(' ')[2], endDate.split(' ')[3]];

    const dates: DateRange = {
      fromDay: startDate[1] || '',
      fromMonth: startDate[0] || '',
      fromYear: startDate[2] || '',
      toDay: endDate[1] || '',
      toMonth: endDate[0] || '',
      toYear: endDate[2] || ''
    };

    const filterObj: FilterState = {
      orderNumber: this.form.value.orderNumber.toString() || '',
      customerName: this.form.value.customerName.toString() || '',
      advertiserName: this.form.value.advertiserName.toString() || '',
      narratorName: this.form.value.narratorName.toString() || '',
      toAmount: this.amount.value.to || null,
      fromAmount: this.amount.value.from || null,
      dates
    };

    this.filter.emit(filterObj);
  }

}
