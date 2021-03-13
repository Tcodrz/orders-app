import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { jokesEffects } from './jokes/jokes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10}),
    EffectsModule.forRoot([jokesEffects])
  ]
})
export class StateModule { }
