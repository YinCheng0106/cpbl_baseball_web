export interface TeamName {
  "zh-tw": string;
  en: string;
}

export interface PersonName {
  "zh-tw": string;
  en: string;
}

export interface GeneralManager {
  name: PersonName;
}

export interface Manager {
  id: string;
  name: PersonName;
}

export interface Address {
  "zh-tw": string;
  en: string;
}

export interface Contact {
  email: string;
  telephone: string;
  fax: string;
  address: Address;
}

export interface homeAwayWLD {
  home: number;
  away: number;
}

export interface halfSeasonData {
  games: number;
  wins: homeAwayWLD;
  losses: homeAwayWLD;
  draws: homeAwayWLD;
}

export interface yearStats {
  firstHalf: halfSeasonData;
  secondHalf: halfSeasonData;
}

export interface TeamStats {
  [year: string]: yearStats;
}

export interface TeamPlayer {
  major: string[];
  minor: string[];
}

export interface TeamData {
  id: number;
  logo: string;
  name: TeamName;
  generalManager: GeneralManager;
  manager: Manager;
  stadium: string;
  website: string;
  contact: Contact;
  stats: TeamStats;
  coach: TeamPlayer;
  pitcher: TeamPlayer;
  catcher: TeamPlayer;
  infielder: TeamPlayer;
  outfielder: TeamPlayer;
}
