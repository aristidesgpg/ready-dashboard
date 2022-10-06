export interface NFT {
    token_address: string,
    token_id: string,
    token_uri: string,
}

export interface NFTResponse {
    result : NFT[]
}

export interface NFTMetadata {
    description: string,
    name: string,
    image_url: string
}
