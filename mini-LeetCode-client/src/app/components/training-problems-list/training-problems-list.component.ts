import { Component, OnInit, Inject} from '@angular/core';
import { Problem } from './../model/problem_model'

@Component({
  selector: 'app-training-problems-list',
  templateUrl:  "./training-problem-list.component.html",
  styleUrls: ["./training-problem-list.component.scss"]
})
export class TrainingProblemsListComponent implements OnInit {
  problems: Problem[];

  constructor(@Inject("ProblemService") private ProblemService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems() :void {
    this.problems = this.ProblemService.getAllProblem();
  }
}
