import { Injectable } from '@angular/core';
import { Problem } from '../model/problem_model';
import { PROBLEM_LIST } from './test_data/problems.test';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor() { }

  getAllProblem(): Problem[] {
    return PROBLEM_LIST;
  }

  getProblemById(id :number): Problem {
    return PROBLEM_LIST.find((problem) => problem.id === id);
  }
}
