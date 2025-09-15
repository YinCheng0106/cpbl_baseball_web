export interface PitchingStats {
  games: number;
  gamesStarted: number;
  gamesRelieved: number;
  completeGames: number;
  shutouts: number;
  noBaseOnBalls: number;
  wins: number;
  losses: number;
  saves: number;
  blowSaves: number;
  holds: number;
  inningsPitched: number;
  whip: number;
  era: number;
  batterFaced: number;
  numberOfPitches: number;
  hits: number;
  homeRuns: number;
  baseOnBalls: number;
  intentionalBB: number;
  hitByPitch: number;
  strikeouts: number;
  wildPitches: number;
  Balks: number;
  runs: number;
  earnedRuns: number;
  groundouts: number;
  flyOuts: number;
  groundoutFlyoutRatio: number;
}

export interface BattingStats {
  games: number | null;
  plateAppearances: number | null;
  atBats: number | null;
  runsBattedIn: number | null;
  runs: number | null;
  hits: number | null;
  singles: number | null;
  doubles: number | null;
  triples: number | null;
  homeRuns: number | null;
  totalBases: number | null;
  strikeouts: number | null;
  stolenBases: number | null;
  onBasePercentage: number | null;
  sluggingPercentage: number | null;
  battingAverage: number | null;
  groundIntoDoublePlay: number | null;
  sacrificeBunts: number | null;
  sacrificeFlies: number | null;
  baseOnBalls: number | null;
  intentionalBaseOnBalls: number | null;
  hitByPitch: number | null;
  caughtStealing: number | null;
  groundouts: number | null;
  flyOuts: number | null;
  groundoutFlyoutRatio: number | null;
  stolenBasePercentage: number | null;
  onBasePlusSlugging: number | null;
}

export interface FieldingStats {
  position: string;
  games: number;
  totalChances: number;
  putouts: number;
  assists: number;
  errors: number;
  doublePlays: number;
  triplePlays: number;
  fieldingPercentage: number;
}

export interface YearlyStats {
  teams: string;
  pitching: PitchingStats;
  batting: BattingStats;
  fielding: FieldingStats[];
}

export interface PlayerStats {
  [year: string]: YearlyStats;
}

export interface PlayerData {
  id: number;
  domestic: boolean;
  status: string;
  slug: string;
  avatar: string | null;
  banner: string | null;
  name: string;
  en_name: string;
  number: number;
  height: number;
  weight: number;
  team: string;
  league: string;
  debutDate?: Date | undefined;
  birthday: Date;
  nationality: string;
  education?: string | undefined;
  draftTeam?: string | undefined;
  draftYear?: number | undefined;
  draftRound?: number | undefined;
  position: string;
  pitchingHabits: string;
  battingHabits: string;
  followers: number;
  // stats: PlayerStats;
}
