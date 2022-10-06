export interface BetaTestCampaigns {
    androidTestLink: string;
    createdAt: Date;
    endDate: Date;
    gameId: string;
    id: string;
    iosTestLink: string;
    participantCount: number;
    participantLimit: number;
    signInEnabled: boolean;
    startDate: Date;
    updatedAt: Date;
}

export interface Campaign {
    androidTestLink: string;
    createdAt: number;
    endDate: number;
    gameId: string;
    id: string;
    iosTestLink: string;
    participantCount: number;
    participantLimit: number;
    reports: CampaignReports[];
    startDate: number;
    updatedAt: number;
}

export interface CampaignReports {
    campaignId: string;
    createdAt: number;
    description: string;
    title: string;
    type: 'bug'|'feedback'|'enhancement'|'ideas';
    userId: string;
}
