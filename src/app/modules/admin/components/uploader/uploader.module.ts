import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxUploaderModule } from "ngx-uploader";
import { UploaderComponent } from "./uploader.component";

@NgModule({
    imports: [
        CommonModule,
        NgxUploaderModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
    declarations: [
        UploaderComponent,
    ],
    exports: [
        UploaderComponent,
    ],
})

export class UploaderModule { }
