import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {AddTeamMemberDialog, TeamComponent} from "./team.component";
import {SharedModule} from "../../../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
const teamRoutes: Route[] = [
  {
    path     : '',
    component: TeamComponent
  }
];


@NgModule({
  declarations: [
    TeamComponent,
    AddTeamMemberDialog
  ],
  imports: [
    RouterModule.forChild(teamRoutes),
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class TeamModule { }
