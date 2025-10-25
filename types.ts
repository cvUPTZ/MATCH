
export interface Player {
  id: string;
  name: string;
  teamName: string;
}

export interface Team {
  name: string;
  score: number;
  players: Player[];
}

export type EventType = 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution' | 'Foul' | 'Shot On Target' | 'Shot Off Target';

export interface MatchEvent {
  id: string;
  timestamp: number;
  type: EventType;
  details: {
    player?: Player;
    assistingPlayer?: Player;
    playerOut?: Player;
    playerIn?: Player;
    reason?: string;
  };
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  events: MatchEvent[];
  startTime: number;
}
