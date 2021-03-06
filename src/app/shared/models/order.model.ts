import { PriceObject } from './../../orders/order-price-form/order-price-form.component';
import { IContact } from './contact.model';
import { INarrator } from './narrator.model';
import { IAdvertiser } from './advetiser.model';
import { ICustomer } from './customer.model';
import { IFile } from '../file-upload/file-upload.component';

export interface IOrder {
    id: string;
    date: string;
    advertiser: IAdvertiser;
    contact: IContact;
    customer: ICustomer;
    campaign: string;
    type: string;
    status: string;
    files: IFile[];
    invoiceNumber: string;
    price: PriceObject;
    generalNotes: string;
    bookkeepingNotes: string;
    narrators: INarrator[];
    narratorsPrice: number;
    numberOfVersion: number;
    numberOfVariations: number;
    responsibility: {
        narrator: string;
        text: string;
        music: string;
    };
    usagePeriod: number;
    music: string;
    studioServicesIcluded: boolean;
}
