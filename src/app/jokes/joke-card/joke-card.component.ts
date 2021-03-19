import { FontAwesomeService } from './../services/font-awesome.service';
import { Joke } from 'src/app/jokes/services/http.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.css']
})
export class JokeCardComponent {
  joke: Joke;
  i: number;
  @Input() set currentjoke(val: Joke) {
    if (val) 
      this.joke = val;
  } 
  @Input() set index(val: number) {
    if (val)
      this.i = val;
  }
  @Output() selectJoke = new EventEmitter();
  @Output() unSelectJoke = new EventEmitter();
  @Output() removeJoke = new EventEmitter();
  @Output() showContent = new EventEmitter();
  @Output() hideContent = new EventEmitter();
  @Output() editJoke = new EventEmitter();
  @Output() submitJoke = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public icons: FontAwesomeService) {
    this.joke =  {
      id: 0,
      joke: '',
      safe: false,
      type: '',
      flags: {},
      lang: '',
      category: '',
      show: false,
      selected: false,
      edit: false
    };
    this.i =0;
  }

  selectAndShowJoke(joke: Joke) {
    this.selectJoke.emit(joke);
    // this.showContent.emit(joke);
  }

  unSelectAndHideJoke(joke: Joke) {
    this.unSelectJoke.emit(joke);
    // this.hideContent.emit(joke);
  }

}
