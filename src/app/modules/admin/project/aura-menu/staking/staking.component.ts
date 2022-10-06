import { Component } from '@angular/core';

@Component({
    templateUrl: 'staking.component.html'
})

export class AuraStakingComponent {
    public list = [
        {
            icon: 'balance_staked_icon',
            title: 'You\'ve Staked',
            featured: '0.00',
            subtitle: 'Aura',
            soon: 'Coming Soon',
        },
        {
            icon: 'reward_icon',
            title: 'Your Aura Rewards',
            featured: '0.00',
            subtitle: 'Aura',
            soon: 'Coming Soon',
        },
    ];

    public listPlus = [
        {
            icon: 'cycle_supply_icon',
            title: null,
            featured: 'Circulating Supply',
            subtitle: null,
            soon: 'Coming Soon',
        },
        {
            icon: 'calendar_percent_icon',
            title: null,
            featured: 'APR',
            subtitle: null,
            soon: 'Coming Soon',
        },
        {
            icon: 'price_icon',
            title: null,
            featured: 'Aura Price',
            subtitle: null,
            soon: 'Token Launch Coming Soon',
        },
    ];
}
