import { Route } from "@angular/router";
import { AuraMenuComponent } from "./aura-menu.component";
import { AuraComponent } from "./aura/aura.component";
import { AuraFuseblockComponent } from "./fuseblock/fuseblock.component";
import { AuraGovernComponent } from "./govern/govern.component";
import { AuraStakingComponent } from "./staking/staking.component";

export const auraMenuRoutes: Route[] = [
    {
        path: '',
        component: AuraMenuComponent,
        children: [
            {
                path: '',
                redirectTo: 'aura',
                pathMatch: 'full'
            },
            {
                path: 'aura',
                component: AuraComponent,
                data: {
                    title: 'Aura Menu',
                    subtitle: 'Manage your Aura and Fuseblocks.',
                }
            },
            {
                path: 'staking',
                component: AuraStakingComponent,
                data: {
                    title: 'Staking Menu',
                    subtitle: 'Manage your Aura Stakings.',
                }
            },
            {
                path: 'govern',
                component: AuraGovernComponent,
                data: {
                    title: 'Governance',
                    subtitle: 'Stake Aura to vote on network direction.',
                }
            },
            {
                path: 'fuseblocks',
                component: AuraFuseblockComponent,
                data: {
                    title: 'Fuseblocks',
                    subtitle: 'Manage your Fuseblocks and mint NFT items.',
                }
            }
        ],
    }
];

export const auraMenuRoutesComponents = [
    AuraMenuComponent,
    AuraComponent,
    AuraFuseblockComponent,
    AuraGovernComponent,
    AuraStakingComponent,
];
