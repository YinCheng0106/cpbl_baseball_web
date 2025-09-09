export interface Player {
  id: string | null;
  player: string | null;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  draws: number;
}

export interface TeamStats {
  runs: number;
  hits: number;
  errors: number;
}

export interface Balls {
  strike: number;
  ball: number;
  out: number;
  pitch: number;
}

export interface ScoreboardTeam {
  away: string;
  home: string;
}

export interface ScoreboardType {
  inning: number[];
  homeScores: number[];
  awayScores: number[];
  team: ScoreboardTeam;
  away: TeamStats;
  home: TeamStats;
}

export interface PitchStats {
  inningPitchedCnt: number;
  strikeOutCnt: number;
  runCnt: number;
}

export interface DefenseStats {
  assistCnt: number;
  putOutCnt: number;
  errorCnt: number;
}

export interface HitStats {
  hitCnt: number | null;
  runBattedInCnt: number | null;
  scoreCnt: number | null;
  homeRunCnt: number | null;
}

export interface GameStats {
  pitch: PitchStats;
  defense: DefenseStats;
  hit: HitStats;
}

export interface MvpData {
  id: string;
  team: string;
  player: string;
  playerType: "Pitcher" | "Batter";
  mvpCnt: number;
  gameStats: GameStats;
}

export interface Game {
  id: number;
  gameId: string;
  type: string;
  year: string;
  date: string;
  time: string;
  location: string;
  awayTeamId: number;
  homeTeamId: number;
  awayStarterId: number | null;
  homeStarterId: number | null;
  game_live: GameLive | null;
  game_result: GameResult | null;
}

export interface GameLive {
  id: number;
  gameId: number;
  status: number;
  inning: number;
  inningHalf: number;
  strike: number;
  ball: number;
  out: number;
  pitch: number;
  base1: boolean;
  base2: boolean;
  base3: boolean;
  nowPitcherId: number | null;
  nowBatterId: number | null;
  homeRuns: number;
  homeHits: number;
  homeErrors: number;
  awayRuns: number;
  awayHits: number;
  awayErrors: number;
}

export interface GameResult {
  winPitcherId: number | null;
  losePitcherId: number | null;
  savePitcherId: number | null;
  mvpId: number | null;
  mvpType: "Pitcher" | "Batter" | null;
  mvpCnt: number | null;
  pitchInning: number | null;
  pitchStrikeout: number | null;
  pitchRuns: number | null;
  defAssist: number | null;
  defPutout: number | null;
  defError: number | null;
  hitCnt: number | null;
  hitRbi: number | null;
  hitScore: number | null;
  hitHomerun: number | null;
}

export interface GameScore {
  gameId: number;
  inning: number;
  awayScore: number;
  homeScore: number;
}