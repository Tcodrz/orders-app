import { Injectable } from '@angular/core';
import {
  faEdit,
  faTrash,
  faChevronDown,
  faChevronUp,
  faLaughWink,
  faCheck,
  faTimes,
  faPrint,
  faChevronLeft,
  faChevronRight,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faSort,
  faSearch
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
  faPrint = faPrint;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faSort = faSort;
  faSearch = faSearch;
}
