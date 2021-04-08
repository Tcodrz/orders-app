import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../../state/index';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersPageGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('user'),
      map((userState) => {
        if (userState.user.id) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
    // return false;
  }

}
