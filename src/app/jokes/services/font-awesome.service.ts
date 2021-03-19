import { Injectable } from '@angular/core';
import {
  faEdit,
  faTrash,
  faChevronDown,
  faChevronUp,
  faLaughWink,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class FontAwesomeService {
  faEdit = faEdit;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faLaughWink = faLaughWink;
  faCheck = faCheck;
  faTimes = faTimes;
}
