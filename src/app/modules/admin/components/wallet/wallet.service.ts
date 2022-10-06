import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "../../../../core/auth/auth.service";
import { DialogConnectComponent } from "./dialog/connect/connect.component";
import { Wallet } from "./wallet.type";

@Injectable({ providedIn: 'root' })
export class WalletService {
    private readonly wallet$ = new BehaviorSubject<Wallet>({
        isSelected: false,
        address: null,
        type: null,
    });

    public hasWeb3Support: boolean = false;

    constructor(
        private readonly _dialog: MatDialog,
        private readonly _authService: AuthService,
    ) {
        if (typeof window.ethereum !== 'undefined') {
            this.hasWeb3Support = true;
        }
    }

    private init(): void {
        // Initialize the wallet based on the type
        // On finish, call this.wallet$.next(data);
    }

    public getWallet(): Observable<Wallet> {
        return this.wallet$;
    }

    public setWallet(address: string, type: 'metamask'|'rgn'): void {
        this.wallet$.next({
            isSelected: true,
            type: type,
            address: address,
        });
    }

    public connectWallet(): Observable<any> {
        const dialogRef = this._dialog.open(DialogConnectComponent, {
            data: null,
            maxWidth: '600px',
            panelClass: '',
            width: '90%',
        });

        return dialogRef.afterClosed();
    }



    public async getRgnWallet(): Promise<String[]> {
        const userId = this._authService.realMasterData.userId;

        return this._authService.readymasterApp
            .firestore()
            .collection('userWallets')
            .doc(userId)
            .get().then(response => {
                console.log('Response: ', response.data())
                let data = response.data();

                if (!data) return;

                const list = [];
                Object.keys(data.wallets).forEach(item => list.push(item));

                return list;
            });
    }

    public async createRgnWallet(password: string): Promise<any> {
        const data = {
            token: this._authService.userMasterToken,
            password: password,
        };

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('create_web3_wallet');

        return post(data).then(response => {
            return response.data;
        });
    }
}
