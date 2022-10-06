/* eslint-disable */
export const rewards = [
	{
		name: 'retentionPoints',
		displayName: 'Retention',
		total: 100,
		steps: [25, 50, 75],
		stepReward: 0.05,
		stepRewardFormat: '%',
		icon: 'retention_icon'
	},
	{
		name: 'engagementPoints',
		displayName: 'Engagement',
		total: 100,
		steps: [25, 50, 75],
		stepReward: 0.05,
		stepRewardFormat: 's',
		icon: 'engagement_icon'
	},
	{
		name: 'installsAmount',
		displayName: 'Installs',
		total: 100,
		steps: [25, 50, 75],
		stepReward: 0.05,
		stepRewardFormat: ' installs',
		icon: 'installs_icon'
	},
	// {
	// 	name: 'arpdauPoints',
	// 	displayName: 'ARPDAU',
	// 	total: 45,
	// 	steps: [15, 30, 40],
	// 	stepReward: 0.05,
	// 	stepRewardFormat: '',
	// 	icon: 'mat_outline:emoji_events'
	// },
	// {
	// 	name: 'arppuPoints',
	// 	displayName: 'ARPPU',
	// 	total: 100,
	// 	steps: [25, 50, 75],
	// 	stepReward: 0.05,
	// 	icon: 'mat_outline:emoji_events'
	// }
];

export const selfProgress = {
	retentionPoints: 100,
	engagementPoints: 50,
	installsAmount: 44,
	arpdauPoints: 20,
	arppuPoints: 50
}
