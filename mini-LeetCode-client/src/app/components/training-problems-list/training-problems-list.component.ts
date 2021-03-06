import { Component, OnInit, Inject} from '@angular/core';
import { Problem } from '../../model/problem_model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-training-problems-list',
  templateUrl:  "./training-problem-list.component.html",
  styleUrls: ["./training-problem-list.component.scss"]
})
export class TrainingProblemsListComponent implements OnInit {
  problems: Problem[] = [];
  subscription: Subscription;
  name: string = '';
  subscriptionNameInut: Subscription;
  constructor(@Inject("ProblemService") private ProblemService,
  @Inject("SearchInputService") private SearchInputService) { }

  ngOnInit() {
    this.getProblems();
    this.subscriptionNameInut = this.SearchInputService.get()
    .subscribe(
      res => this.name = res)
  }

  getProblems() :void {
    this.subscription = this.ProblemService.getAllProblems()
    .subscribe(problems => this.problems = problems);
  }
}
