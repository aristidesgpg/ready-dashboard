import { Component, Input } from '@angular/core';
import { MintItem } from '../mint.type';

@Component({
    selector: 'mint-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.scss'],
})

export class MintItemComponent {
    @Input() click: boolean = false;
    @Input() item: MintItem;
    @Input() progress: boolean = false;
    @Input() quantity: boolean = true;
    @Input() image: string = 'image';
}
