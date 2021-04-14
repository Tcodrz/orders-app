import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterState, initialState } from './../../state/filters/filter.reducer';

@Component({
  selector: 'app-order-month-navigation',
  templateUrl: './order-month-navigation.component.html',
  styleUrls: ['./order-month-navigation.component.css']
})
export class OrderMonthNavigationComponent {

  _totalMonthlySales$: Observable<number> = of(0);
  _filterObject: FilterState = initialState;

  @Input() set monthlySales(val: Observable<number>) {
    if (val) {
      this._totalMonthlySales$ = val;
    }
  }
  @Input() set filterObject(val: FilterState) {
    if (val) {
      this._filterObject = val;
    }
  }
  @Output() back = new EventEmitter();
  @Output() forward = new EventEmitter();

}
