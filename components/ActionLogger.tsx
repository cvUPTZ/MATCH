
import React, { useState } from 'react';
import { Player, Team, EventType, MatchEvent } from '../types';
import Icon from './Icon';
import PlayerSelectModal from './PlayerSelectModal';

interface ActionLoggerProps {
  onLogEvent: (event: Omit<MatchEvent, 'id' | 'timestamp'>) => void;
  players: Player[];
  teamA: Team;
  teamB: Team;
}

type ActionState = {
  type: EventType;
  step: 'player' | 'assist' | 'playerIn' | 'playerOut';
  payload: Partial<MatchEvent['details']>;
} | null;

const eventTypes: { name: EventType; icon: React.ComponentProps<typeof Icon>['name'] }[] = [
  { name: 'Goal', icon: 'goal' },
  { name: 'Shot On Target', icon: 'shot-on' },
  { name: 'Shot Off Target', icon: 'shot-off' },
  { name: 'Yellow Card', icon: 'yellow-card' },
  { name: 'Red Card', icon: 'red-card' },
  { name: 'Foul', icon: 'foul' },
  { name: 'Substitution', icon: 'substitution' },
];

const ActionLogger: React.FC<ActionLoggerProps> = ({ onLogEvent, players, teamA, teamB }) => {
  const [actionState, setActionState] = useState<ActionState>(null);

  const handleActionClick = (type: EventType) => {
    if (type === 'Substitution') {
      setActionState({ type, step: 'playerOut', payload: {} });
    } else {
      setActionState({ type, step: 'player', payload: {} });
    }
  };

  const handlePlayerSelect = (player: Player) => {
    if (!actionState) return;

    const { type, step, payload } = actionState;

    if (step === 'player') {
      const newPayload = { ...payload, player };
      if (type === 'Goal') {
        setActionState({ type, step: 'assist', payload: newPayload });
      } else {
        onLogEvent({ type, details: newPayload });
        setActionState(null);
      }
    } else if (step === 'assist') {
      onLogEvent({ type, details: { ...payload, assistingPlayer: player } });
      setActionState(null);
    } else if (step === 'playerOut') {
      setActionState({ type, step: 'playerIn', payload: { ...payload, playerOut: player } });
    } else if (step === 'playerIn') {
        onLogEvent({ type, details: { ...payload, playerIn: player } });
        setActionState(null);
    }
  };

  const handleModalClose = () => {
    if (actionState && actionState.type === 'Goal' && actionState.step === 'assist') {
      // If user closes modal on assist selection, log goal without assist
      onLogEvent({ type: actionState.type, details: actionState.payload });
    }
    setActionState(null);
  };
  
  const getModalTitle = () => {
    if (!actionState) return '';
    const { type, step } = actionState;
    if (step === 'player') return `Who was involved in the ${type}?`;
    if (step === 'assist') return 'Who assisted the goal? (Optional)';
    if (step === 'playerOut') return 'Select Player Coming OFF';
    if (step === 'playerIn') return 'Select Player Coming ON';
    return '';
  }
  
  const getPlayersForStep = () => {
    if (!actionState) return [];
    if (actionState.step === 'playerIn') {
        // Exclude player who went out
        return players.filter(p => p.id !== actionState.payload.playerOut?.id);
    }
    return players;
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center text-gray-300">Log Action</h2>
      <div className="grid grid-cols-2 gap-3">
        {eventTypes.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleActionClick(name)}
            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg shadow-md hover:bg-brand-primary hover:text-white transition-all duration-200 aspect-square"
          >
            <Icon name={icon} className="w-8 h-8 mb-2" />
            <span className="text-sm font-semibold">{name}</span>
          </button>
        ))}
      </div>
      {actionState && (
        <PlayerSelectModal
          isOpen={!!actionState}
          onClose={handleModalClose}
          onSelectPlayer={handlePlayerSelect}
          players={getPlayersForStep()}
          title={getModalTitle()}
          teamA={teamA}
          teamB={teamB}
        />
      )}
    </>
  );
};

export default ActionLogger;
