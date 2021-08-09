import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FormSelectComponent {
  @Input() inputHasName = false;
  @Input() label = '';

  @Input() set options(val: any[] | null) {
    if (!val) {
      this._options = [];
    } else {
      this._options = val;
    }
  }

  @Input() set value(val: any) {
    if (!val) {
      if (typeof val === 'string') {
        this._value = '';
      }
    } else {
      if (this._options?.length > 0) {
        if (typeof val === 'object') {
          this._value = this._options.find(o => o.id === val.id);
        }
        if (typeof val === 'string') {
          this._value = this._options.find(o => o === val);
        }
      }
    }
  }

  @Output() getValue = new EventEmitter();

  _options: any[] = [];
  _value: any = this._options.length >= 1 ? this._options[0] : null;

  sendValue(option: any): void {
    this.value = option;
    this.getValue.emit(option);
  }
}
