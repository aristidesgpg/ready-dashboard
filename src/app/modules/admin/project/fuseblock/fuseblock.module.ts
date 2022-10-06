import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {FuseBlockComponent} from "./fuseblock.component";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderModule } from '../../components/loader/loader.module';

const fuseblockRoutes: Route[] = [
  {
    path     : '',
    component: FuseBlockComponent
  },
];

@NgModule({
  declarations: [
    FuseBlockComponent,
  ],
  imports: [
    RouterModule.forChild(fuseblockRoutes),
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    LoaderModule,
  ]
})

export class FuseBlockModule { }
