// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Angular Material
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// Components
import { WalletComponent } from "./wallet/wallet.component";
import { DialogConnectComponent } from "./dialog/connect/connect.component";

@NgModule({
    imports: [
        // Angular
        CommonModule,
        ReactiveFormsModule,

        // Angular Material
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ],
    declarations: [
        WalletComponent,
        DialogConnectComponent,
    ],
    exports: [
        WalletComponent,
        DialogConnectComponent,
    ],
})

export class WalletModule { }
