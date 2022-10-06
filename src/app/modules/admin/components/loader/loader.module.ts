// Angular
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Angular Material
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// Components
import { LoaderComponent } from "./loader.component";

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent,
    ],
})

export class LoaderModule { }
