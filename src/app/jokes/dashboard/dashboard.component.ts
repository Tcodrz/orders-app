import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Joke } from '../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jokes$: Observable<Joke[]> | undefined;

  constructor(private api: HttpService) { }

  ngOnInit(): void {
    this.jokes$ = this.api.getJokes();
  }

}
