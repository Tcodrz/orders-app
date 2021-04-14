import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from 'src/app/state/user/user.actions';
import { AppState } from './../../state/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  path = '';
  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.sub = this.route.url.pipe(
      map(url => url[0].path)
    ).subscribe(path => this.path = path);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

}
