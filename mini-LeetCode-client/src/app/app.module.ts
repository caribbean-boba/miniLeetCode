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
import { AuthService } from './components/service/auth.service';
import { AuthGuardService } from './components/service/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingProblemsListComponent,
    ProblemEntriesDetailComponent,
    AddProblemEntryComponent,
    NavigationBarComponent,
    ProfileComponent
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
  },{
    provide: "AuthService",
    useClass: AuthService
  },
  {
    provide: "AuthGuardService",
    useClass: AuthGuardService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
