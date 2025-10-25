
import React from 'react';
import { Team } from '../types';

interface HeaderProps {
  teamA: Team;
  teamB: Team;
  onEndMatch: () => void;
}

const Header: React.FC<HeaderProps> = ({ teamA, teamB, onEndMatch }) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-brand-primary">MatchTracker AI</div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <span className="hidden md:inline text-lg font-semibold text-right text-gray-100">{teamA.name}</span>
          <span className="text-3xl font-bold text-white bg-gray-700 px-4 py-1 rounded-lg">
            {teamA.score} - {teamB.score}
          </span>
          <span className="hidden md:inline text-lg font-semibold text-left text-gray-100">{teamB.name}</span>
        </div>
        <button
          onClick={onEndMatch}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          End Match
        </button>
      </div>
       <div className="md:hidden flex justify-between items-center px-4 pb-2 text-sm font-semibold">
          <span className="text-gray-100 flex-1 text-left truncate">{teamA.name}</span>
          <span className="text-gray-100 flex-1 text-right truncate">{teamB.name}</span>
       </div>
    </header>
  );
};

export default Header;
