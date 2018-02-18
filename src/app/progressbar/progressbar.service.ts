import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable() 
export class ProgressBarService {
  subject = new BehaviorSubject<any>(true);
  changes = this.subject
              .asObservable()
              .do(changes => console.log('new state', changes)); 
    
  constructor() { }
  show() {
    this.subject.next(true);
  }
  hide() {
    this.subject.next(false);
  }
}

