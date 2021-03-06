import { NarratorsEffects } from './narrators/narrators.effects';
import { CustomersEffects } from './customers/customers.effects';
import { AdvertisersEffects } from './advertisers/advertisers.effects';
import { UserEffects } from './user/user.effects';
import { FilterEffects } from './filters/filter.effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '.';
import { OrdersEffects } from './orders/orders.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 20 }),
    EffectsModule.forRoot([OrdersEffects, FilterEffects, UserEffects, AdvertisersEffects, CustomersEffects, NarratorsEffects])
  ]
})
export class StateModule { }
