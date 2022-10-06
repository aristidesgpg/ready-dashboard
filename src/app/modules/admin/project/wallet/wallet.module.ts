import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from "@angular/router";
import { SharedModule } from "../../../../shared/shared.module";
import { WalletComponent } from './wallet.component';

const walletRoutes: Route[] = [
  {
    path     : '',
    component: WalletComponent
  },
];

@NgModule({
  declarations: [
    WalletComponent,
  ],
  imports: [
    RouterModule.forChild(walletRoutes),
    SharedModule,
    MatButtonModule,
  ]
})

export class WalletModule { }
