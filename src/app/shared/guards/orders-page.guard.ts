import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { updateLoggedInUser } from 'src/app/state/user/user.actions';
import { AppState } from '../../state/index';

@Injectable({
  providedIn: 'root'
})
export class OrdersPageGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  /*
    check if user is logged in
    if user is stored in session storage and not in the store
    updates the store
  */
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select('user'),
      map((userState) => {
        const user = sessionStorage.getItem('user');
        if (userState.user.id || user) {
          if (user && !userState.user.id) {
            this.updateUserInStore();
          }
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }

  updateUserInStore(): void {
    let user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user && typeof user === 'object') {
        this.store.dispatch(updateLoggedInUser({
          payload: {
            id: user['id'],
            name: user['name'],
            _id: user['_id'],
            email: user['email'],
            admin: user['admin']
          }
        }));
      }
    }
  }

}
