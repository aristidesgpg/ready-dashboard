export interface Wallet {
    type: 'metamask'|'rgn';
    address: string;
    isSelected: boolean;
}

export interface WalletProcess {
    init: boolean;
    metamask: boolean;
    rgn: boolean;
}
