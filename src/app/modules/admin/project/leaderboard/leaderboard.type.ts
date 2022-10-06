export interface Leader {
    id: string;
    name: string;
    email: string;
    avatar: string;
    status: string;
    position: number;
    info: string;
}

export interface Leaderboard {
    category: 'Retential' | 'Installs' | 'ARPDAU';
    users: Leader[];
}