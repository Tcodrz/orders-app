import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateModule } from '../state/state.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    StateModule,
    FontAwesomeModule
  ],
  exports: [DashboardComponent]
})
export class JokesModule { }
