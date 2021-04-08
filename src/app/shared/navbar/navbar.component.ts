import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  path = '';
  sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.sub = this.route.url.pipe(
      map(url => url[0].path)
    ).subscribe(path => this.path = path);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
