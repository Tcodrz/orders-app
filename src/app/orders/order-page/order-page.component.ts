import { ActivatedRoute, Params } from '@angular/router';
import { IOrder } from './../../shared/models/order.model';
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
import { IFile } from 'src/app/shared/file-upload/file-upload.component';

enum USAGE { 'ללא', 'עונה', 'שתי עונות' };

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orderTypes = ['תשדירי רדיו', 'הקלטת קריינות', 'הקלטת מרכזיה IVR', 'הלחנת ג\'ינגל', 'חידוש תשדיר'];
  statusOptions = ['open', 'done', 'signed and done', 'closed'];
  responsibilityTypes = ['באחריות לקוח', 'באחריות אולפן ההקלטות', 'ללא'];
  usagePeriodOptions = ['ללא', 'שתי עונות', 'עונה'];
  orderNumber = '';
  advertiser: IAdvertiser = { id: 0, name: '', contacts: [] };
  contact: IContact = { id: 0, name: '', email: '', phone: 0 };
  customer: ICustomer = { id: 0, name: '', contacts: [] };
  narrator: INarrator = { id: 0, name: '', price: 0 };
  date = new Date(`${DateService.month}/${DateService.day}/${DateService.year}`);
  campaign = '';
  price: PriceObject = {
    detailed: false,
    fullPrice: 0,
    discount: 0,
    collection: []
  };
  type = '';
  discount = null;
  generalNotes = '';
  bookkeepingNotes = '';
  files: IFile[] = [];
  narratorsPrice = 0;
  numberOfVersions = 0;
  numberOfVariations = 0;
  narratorsResponsibility = '';
  textResponsibility = '';
  musicResponsibility = '';
  _usagePeriod = 0;
  usagePeriodString = '';
  music = '';
  status = 'open';
  invoiceNumber = '';
  studioServicesIcluded = true;
  narrators: { id: number; name: string; price: number }[] = [];
  advertisers$: Observable<IAdvertiser[]> = of([]);
  customers$: Observable<ICustomer[]> = of([]);
  narrators$: Observable<INarrator[]> = of([]);

  constructor(
    private orderPageService: OrderPageService,
    private activeRoutes: ActivatedRoute,
    public icons: FontAwesomeService
  ) { }

  ngOnInit(): void {
    this.advertisers$ = this.orderPageService.getAdvertisers();
    this.customers$ = this.orderPageService.getCustomers();
    this.narrators$ = this.orderPageService.getNarrators();
    this.orderNumber = this.orderPageService.getNextOrderNumber();
    this.activeRoutes.params.subscribe((params: Params) => {
      const orderId = params['order-id'];
      const order = this.orderPageService.findOrder(orderId);
      if (order) {
        this.orderNumber = order.id;
        this.date = new Date(order.date);
        this.customer = order.customer;
        this.advertiser = order.advertiser;
        this.contact = order.contact;
        this.campaign = order.campaign;
        this.bookkeepingNotes = order.bookkeepingNotes;
        this.type = order.type;
        this._usagePeriod = order.usagePeriod;
        this.narrators = order.narrators;
        this.price = order.price;
        this.status = order.status;
      }
    });
  }

  // CATCH EVENTS
  catchPrice(price: PriceObject): void {
    console.log(price);
    this.price = price;
  }
  catchNotes(notes: { generalNotes: string; bookkeepingNotes: string }): void {
    this.generalNotes = notes.generalNotes;
    this.bookkeepingNotes = notes.bookkeepingNotes;
  }
  addNarrators(obj: { narrators: INarrator[]; totalPrice: number }): void {
    this.narrators = obj.narrators;
    this.narratorsPrice = obj.totalPrice;
  }
  saveOrder(): void {
    const month = this.date.toString().split(' ')[1];
    const day = this.date.toString().split(' ')[2];
    const year = this.date.toString().split(' ')[3];
    const order: IOrder = {
      id: this.orderNumber,
      date: `${month}/${day}/${year}`,
      advertiser: this.advertiser,
      contact: this.contact,
      customer: this.customer,
      campaign: this.campaign,
      status: this.status,
      studioServicesIcluded: this.studioServicesIcluded,
      bookkeepingNotes: this.bookkeepingNotes,
      generalNotes: this.generalNotes,
      invoiceNumber: this.invoiceNumber,
      music: this.music,
      narrators: this.narrators,
      narratorsPrice: this.narratorsPrice,
      numberOfVariations: this.numberOfVariations,
      numberOfVersion: this.numberOfVersions,
      price: this.price,
      responsibility: {
        narrator: this.narratorsResponsibility,
        music: this.musicResponsibility,
        text: this.textResponsibility
      },
      type: this.type,
      usagePeriod: this.usagePeriodString === USAGE[1] ? 1 : this.usagePeriodString === USAGE[2] ? 2 : 0,
      files: this.files
    };
    console.log(order);
    this.orderPageService.saveOrder(order);
  }
  catchCampaign(val: string): void { this.campaign = val; }
  catchType(val: string): void { this.type = val; }
  catchCustomer(val: ICustomer): void { this.customer = val; }
  catchContact(val: IContact): void { this.contact = val; }
  catchAdvertiser(val: IAdvertiser): void {
    this.advertiser = val;
  }
  catchStatus(val: string): void { this.status = val; }
  catchNumberOfVersions(val: number): void { this.numberOfVersions = val; }
  catchNumberOfVariations(val: number): void { this.numberOfVariations = val; }
  catchNarratorResponsibilty(val: string): void { this.narratorsResponsibility = val; }
  catchTextResponsibility(val: string): void { this.textResponsibility = val; }
  catchMusicResponsibility(val: string): void { this.musicResponsibility = val; }
  catchMusic(val: string): void { this.music = val; }
  handleUploadFile(files: IFile[]): void { this.files = files; console.log(this.files); }
}
