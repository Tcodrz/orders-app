import { Component, EventEmitter, Output, Input } from '@angular/core';

export interface PriceObject {
  detailed: boolean;
  fullPrice: number;
  discount: number;
  collection: { id: number; name: string; price: number }[];
}

@Component({
  selector: 'app-order-price-form',
  templateUrl: './order-price-form.component.html',
  styleUrls: ['./order-price-form.component.css']
})
export class OrderPriceFormComponent {

  @Input() set setPrice(val: PriceObject) { this.price = Object.assign({}, val); }
  @Output() priceEvt: EventEmitter<PriceObject> = new EventEmitter();

  displayedColumns = ['action', 'price', 'item'];
  _prices: { id: number; name: string; price: number }[] = [];
  itemName = '';
  itemPrice = '';
  price: PriceObject = {
    detailed: false,
    fullPrice: 0,
    discount: 0,
    collection: []
  };

  addDetailedPrice(price: { name: string; price: string }): void {
    const p = parseInt(price.price, 10);
    const newPriceObject = {
      id: this._prices[this._prices.length - 1] ? this._prices[this._prices.length - 1].id + 1 : 1,
      name: price.name,
      price: p
    };
    if (!isNaN(p) && p > 0) {
      this._prices = [...this._prices, newPriceObject];
      this.itemName = '';
      this.itemPrice = '';
    }
    this.price.collection = this._prices;
    this.price.fullPrice = this.getTotalCost();
    this.dispatch();
  }

  removeDetailedPrice(price: { id: number; name: string; price: number }): void {
    const detailedPrice = this._prices.find(x => x.id === price.id);
    if (detailedPrice) {
      this._prices = this._prices.filter(p => detailedPrice.id !== p.id);
    }
  }

  getTotalCost(): number {
    let total = 0;
    this._prices.forEach(p => {
      total += p.price;
    });
    return total;
  }

  priceAfterDiscount(price: number | null, discount: number | null): number | null {
    if (discount) {
      if (discount > 100 || discount < 1) {
        return price;
      }
      if (price) {
        return price - (price * discount / 100);
      } else { return null; }
    } else {
      return price;
    }
  }

  priceAfterMaam(price: number | null): number | null {
    const maam = 1.17;
    if (price) { return price * maam; }
    else { return price; }
  }

  dispatch(): void {
    this.priceEvt.emit(this.price);
  }

  reset(): void {
    this.price.fullPrice = 0;
    this.price.discount = 0;
    this._prices = [];
    this.itemName = '';
    this.itemPrice = '';
  }
}
