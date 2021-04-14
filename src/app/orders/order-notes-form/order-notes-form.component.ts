import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-notes-form',
  templateUrl: './order-notes-form.component.html',
  styleUrls: ['./order-notes-form.component.css']
})
export class OrderNotesFormComponent {
  @Output() notes: EventEmitter<{ generalNotes: string; bookkeepingNotes: string }> = new EventEmitter();
  generalNotes = '';
  bookkeepingNotes = '';

  dispatch(): void {
    this.notes.emit({
      generalNotes: this.generalNotes,
      bookkeepingNotes: this.bookkeepingNotes
    });
  }
}
