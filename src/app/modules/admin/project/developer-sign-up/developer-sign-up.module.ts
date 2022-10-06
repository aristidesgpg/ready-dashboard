import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DeveloperSignUpComponent } from './developer-sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

const auraRoutes: Route[] = [
  { path: '', component: DeveloperSignUpComponent }
];

@NgModule({
  declarations: [
    DeveloperSignUpComponent
  ],
  imports: [
    RouterModule.forChild(auraRoutes),
    SharedModule,
    FuseDrawerModule,
    FuseAlertModule,
    FuseHighlightModule,
    FuseScrollbarModule,
    MatSidenavModule,
    FuseCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
  ]
})
export class DeveloperSignUpModule { }
