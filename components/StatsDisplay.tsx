
import React from 'react';
import { Match } from '../types';
import Icon from './Icon';

interface StatsDisplayProps {
  match: Match;
  onAnalyze: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ match, onAnalyze }) => {
  const getCardCount = (teamName: string, cardType: 'Yellow Card' | 'Red Card') => {
    return match.events.filter(e => e.type === cardType && e.details.player?.teamName === teamName).length;
  };
  
  const teamAStats = {
    yellows: getCardCount(match.teamA.name, 'Yellow Card'),
    reds: getCardCount(match.teamA.name, 'Red Card'),
    shots: match.events.filter(e => ['Shot On Target', 'Shot Off Target'].includes(e.type) && e.details.player?.teamName === match.teamA.name).length,
  };

  const teamBStats = {
    yellows: getCardCount(match.teamB.name, 'Yellow Card'),
    reds: getCardCount(match.teamB.name, 'Red Card'),
    shots: match.events.filter(e => ['Shot On Target', 'Shot Off Target'].includes(e.type) && e.details.player?.teamName === match.teamB.name).length,
  };

  return (
    <div className="mb-4 p-4 bg-gray-900/50 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="w-1/3 text-left">
          <h3 className="font-bold text-lg truncate">{match.teamA.name}</h3>
          <div className="flex items-center space-x-2 mt-1 text-sm">
            <span>Shots: {teamAStats.shots}</span>
            <span className="flex items-center"><Icon name="yellow-card" className="w-3 h-4 mr-1" /> {teamAStats.yellows}</span>
            <span className="flex items-center"><Icon name="red-card" className="w-3 h-4 mr-1" /> {teamAStats.reds}</span>
          </div>
        </div>
        <div className="w-1/3 text-center">
            <button
                onClick={onAnalyze}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-brand-accent hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-accent transition-colors"
            >
                <Icon name="ai-sparkles" className="w-5 h-5 mr-2" />
                AI Analysis
            </button>
        </div>
        <div className="w-1/3 text-right">
            <h3 className="font-bold text-lg truncate">{match.teamB.name}</h3>
            <div className="flex items-center justify-end space-x-2 mt-1 text-sm">
              <span>Shots: {teamBStats.shots}</span>
              <span className="flex items-center"><Icon name="yellow-card" className="w-3 h-4 mr-1" /> {teamBStats.yellows}</span>
              <span className="flex items-center"><Icon name="red-card" className="w-3 h-4 mr-1" /> {teamBStats.reds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
