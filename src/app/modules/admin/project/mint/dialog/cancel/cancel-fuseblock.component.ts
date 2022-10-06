import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NftService } from '../../../../../../core/nft/nft.service';
import { MintFuseblock } from '../../mint.type';

@Component({
    templateUrl: 'cancel-fuseblock.component.html'
})

export class MintDialogCancelFuseblockComponent {
    public isProcess: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<MintDialogCancelFuseblockComponent>,
        @Inject(MAT_DIALOG_DATA) public fuseblock: MintFuseblock,
        private readonly _snackBar: MatSnackBar,
        private readonly _nft: NftService,
    ) { }

    /**
     * Cancel the FuseBlock
     *
     * @returns void
     */
    public async cancel(): Promise<void> {
        this.isProcess = true;

        const fuseblockInstance = this._nft.fuseBlockInstance();
        const userAddress = await this._nft.getUserAddress();

        // only admin can cancel the fuseBlock;
        console.log(fuseblockInstance)

        await fuseblockInstance.methods
            .cancelFuseblock(parseInt(this.fuseblock.id))
            .send({from: userAddress})
            .on('receipt', (response: any) => {
                console.log('on response confirmation: ', response)

                this.dialogRef.close(true);
            })
            .on('error', (error: any) => {
                this.isProcess = false;
                console.log('on response error: ', error)

                return this._snackBar.open(
                    error.message ? error.message : 'Something went wrong',
                    'Ok',
                    { panelClass: ['dialog_snackbar-error'] }
                );
            });
    }
}
