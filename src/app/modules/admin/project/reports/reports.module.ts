import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { reportsRoute, reportsRouteComponent } from './reports.routing';

@NgModule({
  declarations: [
    ...reportsRouteComponent,
  ],
  imports: [
    // Angular
    RouterModule.forChild(reportsRoute),
    SharedModule,

    // Angular Material
    MatExpansionModule,
    MatProgressSpinnerModule,
  ]
})

export class ReportsModule { }
