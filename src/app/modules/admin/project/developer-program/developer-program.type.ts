export interface developerProgram {
    devices: Array<formItem>;
    game_genre: Array<formItem>;
    language: Array<formItem>;
    social_network: Array<formItem>;
    web_browser: Array<formItem>;
}

export interface formItem {
    name: string;
    label: string;
    group?: string;
}
