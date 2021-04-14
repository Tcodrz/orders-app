import { INarrator } from './../../shared/models/narrator.model';
import { createAction, props } from '@ngrx/store';

export const loadNarrators = createAction('[Narrators] Load');
export const narratorsLoaded = createAction('[Narrators] Loaded', props<{ payload: INarrator[] }>());
