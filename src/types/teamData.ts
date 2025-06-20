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

export interface yearstats {
  firstHalf: halfSeasonData;
  secondHalf: halfSeasonData;
}

export interface Teamstats {
  [year: string]: yearstats;
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
  stats: Teamstats;
}
