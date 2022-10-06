import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {StakeComponent} from "./stake.component";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
const stakeRoutes: Route[] = [
  {
    path     : '',
    component: StakeComponent
  },
];

@NgModule({
  declarations: [
    StakeComponent,
  ],
  imports: [
    RouterModule.forChild(stakeRoutes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class StakeModule { }
