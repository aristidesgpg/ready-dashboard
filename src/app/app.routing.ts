import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {DetailComponent} from "./modules/admin/project/detail/detail.component";

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    //{path: '', pathMatch : 'full', redirectTo: 'example'},
    //{path: '', pathMatch : 'full', redirectTo: 'project'},
    {path: '', pathMatch : 'full', redirectTo: '/project'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    //{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},
    //{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},
    //{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'project'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'welcome/aura'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        data: {
            layout: 'empty'
        },
        children   : [
            //{path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'project', loadChildren: () => import('app/modules/admin/project/project.module').then(m => m.ProjectModule)},
            //{path: 'project/:id', loadChildren: () => import('app/modules/admin/project/detail/detail.module').then(m => m.DetailModule)},
            //{ path: 'project/:id', component: DetailComponent },
        ]
    },
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            //{path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            //{path: 'project', loadChildren: () => import('app/modules/admin/project/project.module').then(m => m.ProjectModule)},
            {path: 'project/:id/dashboard', loadChildren: () => import('app/modules/admin/project/dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'project/:id/settings', loadChildren: () => import('app/modules/admin/project/detail/detail.module').then(m => m.DetailModule)},
            {path: 'project/:id/overview', loadChildren: () => import('app/modules/admin/project/overview/overview.module').then(m => m.OverviewModule)},
            {path: 'project/:id/team', loadChildren: () => import('app/modules/admin/project/team/team.module').then(m => m.TeamModule)},
            {path: 'project/:id/leaderboard', loadChildren: () => import('app/modules/admin/project/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
            {path: 'project/:id/achievements', loadChildren: () => import('app/modules/admin/project/achievements/achievements.module').then(m => m.AchievementsModule)},
            {path: 'project/:id/aura', loadChildren: () => import('app/modules/admin/project/aura-menu/aura-menu.module').then(m => m.AuraMenuModule)},
            {path: 'project/:id/beta-test', loadChildren: () => import('app/modules/admin/project/beta-test/beta-test.module').then(m => m.BetaTestModule)},
            {path: 'project/:id/fuseblock', loadChildren: () => import('app/modules/admin/project/fuseblock/fuseblock.module').then(m => m.FuseBlockModule)},
            {path: 'project/:id/stake', loadChildren: () => import('app/modules/admin/project/stake/stake.module').then(m => m.StakeModule)},
            {path: 'project/:id/program', loadChildren: () => import('app/modules/admin/project/developer-program/developer-program.module').then(m => m.DeveloperProgramModule)},
            {path: 'project/:id/wallet', loadChildren: () => import('app/modules/admin/project/wallet/wallet.module').then(m => m.WalletModule)},
            {path: 'project/:id/virtual-item', loadChildren: () => import('app/modules/admin/project/virtual-item/virtual-item.module').then(m => m.AssetsModule)},
            {path: 'project/:id/mint', loadChildren: () => import('app/modules/admin/project/mint/mint.module').then(m => m.MintModule)},
            {path: 'project/:id/reports', loadChildren: () => import('app/modules/admin/project/reports/reports.module').then(m => m.ReportsModule)},
            {path: 'project/:id/breed-craft', loadChildren: () => import('app/modules/admin/project/breed-craft/breed-craft.module').then(m => m.BreedCraftModule)},

            // {path: 'project/:id/profile', loadChildren: () => import('app/modules/admin/project/profile/profile.module').then(m => m.ProfileModule)},
            //{ path: 'project/:id', component: DetailComponent },
        ]
    },
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            //{path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            //{path: 'project', loadChildren: () => import('app/modules/admin/project/project.module').then(m => m.ProjectModule)},
            {path: 'welcome/dashboard', loadChildren: () => import('app/modules/admin/project/dashboard/dashboard.module').then(m => m.DashboardModule)},

            {path: 'welcome/leaderboard', loadChildren: () => import('app/modules/admin/project/leaderboard/leaderboard.module').then(m => m.LeaderboardModule)},
            {path: 'welcome/achievements', loadChildren: () => import('app/modules/admin/project/achievements/achievements.module').then(m => m.AchievementsModule)},
            {path: 'welcome/aura', loadChildren: () => import('app/modules/admin/project/aura-menu/aura-menu.module').then(m => m.AuraMenuModule)},
            // {path: 'welcome/profile', loadChildren: () => import('app/modules/admin/project/profile/profile.module').then(m => m.ProfileModule)},
            {path: 'welcome/sign-up-flow', loadChildren: () => import('app/modules/admin/project/developer-sign-up/developer-sign-up.module').then(m => m.DeveloperSignUpModule)},
            //{ path: 'project/:id', component: DetailComponent },
        ]
    }
];
