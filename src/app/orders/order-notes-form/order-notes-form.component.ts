import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-order-notes-form',
  templateUrl: './order-notes-form.component.html',
  styleUrls: ['./order-notes-form.component.css']
})
export class OrderNotesFormComponent {
  @Input() set setGeneralNotes(val: string) {
    if (val) { this.generalNotes = val; }
  }
  @Input() set setBookeepingNotes(val: string) {
    if (val) { this.bookkeepingNotes = val; }
  }
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
