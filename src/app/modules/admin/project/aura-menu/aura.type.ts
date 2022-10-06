export interface AuraInfo {
  name: string;
  info: string;
  redirectUrl?: string;
}

export interface AuraMenuType {
  category: string;
  icon: string;
  items: AuraInfo[];
  name: string;
  path: string;
}
