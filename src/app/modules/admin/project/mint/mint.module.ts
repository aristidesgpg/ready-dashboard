import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from "@angular/router";
import { SharedModule } from "../../../../shared/shared.module";
import { LoaderModule } from '../../components/loader/loader.module';
import { MintDialogCancelFuseblockComponent } from './dialog/cancel/cancel-fuseblock.component';
import { MintDialogComponent } from './dialog/dialog.component';
import { MintItemComponent } from './item/item.component';
import { MintComponent } from './mint.component';
import { MintNewComponent } from './new/new.component';

const mintRoutes: Route[] = [
  {
    path: '',
    component: MintComponent
  },
  {
      path: ':fuseblock',
      component: MintNewComponent,
  }
];

@NgModule({
  declarations: [
    MintComponent,
    MintNewComponent,
    MintItemComponent,
    MintDialogComponent,
    MintDialogCancelFuseblockComponent,
  ],
  imports: [
    RouterModule.forChild(mintRoutes),
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    LoaderModule,
  ]
})

export class MintModule { }
