
import React, { useState } from 'react';

interface MatchSetupProps {
  onMatchStart: (teamAName: string, teamBName: string) => void;
}

const MatchSetup: React.FC<MatchSetupProps> = ({ onMatchStart }) => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamA.trim() && teamB.trim()) {
      onMatchStart(teamA.trim(), teamB.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-brand-primary mb-2">MatchTracker AI</h1>
        <p className="text-center text-gray-300 mb-8">Enter team names to begin tracking.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="teamA" className="block text-sm font-medium text-gray-300">Home Team</label>
            <input
              type="text"
              id="teamA"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              placeholder="e.g., Emerald Rovers"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="teamB" className="block text-sm font-medium text-gray-300">Away Team</label>
            <input
              type="text"
              id="teamB"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              placeholder="e.g., Crimson United"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-gray-100 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-primary transition-colors duration-300 disabled:opacity-50"
            disabled={!teamA.trim() || !teamB.trim()}
          >
            Start Match
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatchSetup;
