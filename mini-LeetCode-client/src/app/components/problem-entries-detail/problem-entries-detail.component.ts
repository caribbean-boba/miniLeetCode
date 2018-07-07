import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../model/problem_model"
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-problem-entries-detail',
  templateUrl: './problem-entries-detail.component.html',
  styleUrls: ['./problem-entries-detail.component.css']
})
export class ProblemEntriesDetailComponent implements OnInit {
  problem: Problem;
  constructor(@Inject ("ProblemService") private ProblemService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problem = this.ProblemService.getProblemById(+params["id"]);
    });
  }

}
