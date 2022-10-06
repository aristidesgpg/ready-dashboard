import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {LeaderboardComponent} from "./leaderboard.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../../../shared/shared.module";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {FuseDrawerModule} from "../../../../../@fuse/components/drawer";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseAlertModule} from "../../../../../@fuse/components/alert";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FuseHighlightModule} from "../../../../../@fuse/components/highlight";
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FuseCardModule} from '@fuse/components/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

const leaderboardRoutes: Route[] = [
  {
    path     : '',
    component: LeaderboardComponent,
  }
];

@NgModule({
  declarations: [
    LeaderboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(leaderboardRoutes),
    SharedModule,
    MatIconModule,
    MatMomentDateModule,
    MatButtonModule,
    FuseDrawerModule,
    MatFormFieldModule,
    MatInputModule,
    FuseAlertModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    SharedModule,
    FuseHighlightModule,
    FuseScrollbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    FuseCardModule,
    MatDividerModule
  ]
})
export class LeaderboardModule { }
