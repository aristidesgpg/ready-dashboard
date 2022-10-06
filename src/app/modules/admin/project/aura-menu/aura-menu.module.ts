import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { auraMenuRoutes, auraMenuRoutesComponents } from './aura-menu.routing';

@NgModule({
    imports: [
        RouterModule.forChild(auraMenuRoutes),
        SharedModule,
        FuseDrawerModule,
        FuseAlertModule,
        FuseHighlightModule,
        FuseScrollbarModule,
        MatSidenavModule,
        FuseCardModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatIconModule,
        MatButtonModule,
    ],
    declarations: [
        ...auraMenuRoutesComponents,
    ],
})

export class AuraMenuModule { }
