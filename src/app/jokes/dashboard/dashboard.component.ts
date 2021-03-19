import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { AppState } from 'src/app/state';
import { JokesState } from 'src/app/state/jokes/jokes.reducer';
import { cancelEdit, create, deleteJoke, hideContent, loadJokes, selectJoke, showContent, unSelectJoke, update } from '../../state/jokes/jokes.actions';
import { Joke } from '../services/http.service';
import { editJoke } from './../../state/jokes/jokes.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  jokes$: Observable<Joke[]> | undefined;
  selectedJokeId: Observable<number | null> | undefined;
  private sub: Subscription;

  constructor(private store: Store<AppState>) {
    this.sub = store.pipe(
      select('jokes'),
    ).subscribe((state: JokesState) => {
      this.jokes$ = of(state.jokes);
      this.selectedJokeId = of(state.selectedJokeId);
    });
  }

  ngOnInit(): void {
    this.load();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  load(): void {
    this.store.dispatch(loadJokes());
  }

  selectJoke(joke: Joke): void {
    this.store.dispatch(selectJoke({ payload: joke }));
  }

  unSelect(joke: Joke): void {
    this.store.dispatch(unSelectJoke({ payload: joke }));
  }

  async updateJoke(j: string): Promise<void> {
    const id = await this.selectedJokeId?.toPromise();
    const jokes = await this.jokes$?.toPromise();
    if (jokes) {
      const current = jokes.find(x => x.id === id);
      if (current) {
        const newJoke: Joke = { ...current, joke: j };
        this.store.dispatch(update({ payload: newJoke }));
      }
    }
  }

  removeJoke(joke: Joke): void {
    this.store.dispatch(deleteJoke({ payload: joke }));
  }

  createJoke(joke: Joke): void {
    this.store.dispatch(create({ payload: joke }));
  }

  showContent(joke: Joke): void {
    this.store.dispatch(showContent({ payload: joke }));
  }

  hideContent(joke: Joke): void {
    this.store.dispatch(hideContent({ payload: joke }));
  }
  editJoke(joke: Joke): void {
    this.store.dispatch(editJoke({ payload: joke }))
  }
  cancelJokeEdit(joke: Joke): void {
    this.store.dispatch(cancelEdit({payload: joke}));
  }

}
