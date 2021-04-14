import { IContact } from './contact.model';
export interface IAdvertiser {
    id: number;
    name: string;
    contacts: IContact[];
}
