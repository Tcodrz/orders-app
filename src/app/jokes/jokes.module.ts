import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StateModule } from '../state/state.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { JokeCardComponent } from './joke-card/joke-card.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, JokeCardComponent, HeaderComponent],
  imports: [
    CommonModule,
    StateModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [DashboardComponent]
})
export class JokesModule { }
