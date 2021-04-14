import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent {
  @Input() inputHasName = false;
  @Input() label = '';
  @Input() options: any[] | null = [];
  @Output() getValue = new EventEmitter();
  value: any;
}
