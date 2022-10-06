export interface RewardType {
  name: string;
  displayName: string;
  total: number;
  steps: number[];
  stepReward: number;
  stepRewardFormat: string;
  icon: string;
}

export interface Progress {
  retentionPoints: number;
  engagementPoints: number;
  installsAmount: number;
  arpdauPoints: number;
  arppuPoints: number;
}