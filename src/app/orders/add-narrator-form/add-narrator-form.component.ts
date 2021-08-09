import { FontAwesomeService } from './../../shared/services/font-awesome.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INarrator } from 'src/app/shared/models/narrator.model';

@Component({
  selector: 'app-add-narrator-form',
  templateUrl: './add-narrator-form.component.html',
  styleUrls: ['./add-narrator-form.component.css']
})
export class AddNarratorFormComponent {
  @Input() narrators$: Observable<INarrator[]> = of([]);
  @Input() set narratorsList(val: INarrator[]) {
    if (val) {
      this.narrators = val;
    }
  }
  @Output() addNarrators: EventEmitter<{ narrators: INarrator[]; totalPrice: number }> = new EventEmitter();
  displayedColumns = ['actions', 'price', 'narrator'];
  narrator = {
    id: 0,
    name: '',
    price: 0
  };
  narratorPrice = null;
  narrators: { id: number; name: string; price: number }[] = [];

  constructor(public icons: FontAwesomeService) { }

  addNarrator(narrator: { id: number; name: string; price: number }, price: number | null): void {
    if (narrator.id < 1) { return; }
    if (price) { narrator = { ...narrator, price }; }
    const n = this.narrators.find(x => x.id === narrator.id);
    if (n) { this.removeNarrator(narrator); }
    this.narrators = [...this.narrators, narrator];
    this.narrator = { id: 0, name: '', price: 0 };
    this.narratorPrice = null;
    const totalPrice = this.getTotalPrice();
    this.addNarrators.emit({ narrators: this.narrators, totalPrice });
  }

  removeNarrator(narrator: { id: number; name: string; price: number }): void {
    if (this.narrators.length === 1) { this.narrators = []; }
    else { this.narrators = this.narrators.filter(x => x.id !== narrator.id); }
    const totalPrice = this.getTotalPrice();
    this.addNarrators.emit({ narrators: this.narrators, totalPrice });
  }

  getTotalPrice(): number {
    return this.narrators.map(x => x.price).reduce((a, b) => a + b, 0);
  }

}
