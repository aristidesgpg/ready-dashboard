import { Component, Input } from '@angular/core';

@Component({
    selector: 'ready-loader',
    template: `
        <div
            class="flex flex-col items-center"
            [ngClass]="{'text-white': theme === 'light'}"
        >
            <mat-spinner [diameter]="30" class="mx-auto"></mat-spinner>
            <small>Please wait, loading data...</small>
        </div>
    `,
    styles: [`
        :host {
            @apply w-full p-5;
        }
    `],
})

export class LoaderComponent {
    @Input() theme: 'light'|'dark' = 'light';
}
