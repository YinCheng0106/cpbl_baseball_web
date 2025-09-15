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
  id: number;
  teamId: number;
  year: string;
  season: string;
  games: number;
  homeWins: number;
  homeLosses: number;
  homeDraws: number;
  awayWins: number;
  awayLosses: number;
  awayDraws: number;
  streak: number;
}

export interface TeamPlayer {
  major: string[];
  minor: string[];
}

export interface Team {
  id: number;
  logo: string;
  name: TeamName;
  generalManager: GeneralManager;
  manager: Manager;
  stadium: string;
  website: string;
  fax: string;
  email: string;
  address: string;
  addressEN: string;
  telephone: string;
  teams_stats: TeamStats[];
  coach: TeamPlayer;
  pitcher: TeamPlayer;
  catcher: TeamPlayer;
  infielder: TeamPlayer;
  outfielder: TeamPlayer;
}
