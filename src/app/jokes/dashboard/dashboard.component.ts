import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state';
import { JokesState } from 'src/app/state/jokes/jokes.reducer';
import { Joke } from '../services/http.service';
import { create, update, deleteJoke, selectJoke, loadJokes, showContent, hideContent, unSelectJoke } from '../../state/jokes/jokes.actions';
import { FontAwesomeService } from '../services/font-awesome.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jokes$: Observable<Joke[]> | undefined;

  constructor(private store: Store<AppState>, public icons: FontAwesomeService) {
    this.jokes$ = store.pipe(
      select('jokes'),
      map((state: JokesState) => state.jokes)
    );
  }

  ngOnInit(): void { 
    this.load();
  }
  
  load(): void {
    this.store.dispatch(loadJokes());
  }

  selectJoke(joke: Joke): void {
    this.store.dispatch(selectJoke({payload: joke}));
  }

  unSelect(joke: Joke): void {
    this.store.dispatch(unSelectJoke({payload: joke}));
  }

  updateJoke(joke: Joke): void {
    this.store.dispatch(update({payload: joke}));
  }

  removeJoke(joke: Joke): void {
    this.store.dispatch(deleteJoke({payload: joke}));
  }

  createJoke(joke: Joke): void {
    this.store.dispatch(create({payload: joke}));
  }
  
  showContent(joke: Joke): void {
    this.store.dispatch(showContent({payload: joke}));
  }

  hideContent(joke: Joke): void {
    this.store.dispatch(hideContent({payload: joke}));
  }

}
