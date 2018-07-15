import {Routes, RouterModule} from "@angular/router";
import { TrainingProblemsListComponent } from './components/training-problems-list/training-problems-list.component';
import { ProblemEntriesDetailComponent } from './components/problem-entries-detail/problem-entries-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './components/service/auth-guard.service';


const routes: Routes = [
    {
        path: "",
        redirectTo: "training-problem-list",
        pathMatch:"full"
    },
    {
        path: "training-problem-list",
        component:TrainingProblemsListComponent
    },
    {
        path: "training-problem-list/:id",
        component:ProblemEntriesDetailComponent
    },
    {
        path: "profile",
        component:ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "**",
        redirectTo: "training-problem-list"
    }
];

export const routing = RouterModule.forRoot(routes);