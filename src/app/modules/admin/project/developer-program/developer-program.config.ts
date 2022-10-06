import { developerProgram, formItem } from "./developer-program.type";

const game_genre: formItem[] = [
    { name: 'action', label: 'Action' },
    { name: 'arcade', label: 'Arcade' },
    { name: 'battle_royale', label: 'Battle Royale' },
    { name: 'card_games', label: 'Card Games' },
    { name: 'casino', label: 'Casino' },
    { name: 'casual', label: 'Casual' },
    { name: 'competition', label: 'Competition' },
    { name: 'mmo', label: 'MMO' },
    { name: 'moba', label: 'Moba' },
    { name: 'puzzles', label: 'Puzzles' },
    { name: 'racing', label: 'Racing' },
    { name: 'role_playing', label: 'Role Playing' },
    { name: 'simulation', label: 'Simulation' },
    { name: 'ville', label: 'Ville' },
];

const language: formItem[] = [
    { name: 'english', label: 'English' },
    { name: 'french', label: 'French' },
    { name: 'german', label: 'German' },
    { name: 'spanish', label: 'Spanish' },
    { name: 'japanese', label: 'Japanese' },
    { name: 'chinese', label: 'Chinese' },
    { name: 'portuguese', label: 'Portuguese' },
    { name: 'arabic', label: 'Arabic' },
];

const web_browser: formItem[] = [
    { name: 'chrome', label: 'Chrome' },
    { name: 'firefox', label: 'Firefox' },
    { name: 'safari', label: 'Safari' },
    { name: 'opera', label: 'Opera' },
    { name: 'edge', label: 'Edge' },
];

const social_network: formItem[] = [
    { name: 'facebook', label: 'Facebook' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'linkedin', label: 'LinkedIn' },
    { name: 'pintrest', label: 'Pintrest' },
    { name: 'instagram', label: 'Instagram' },
    { name: 'tiktok', label: 'TikTok' },
    { name: 'telegram', label: 'Telegram' },
];

const devices: formItem[] = [
    { name: 'mac', label: 'Mac', group: 'computer' },
    { name: 'windows', label: 'Windows', group: 'computer' },
    { name: 'android', label: 'Android', group: 'smartphone' },
    { name: 'iphone', label: 'Iphone', group: 'smartphone' },
    { name: 'windows', label: 'Windows Phone', group: 'smartphone' },
    { name: 'android', label: 'Android', group: 'tablet' },
    { name: 'ipad', label: 'Ipad', group: 'tablet' },
    { name: 'windows', label: 'Windows Phone', group: 'tablet' },
    { name: 'vr', label: 'VR Equipment', group: 'other' },
    { name: 'handheld', label: 'Handheld game console', group: 'other' },
    { name: 'homegame', label: 'Home game console', group: 'other' },
    { name: 'smarttv', label: 'Smart Tv (built-in apps)', group: 'other' },
    { name: 'streamtv', label: 'Stream Tv Box (roku, apple tv, etc)', group: 'other' },
];

export const devProgram: developerProgram = {
    game_genre: game_genre,
    language: language,
    social_network: social_network,
    web_browser: web_browser,
    devices: devices,
}
