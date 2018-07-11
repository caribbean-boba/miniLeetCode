import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { } from
import { ProblemService } from '../app/components/service/problem.service';

import { AppComponent } from './app.component';
import { TrainingProblemsListComponent } from './components/training-problems-list/training-problems-list.component';
import { ProblemEntriesDetailComponent } from './components/problem-entries-detail/problem-entries-detail.component';


import { routing } from "./app.routes";
import { AddProblemEntryComponent } from './components/add-problem-entry/add-problem-entry.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingProblemsListComponent,
    ProblemEntriesDetailComponent,
    AddProblemEntryComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [{
    provide: "ProblemService",
    useClass: ProblemService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
