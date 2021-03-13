import { Injectable } from '@angular/core';
import {
  faEdit,
  faTrash,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class FontAwesomeService {
  faEdit = faEdit;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
}
