import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SearchInputService {
  private input = new BehaviorSubject<String>('');

  constructor() { }

  set(name: string): void{
    this.input.next(name);
  }
  get(): Observable<String> {
    return this.input.asObservable();
  }
}
