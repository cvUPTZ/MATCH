
import React, { useState, useCallback, useMemo } from 'react';
import { Match, MatchEvent, Player } from './types';
import MatchSetup from './components/MatchSetup';
import Header from './components/Header';
import StatsDisplay from './components/StatsDisplay';
import MatchTimeline from './components/MatchTimeline';
import ActionLogger from './components/ActionLogger';
import GeminiAnalysisModal from './components/GeminiAnalysisModal';

const App: React.FC = () => {
  const [activeMatch, setActiveMatch] = useState<Match | null>(null);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);

  const handleMatchStart = useCallback((teamAName: string, teamBName: string) => {
    // For simplicity, we're creating dummy players.
    const createPlayers = (teamName: string, count: number): Player[] =>
      Array.from({ length: count }, (_, i) => ({
        id: `${teamName.slice(0, 3).toUpperCase()}${i + 1}`,
        name: `${teamName} Player ${i + 1}`,
        teamName: teamName,
      }));

    setActiveMatch({
      id: new Date().toISOString(),
      teamA: { name: teamAName, score: 0, players: createPlayers(teamAName, 11) },
      teamB: { name: teamBName, score: 0, players: createPlayers(teamBName, 11) },
      events: [],
      startTime: Date.now(),
    });
  }, []);

  const handleLogEvent = useCallback((event: Omit<MatchEvent, 'id' | 'timestamp'>) => {
    setActiveMatch(prevMatch => {
      if (!prevMatch) return null;

      const newEvent: MatchEvent = {
        ...event,
        id: `${new Date().getTime()}-${Math.random()}`,
        timestamp: Date.now(),
      };

      const updatedMatch = { ...prevMatch, events: [...prevMatch.events, newEvent] };

      if (event.type === 'Goal' && event.details.player) {
        if (event.details.player.teamName === updatedMatch.teamA.name) {
          updatedMatch.teamA = { ...updatedMatch.teamA, score: updatedMatch.teamA.score + 1 };
        } else {
          updatedMatch.teamB = { ...updatedMatch.teamB, score: updatedMatch.teamB.score + 1 };
        }
      }
      return updatedMatch;
    });
  }, []);

  const handleEndMatch = useCallback(() => {
    // Here you could save the match data, etc.
    setActiveMatch(null);
  }, []);

  const allPlayers = useMemo(() => {
    if (!activeMatch) return [];
    return [...activeMatch.teamA.players, ...activeMatch.teamB.players];
  }, [activeMatch]);

  if (!activeMatch) {
    return <MatchSetup onMatchStart={handleMatchStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
      <Header teamA={activeMatch.teamA} teamB={activeMatch.teamB} onEndMatch={handleEndMatch} />
      <main className="flex-grow container mx-auto p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col h-[calc(100vh-200px)]">
            <StatsDisplay match={activeMatch} onAnalyze={() => setIsGeminiModalOpen(true)} />
            <MatchTimeline events={activeMatch.events} startTime={activeMatch.startTime} />
        </div>
        <div className="lg:col-span-1 bg-gray-800 rounded-xl shadow-lg p-4 h-[calc(100vh-200px)] lg:h-auto">
          <ActionLogger onLogEvent={handleLogEvent} players={allPlayers} teamA={activeMatch.teamA} teamB={activeMatch.teamB} />
        </div>
      </main>
      {isGeminiModalOpen && (
        <GeminiAnalysisModal
          match={activeMatch}
          onClose={() => setIsGeminiModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
