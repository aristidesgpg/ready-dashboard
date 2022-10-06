// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

// Routing
import { breedCraftRoute, breedCraftRouteComponents } from './breed-craft.routing';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Fuse Theme
import { FuseCardModule } from '@fuse/components/card';

// Ready
import { LoaderModule } from '../../components/loader/loader.module';
import { UploaderModule } from '../../components/uploader/uploader.module';

// Component
import { breedCraftDialogComponents } from './dialog';

@NgModule({
    declarations: [
        ...breedCraftRouteComponents,
        ...breedCraftDialogComponents,
    ],
    imports: [
        // Angular
        SharedModule,
        RouterModule.forChild(breedCraftRoute),

        // Angular Material
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTooltipModule,

        // Fuse Theme
        FuseCardModule,

        // Ready
        LoaderModule,
        UploaderModule,
    ]
})

export class BreedCraftModule { }
