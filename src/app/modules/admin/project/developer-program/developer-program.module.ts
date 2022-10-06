import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { DeveloperProgramComponent } from './developer-program.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

const auraRoutes: Route[] = [
  { path: '', component: DeveloperProgramComponent }
];

@NgModule({
  declarations: [
    DeveloperProgramComponent
  ],
  imports: [
    RouterModule.forChild(auraRoutes),
    SharedModule,
    FuseDrawerModule,
    FuseAlertModule,
    FuseCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ]
})
export class DeveloperProgramModule { }
