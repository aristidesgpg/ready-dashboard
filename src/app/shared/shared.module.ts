import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarPictureComponent} from "./avatar-picture/avatar-picture.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AvatarPictureComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarPictureComponent
    ]
})
export class SharedModule
{
}
