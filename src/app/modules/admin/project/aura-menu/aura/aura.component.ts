import { Component } from '@angular/core';

@Component({
    templateUrl: 'aura.component.html'
})

export class AuraComponent {
    public list = [
        {
            isHover: false,
            icon: 'balance_icon',
            title: 'Current Balance',
            number: '10',
            subtitle: 'Aura tokens',
            link_href: null,
            link_label: null,
            button_link: null,
            button_label: null,
        },
        {
            isHover: false,
            icon: 'balance_unvested_icon',
            title: 'Unvested Balance',
            number: '100',
            subtitle: 'Aura tokens',
            link_href: null,
            link_label: null,
            button_link: null,
            button_label: null,
        },
        {
            isHover: false,
            icon: 'calendar_icon',
            title: 'Next Vesting Date',
            number: '10/20/2022',
            subtitle: null,
            link_href: '#',
            link_label: 'See full vesting schedule',
            button_link: null,
            button_label: null,
        },
        {
            isHover: false,
            icon: 'calendar_vest_icon',
            title: 'Next Vest',
            number: '10',
            subtitle: 'Aura tokens',
            link_href: null,
            link_label: null,
            button_link: null,
            button_label: null,
        },
    ];

    public listClaim = [
        {
            isHover: true,
            icon: 'cycle_user_icon',
            title: 'Network Leaderboard: Retention',
            number: '1',
            subtitle: 'Aura tokens',
            link_href: null,
            link_label: null,
            button_link: '#',
            button_label: 'Claim',
        },
        {
            isHover: true,
            icon: 'refer_icon',
            title: 'Referred a Member',
            number: '0.05',
            subtitle: 'Aura tokens',
            link_href: null,
            link_label: null,
            button_link: '#',
            button_label: 'Claim',
        },
        {
            isHover: true,
            icon: 'install_icon',
            title: 'Install Game Achievement',
            number: '0.01',
            subtitle: 'Aura Token',
            link_href: null,
            link_label: null,
            button_link: '#',
            button_label: 'Claim',
        },
    ];
}
