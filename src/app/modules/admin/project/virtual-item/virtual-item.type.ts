// export interface AssetsList {
//     category: string;
//     items: AssetsItem[];
// }

// export interface AssetsItem {
//     position        : number;
//     id              : string;
//     name            : string;
//     externalLink    : string|null;
//     image           : string|null;
//     description     : string|null;
//     blockchain      : string|null;
// }

export interface VirtualItem {
    category: string;
    currency: string;
    description: string;
    image?: string;
    imageLink?: string;
    isAvailableForSale: boolean;
    isNFT: boolean;
    itemId: string;
    name: string;
    network: string;
    price: number;
    purchasableRGNAppId: string;
    subCategory: string;
    totalQuantity: number;
    purchasedQuantity: number;
}
