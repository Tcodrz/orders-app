import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Joke {
  id: number | string;
  joke: string;
  safe: boolean;
  type: string;
  flags: {};
  lang: string;
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

  getJokes(): Observable<Joke[]>{
    return this.http.get<ApiResponse>(this.api)
    .pipe(
      map((data: ApiResponse) => data.error ? [] : data.jokes)
      );
  }
}
