import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from "./detail.component";
import {Route, RouterModule} from "@angular/router";
import {SharedModule} from "../../../../shared/shared.module";
import {ExampleComponent} from "../../example/example.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatButtonModule} from "@angular/material/button";
import {FuseDrawerModule} from "../../../../../@fuse/components/drawer";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseAlertModule} from "../../../../../@fuse/components/alert";
import {MatExpansionModule} from "@angular/material/expansion";

const detailRoutes: Route[] = [
  {
    path     : '',
    component: DetailComponent
  }
];


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    RouterModule.forChild(detailRoutes),
    SharedModule,
    MatIconModule,
    MatMomentDateModule,
    MatButtonModule,
    FuseDrawerModule,
    MatFormFieldModule,
    MatInputModule,
    FuseAlertModule,
    MatExpansionModule
  ]
})
export class DetailModule { }
