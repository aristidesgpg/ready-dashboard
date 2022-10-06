/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'project',
        title: 'Project',
        type : 'basic',
        icon : 'mat_outline:assignment',
        link : '/',
        function: () => {},
        exactMatch: true
    },{
        id   : 'overview',
        title: 'Overview',
        type : 'basic',
        icon : 'mat_outline:dashboard',
        link : '/overview'
    },{
        id   : 'dashboard',
        title: 'Analytics',
        type : 'basic',
        icon : 'mat_outline:analytics',
        link : '/dashboard'
    },{
        id: 'team',
        title: 'Team',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/team'
    },{
        id: 'leaderboards',
        title: 'Leaderboards',
        type: 'basic',
        icon: 'mat_outline:leaderboard',
        link: '/leaderboard'
    },
    {
        id: 'achievements',
        title: 'Achievements',
        type: 'basic',
        icon: 'mat_outline:emoji_events',
        link: '/achievements'
    },
    {
        id: '',
        title: 'Breed & Craft',
        type: 'basic',
        icon: 'mat_outline:build',
        link: '/breed-craft'
    },
    {
        id: 'aura',
        title: 'Aura',
        type: 'basic',
        icon: 'mat_outline:account_balance_wallet',
        link: '/aura'
    },
    {
        id: 'beta',
        title: 'Beta test',
        type: 'basic',
        icon: 'mat_outline:dashboard',
        link: '/beta-test'
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'basic',
        icon: 'mat_outline:bug_report',
        link: '/reports'
    },
    {
        id: 'fuseblock',
        title: 'Fuseblock',
        type: 'basic',
        icon: 'mat_outline:account_balance_wallet',
        link: '/fuseblock'
    },
    {
        id: 'stake',
        title: 'Stake',
        type: 'basic',
        icon: 'mat_outline:account_balance_wallet',
        link: '/stake'
    },
    {
        id: 'program',
        title: 'Dev Program',
        type: 'basic',
        icon: 'mat_outline:important_devices',
        link: '/program'
    },
    {
        id: 'wallet',
        title: 'Wallet',
        type: 'basic',
        icon: 'mat_outline:account_balance_wallet',
        link: '/wallet'
    },
    {
        id: 'virtual-item',
        title: 'Virtual Items',
        type: 'basic',
        icon: 'mat_outline:add_to_photos',
        link: '/virtual-item'
    },
    {
        id: 'mint',
        title: 'Mint',
        type: 'basic',
        icon: 'mat_outline:add_to_photos',
        link: '/mint'
    },

    // {
    //     id: 'profile',
    //     title: 'Profile',
    //     type: 'basic',
    //     icon: 'mat_outline:account_circle',
    //     link: '/profile'
    // },
];

export const preLaunchNavigation: FuseNavigationItem[] = [
    {
        id: 'developer-sign-up',
        title: 'Developer Sign Up',
        type: 'basic',
        icon: 'mat_outline:group',
        link: 'welcome/sign-up-flow',
        function: () => {},
    },
    {
        id   : 'project',
        title: 'Project',
        type : 'basic',
        icon : 'heroicons_outline:lock-closed',
    },
    {
        id: 'team',
        title: 'Team',
        type: 'basic',
        icon: 'heroicons_outline:lock-closed',
    },
    {
        id   : 'dashboard',
        title: 'Analytics',
        type : 'basic',
        icon : 'mat_outline:analytics',
        link : 'welcome/dashboard',
        function: () => {},

    },
    {
        id: 'leaderboards',
        title: 'Leaderboards',
        type: 'basic',
        icon: 'mat_outline:leaderboard',
        link: 'welcome/leaderboard',
        function: () => {},
    },
    {
        id: 'achievements',
        title: 'Achievements',
        type: 'basic',
        icon: 'mat_outline:emoji_events',
        link: 'welcome/achievements',
        function: () => {},
    },
    {
        id: 'aura',
        title: 'Aura',
        type: 'basic',
        icon: 'mat_outline:account_balance_wallet',
        link: 'welcome/aura',
        function: () => {},
    },
    // {
    //     id: 'profile',
    //     title: 'Profile',
    //     type: 'basic',
    //     icon: 'mat_outline:account_circle',
    //     link: 'welcome/profile',
    //     function: () => {},
    // },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
