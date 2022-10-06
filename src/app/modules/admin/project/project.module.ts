import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {ProjectComponent} from "./project.component";
import {ExampleComponent} from "../example/example.component";
import {SharedModule} from "../../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatButtonModule} from "@angular/material/button";
import {FuseDrawerModule} from "../../../../@fuse/components/drawer";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseAlertModule} from "../../../../@fuse/components/alert";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { TeamComponent } from './team/team.component';
// import { FuseBlockComponent } from './fuseblock/fuseblock.component';

const projectRoutes: Route[] = [
  {
    path     : '',
    component: ProjectComponent
  },
];

@NgModule({
  declarations: [
    ProjectComponent,
    //TeamComponent,
    //OverviewComponent,
    //DashboardComponent,
    //DetailComponent,
    // FuseBlockComponent
  ],
  imports     : [
    RouterModule.forChild(projectRoutes),
    SharedModule,
    MatIconModule,
    MatMomentDateModule,
    MatButtonModule,
    FuseDrawerModule,
    MatFormFieldModule,
    MatInputModule,
    FuseAlertModule,
    MatProgressSpinnerModule
  ]
})
export class ProjectModule { }
