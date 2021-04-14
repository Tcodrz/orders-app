import { Component, EventEmitter, Output } from '@angular/core';

export interface PriceObject {
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
  @Output() price: EventEmitter<number | PriceObject | null> = new EventEmitter();
  _price: number | null = null;
  _discount: number | null = null;
  _detailed = false;
  _prices: { id: number; name: string; price: number }[] = [];
  displayedColumns = ['action', 'price', 'item'];
  itemName = '';
  itemPrice = '';

  addDetailedPrice(price: { name: string; price: string }): void {
    const p = parseInt(price.price, 10);
    const newPriceObject = {
      id: this._prices.length + 1,
      name: price.name,
      price: p
    };

    this._prices = [...this._prices, newPriceObject];
    this.itemName = '';
    this.itemPrice = '';
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
    if (this._price && this._price > 0) {
      if (this._discount && this._discount > 0) {
        this.price.emit({
          fullPrice: this._price,
          discount: this._discount,
          collection: []
        });
      }
      this.price.emit(this._price);
    }
  }

  reset(): void {
    this._price = null;
    this._discount = null;
    this._prices = [];
    this.itemName = '';
    this.itemPrice = '';
  }
}
