import { VirtualItem } from "../virtual-item/virtual-item.type";

export interface MintItem extends VirtualItem {
    qty?: number;
    nft?: number;
    karma?: number;
    image?: string;
    balance?: number;
}

// Provisional data, subjected to change
interface MintMockData {
    id: string;
    name: string;
    image: string;
    qty?: number;
    karma?: number;
}

export interface MintFuseblock extends MintMockData {}
export interface MintMinted extends MintMockData {}
