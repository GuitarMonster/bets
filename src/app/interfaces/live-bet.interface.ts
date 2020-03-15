export interface LiveBet {
  id: string;
  draw: number;
  teams: [LiveBetTeam, LiveBetTeam]
}

export interface LiveBetTeam {
  name: string;
  win: number;
}