import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FuseCardModule } from '../../../../../@fuse/components/card';
import { SharedModule } from '../../../../shared/shared.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { betaTestRoutes, betaTestRoutesComponents } from './beta-test.routing';

@NgModule({
    declarations: [
        ...betaTestRoutesComponents,
    ],
    imports: [
        // Angular
        SharedModule,
        RouterModule.forChild(betaTestRoutes),

        // Fuse
        FuseCardModule,

        // Angular Material
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTabsModule,

        // Ready
        LoaderModule,
    ]
})

export class BetaTestModule { }
