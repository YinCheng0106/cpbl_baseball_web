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

export interface Stadium {
  code: string;
  name: TeamName;
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

export interface yearStatus {
  firstHalf: halfSeasonData;
  secondHalf: halfSeasonData;
}

export interface TeamStatus {
  [year: string]: yearStatus;
}

export interface TeamData {
  id: number;
  logo: string;
  name: TeamName;
  generalManager: GeneralManager;
  manager: Manager;
  stadium: Stadium;
  website: string;
  contact: Contact;
  status: TeamStatus;
}