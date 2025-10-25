
import React from 'react';
import { Player, Team } from '../types';

interface PlayerSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (player: Player) => void;
  players: Player[];
  title: string;
  teamA: Team;
  teamB: Team;
}

const PlayerList: React.FC<{team: Team, players: Player[], onSelectPlayer: (player: Player) => void}> = ({ team, players, onSelectPlayer }) => (
    <div>
        <h3 className="text-lg font-semibold text-brand-primary mb-2 px-2">{team.name}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {players.map(player => (
                <button
                    key={player.id}
                    onClick={() => onSelectPlayer(player)}
                    className="p-3 text-center bg-gray-600 rounded-md hover:bg-brand-primary transition-colors duration-200"
                >
                    {player.name}
                </button>
            ))}
        </div>
    </div>
);

const PlayerSelectModal: React.FC<PlayerSelectModalProps> = ({ isOpen, onClose, onSelectPlayer, players, title, teamA, teamB }) => {
  if (!isOpen) return null;

  const teamAPlayers = players.filter(p => p.teamName === teamA.name);
  const teamBPlayers = players.filter(p => p.teamName === teamB.name);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
            <PlayerList team={teamA} players={teamAPlayers} onSelectPlayer={onSelectPlayer} />
            <PlayerList team={teamB} players={teamBPlayers} onSelectPlayer={onSelectPlayer} />
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelectModal;
