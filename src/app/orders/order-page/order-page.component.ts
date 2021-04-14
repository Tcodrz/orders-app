import { DateService } from './../../shared/services/date.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICustomer } from 'src/app/shared/models/customer.model';
import { PriceObject } from '../order-price-form/order-price-form.component';
import { IAdvertiser } from './../../shared/models/advetiser.model';
import { IContact } from './../../shared/models/contact.model';
import { INarrator } from './../../shared/models/narrator.model';
import { FontAwesomeService } from './../../shared/services/font-awesome.service';
import { OrderPageService } from './../../shared/services/order-page.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orderTypes = ['תשדירי רדיו', 'הקלטת קריינות', 'הקלטת מרכזיה IVR', 'הלחנת ג\'ינגל', 'חידוש תשדיר'];
  responsibilityTypes = ['באחריות לקוח', 'באחריות אולפן ההקלטות', 'ללא'];
  usagePeriodOptions = ['ללא', 'שתי עונות', 'עונה'];
  orderNumber = '';
  advertiser: IAdvertiser = { id: 0, name: '', contacts: [] };
  contact: IContact = { id: 0, name: '', email: '', phone: 0 };
  customer: ICustomer = { id: 0, name: '', contacts: [] };
  narrator: INarrator = { id: 0, name: '', price: 0 };
  date = new Date(`${DateService.month}/${DateService.day}/${DateService.year}`);
  priceObject: PriceObject | null = null;
  campaign = '';
  price = 0;
  type = '';
  discount = null;
  generalNotes = '';
  bookkeepingNotes = '';
  narratorsPrice = 0;
  numberOfVersions = 0;
  numberOfVariations = 0;
  narratorsResponsibility = '';
  textResponsibility = '';
  musicResponsibility = '';
  _usagePeriod = 0;
  music = '';
  narrators: { id: number; name: string; price: number }[] = [];
  advertisers$: Observable<IAdvertiser[]> = of([]);
  customers$: Observable<ICustomer[]> = of([]);
  narrators$: Observable<INarrator[]> = of([]);

  constructor(
    private orderPageService: OrderPageService,
    public icons: FontAwesomeService
  ) { }

  set usagePeriod(val: string) {
    if (val === 'עונה') { this._usagePeriod = 1; }
    if (val === 'שתי עונות') { this._usagePeriod = 2; }
    if (!val || val === 'ללא') { this._usagePeriod = 0; }
  }

  ngOnInit(): void {
    this.advertisers$ = this.orderPageService.getAdvertisers();
    this.customers$ = this.orderPageService.getCustomers();
    this.narrators$ = this.orderPageService.getNarrators();
    this.orderNumber = this.orderPageService.getNextOrderNumber();
  }

  // CATCH EVENTS
  catchPrice(price: number | PriceObject | null): void {
    if (typeof price === 'number' && price > 0) { this.price = price; }
    else if (typeof price === 'object') { this.priceObject = price; }
  }
  catchNotes(notes: { generalNotes: string; bookkeepingNotes: string }): void {
    this.generalNotes = notes.generalNotes;
    this.bookkeepingNotes = notes.bookkeepingNotes;
  }
  addNarrators(obj: { narrators: INarrator[]; totalPrice: number }): void {
    this.narrators = obj.narrators;
    this.narratorsPrice = obj.totalPrice;
  }
  catchCampaign(val: string): void { this.campaign = val; }
  catchType(val: string): void { this.type = val; }
  catchCustomer(val: ICustomer): void { this.customer = val; }
  catchContact(val: IContact): void { this.contact = val; }
  catchAdvertiser(val: IAdvertiser): void { this.advertiser = val; }
  catchNumberOfVersions(val: number): void { this.numberOfVersions = val; }
  catchNumberOfVariations(val: number): void { this.numberOfVariations = val; }
  catchNarratorResponsibilty(val: string): void { this.narratorsResponsibility = val; }
  catchTextResponsibility(val: string): void { this.textResponsibility = val; }
  catchMusicResponsibility(val: string): void { this.musicResponsibility = val; }
  catchMusic(val: string): void { this.music = val; }
}
