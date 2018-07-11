import {Http, Response, Headers } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Injectable } from '@angular/core';
import { Problem } from '../model/problem_model';
import { PROBLEM_LIST } from './test_data/problems.test';
import { Observable, BehaviorSubject } from 'rxjs'
import { VERSION } from '@angular/platform-browser-dynamic';
// import 'rxis/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  problemList: Problem[] = PROBLEM_LIST;
  problemResource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  getAllProblems(): Observable<Problem[]> {
    this.http.get("api/training-problem-list")
    .toPromise().then((res: Response) => {
      this.problemResource.next(res.json());
    })
    .catch(this.handleError);
    return this.problemResource.asObservable();
  }

  getProblemById(id :number): Promise<Problem> {
    return this.http.get(`api/training-problem-list/${id}`).
    toPromise()
    .then((res: Response) => res.json())
    .catch(this.handleError);
  }

  addNewProblem(newProblem: Problem): Promise<Problem>{
    let headers = new Headers({"content-type": "application/json"});
    return this.http.post("api/training-problem-list", JSON.stringify(newProblem), {headers: headers})
    .toPromise()
    .then((res: Response) => {
      this.getAllProblems();
      return res.json();
    })
    .catch(this.handleError);
  }
}
