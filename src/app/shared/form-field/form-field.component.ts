import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() inputType = '';
  @Output() getValue = new EventEmitter();
  @Input() set setValue(val: any) {
    if (val) {
      this.value = val;
    }
  }
  value: any;

}
