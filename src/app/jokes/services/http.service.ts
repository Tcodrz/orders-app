import { repeat, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Joke {
  id: number;
  joke: string;
  safe: boolean;
  type: string;
  flags: {};
  lang: string;
  category: string;
  show: boolean;
  selected: boolean;
  edit: boolean;
}

export interface ApiResponse {
  jokes: Joke[];
  error: boolean;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private api: string = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';

  constructor(private http: HttpClient) { }

  /**
   * Takes a number of pages and returns an array of jokes
   * each page contain 10 jokes
   * @param pages the amount of pages to receive, each page contains 10 jokes
   * @returns an array of jokes
   */
  getJokes(pages: number): Observable<Joke[]>{
    return this.http.get<ApiResponse>(this.api)
    .pipe(
      repeat(pages),
      map((data: ApiResponse) => data.error ? [] : data.jokes),
      map((data: Joke[]) => data.map(j => ({...j, selected: false, show: false, edit: false}))),
    );
  }

  removeJoke(joke: Joke): Observable<Joke> {
    return of(joke);
  }
}
