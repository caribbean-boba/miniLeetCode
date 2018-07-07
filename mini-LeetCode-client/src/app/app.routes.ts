import {Routes, RouterModule} from "@angular/router";
import { TrainingProblemsListComponent } from './components/training-problems-list/training-problems-list.component';
import { ProblemEntriesDetailComponent } from './components/problem-entries-detail/problem-entries-detail.component';


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
        path: "**",
        redirectTo: "training-problem-list"
    }
];

export const routing = RouterModule.forRoot(routes);