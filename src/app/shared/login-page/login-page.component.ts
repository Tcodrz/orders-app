import { Subscription } from 'rxjs';
import { login } from './../../state/user/user.actions';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  sub: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit(): void {
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.loginForm.reset();
    this.store.dispatch(login({ payload: user }));
    this.sub = this.store.pipe(
      select('user')
    ).subscribe(userState => {
      if (userState.user.id) {
        this.router.navigate(['orders']);
      }
    });
  }

}
