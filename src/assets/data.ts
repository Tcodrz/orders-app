import { IOrder } from './../app/shared/models/order.model';

export const orders: IOrder[] = [
  {
    id: 1,
    advertiserId: 35,
    bookkeepingNotes: '',
    campaign: `רדיו מרץ 21`,
    contactId: 137,
    customerId: 63,
    date: '13/03/2021',
    discount: 0,
    generalNotes: '',
    invoiceNumber: 192837,
    music: 'Red Hot Chilly Peppers - Californication',
    narrators: 24,
    numberOfVariations: 1,
    numberOfVersions: 0,
    price: 2400,
    responsibility: {
      text: 'לקוח',
      narrator: 'באחריות אולפן הקלטות',
      music: 'באחריות אולפן הקלטות'
    },
    status: 'בוצע',
    studioServicesIcluded: true,
    type: 'תשדירי רדיו',
    usagePeriod: 'עונה'
  },
  {
    id: 2,
    advertiserId: 435,
    bookkeepingNotes: '',
    campaign: `אביב 2021 רדיו`,
    contactId: 72,
    customerId: 432,
    date: '19/03/2021',
    discount: 0,
    generalNotes: '',
    invoiceNumber: 192812,
    music: 'Pantera - Walk',
    narrators: 6,
    numberOfVariations: 3,
    numberOfVersions: 0,
    price: 5500,
    responsibility: {
      text: 'לקוח',
      narrator: 'באחריות אולפן הקלטות',
      music: 'לקוח'
    },
    status: 'בוצע וחתום',
    studioServicesIcluded: true,
    type: 'תשדירי רדיו',
    usagePeriod: 'שתי עונות'
  },
  {
    id: 3,
    advertiserId: 14,
    bookkeepingNotes: 'google',
    campaign: `digital campaign`,
    contactId: 285,
    customerId: 341,
    date: '24/03/2021',
    discount: 0,
    generalNotes: 'הקלטת קריינות + עריכה ומיקס',
    invoiceNumber: 217654,
    music: 'WOM Brandon James - letting a dog go',
    narrators: 26,
    numberOfVariations: 1,
    numberOfVersions: 0,
    price: 3200,
    responsibility: {
      text: 'לקוח',
      narrator: 'באחריות אולפן הקלטות',
      music: 'באחריות אולפן הקלטות'
    },
    status: 'פתוחה',
    studioServicesIcluded: true,
    type: 'סרטון דיגיטל',
    usagePeriod: 'ללא'
  }
];

