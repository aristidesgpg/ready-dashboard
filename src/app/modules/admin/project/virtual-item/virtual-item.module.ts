import { NgModule } from "@angular/core";
import { AssetsManageComponent } from "./item/item.component";
import { FuseAlertModule } from "@fuse/components/alert";
import { FuseCardModule } from "@fuse/components/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { Route, RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { VirtualItemComponent } from "./virtual-item.component";
import { DialogRemoveComponent } from "./dialog/dialog-remove.component";
import { UploaderModule } from "../../components/uploader/uploader.module";
import { LoaderModule } from "../../components/loader/loader.module";

const assetsRoutes: Route[] = [
    { path: '', component: VirtualItemComponent },
    { path: 'create', component: AssetsManageComponent },
    { path: ':item', component: AssetsManageComponent },
];

@NgModule({
    declarations: [
        VirtualItemComponent,
        AssetsManageComponent,
        DialogRemoveComponent,
    ],
    imports: [
        RouterModule.forChild(assetsRoutes),
        SharedModule,
        FuseAlertModule,
        FuseCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        UploaderModule,
        LoaderModule,
    ]
})

export class AssetsModule { }
