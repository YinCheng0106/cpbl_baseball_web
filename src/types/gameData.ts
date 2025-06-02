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

export interface GameInfo {
  id: number;
  type: string;
  time: string;
  location: string;
  home: string;
  away: string;
  awayStarter: Player;
  homeStarter: Player;
  awayWLD: TeamRecord;
  homeWLD: TeamRecord;
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

export interface GameLive {
  status: number;
  inning: number;
  inningHalf: number;
  home: TeamStats;
  away: TeamStats;
  balls: Balls;
  base: [boolean, boolean, boolean];
  onField: {
    nowPitcher: Player;
    nowBatter: Player;
  }
  scoreboard: ScoreboardType;
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

export interface GameStatus {
  pitch: PitchStats;
  defense: DefenseStats;
  hit: HitStats;
}

export interface MvpData {
  id: string;
  team: string;
  player: string;
  playerType: "打者" | "投手";
  mvpCnt: number;
  gameStatus: GameStatus;
}

export interface GameEnd {
  winPitcher: Player;
  losePitcher: Player;
  savePitcher: Player;
  mvpData: MvpData;
}

export interface GameData {
  gameInfo: GameInfo;
  gameLive: GameLive;
  gameEnd: GameEnd;
}