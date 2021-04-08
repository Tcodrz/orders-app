import { IContact } from './contact.model';
import { INarrator } from './narrator.model';
import { IAdvertiser } from './advetiser.model';
import { ICustomer } from './customer.model';

export interface IOrder {
    id: string;
    date: string;
    advertiser: IAdvertiser;
    contact: IContact;
    customer: ICustomer;
    campaign: string;
    type: string;
    status: string;
    invoiceNumber: number;
    price: number;
    discount: number;
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
    usagePeriod: string;
    music: string;
    studioServicesIcluded: boolean;
}
