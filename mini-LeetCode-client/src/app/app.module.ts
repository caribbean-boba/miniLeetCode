import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { } from
import { ProblemService } from '../app/service/problem.service';

import { AppComponent } from './app.component';
import { TrainingProblemsListComponent } from './components/training-problems-list/training-problems-list.component';
import { ProblemEntriesDetailComponent } from './components/problem-entries-detail/problem-entries-detail.component';


import { routing } from "./app.routes";
import { AddProblemEntryComponent } from './components/add-problem-entry/add-problem-entry.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard.service';
import { CollabrativeEditService } from './service/collabrative-edit.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AceEditorComponent } from './components/ace-editor/ace-editor.component';
import { SearchByNamePipe } from './pipes/search-by-name.pipe';

import { SearchInputService } from './service/search-input.service';

@NgModule({
  declarations: [
    AppComponent,
    TrainingProblemsListComponent,
    ProblemEntriesDetailComponent,
    AddProblemEntryComponent,
    NavigationBarComponent,
    ProfileComponent,
    AceEditorComponent,
    SearchByNamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
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
  },
  {
    provide: "CollabrativeEditService",
    useClass: CollabrativeEditService
  },
  {
    provide: "SearchInputService",
    useClass: SearchInputService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
