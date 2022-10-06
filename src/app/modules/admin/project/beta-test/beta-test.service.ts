import { Injectable } from "@angular/core";
import { AuthService } from "../../../../core/auth/auth.service";
import { BetaTestCampaigns } from "./beta-test.type";

@Injectable({
    providedIn: 'root'
})

export class BetaTestService {
    public campaign: any;

    constructor(
        private readonly _authService: AuthService,
    ) { }

    public async getCampaign(campaignId: string): Promise<any[]> {
        const data = { campaignId: campaignId };

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('betaTest-accessCampaignDev');

        return post(data).then(response => {
            return JSON.parse(response.data.response);
        });
    }

    public async getAllCampaigns(projectId: string): Promise<BetaTestCampaigns[]> {
        const data = { projectId: projectId };

        const post = this._authService.readymasterApp
            .functions()
            .httpsCallable('betaTest-loadCampaignDev');

        return post(data).then(response => {
            const result = JSON.parse(response.data.response);
            const now = (new Date()).valueOf();

            return result.payload.map(campaign => {
                const testersCount = campaign.participantCount || 0;
                const signInEnabled = (
                    now < campaign.endDate
                    && ( testersCount < campaign.participantLimit || campaign.participantLimit === 0)
                );

                return {
                    ...campaign,
                    signInEnabled: signInEnabled,
                    participantCount: testersCount,
                } as BetaTestCampaigns;
            });
        });
    }
}
