import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  template: `
  <button mat-mini-fab color="primary" class="add-icon-btn">
                <mat-icon class="add-icon">add</mat-icon>
            </button>
  `,
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  // @Output() click: EventEmitter<void> = new EventEmitter<void>();
}
