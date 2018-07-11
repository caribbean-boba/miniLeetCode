import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from './../model/problem_model'
const DEFAULT_PROBLEM: Problem = Object.freeze({
  id : 0,
  name: '',
  description:'',
  level: 'EASY'
});

@Component({
  selector: 'app-add-problem-entry',
  templateUrl: './add-problem-entry.component.html',
  styleUrls: ['./add-problem-entry.component.css']
})
export class AddProblemEntryComponent implements OnInit {
  public levels: String[];
  newProblem: Problem = Object.assign({},DEFAULT_PROBLEM);

  constructor(@Inject("ProblemService") private ProblemService) { }

  ngOnInit() {
    this.levels= ["HARD", "MEDIUM", "EASY"];
  }

  addNewProblem(): void {
    console.log(this.newProblem);
    this.ProblemService.addNewProblem(this.newProblem)
      .catch(error => console.log(error._body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
}
