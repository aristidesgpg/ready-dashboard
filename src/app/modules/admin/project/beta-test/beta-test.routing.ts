import { Route } from "@angular/router";
import { BetaTestComponent } from "./beta-test.component";
import { CampaignComponent } from "./campaign/campaign.component";
import { CampaignReportComponent } from "./campaign/report/report.component";
import { CampaignResumeComponent } from "./campaign/resume/resume.component";

export const betaTestRoutes: Route[] = [
    { path: '', component: BetaTestComponent },
    {
        path: ':campaignId',
        component: CampaignComponent,
        children: [
            { path: '', redirectTo: 'resume' },
            {
                path: 'resume',
                component: CampaignResumeComponent,
                data: {
                    title: 'Resume',
                    subtitle: 'Manage your campaign',
                }
            },
            {
                path: 'reports',
                component: CampaignReportComponent,
                data: {
                    title: 'Reports',
                    subtitle: 'Manage the reports on your campaign',
                }
            },
        ]
    }
];

export const betaTestRoutesComponents = [
    BetaTestComponent,
    CampaignComponent,
    CampaignResumeComponent,
    CampaignReportComponent,
];
