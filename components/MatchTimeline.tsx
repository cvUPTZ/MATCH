import React from 'react';
import { MatchEvent } from '../types';
import Icon from './Icon';

interface MatchTimelineProps {
  events: MatchEvent[];
  startTime: number;
}

// FIX: Explicitly reference JSX through the React import to resolve the "Cannot find namespace 'JSX'" error.
const getEventIcon = (type: MatchEvent['type']): React.JSX.Element => {
    const iconMap: Record<MatchEvent['type'], React.ReactNode> = {
        'Goal': <Icon name="goal" className="w-5 h-5 text-brand-accent"/>,
        'Yellow Card': <Icon name="yellow-card" className="w-4 h-5" />,
        'Red Card': <Icon name="red-card" className="w-4 h-5" />,
        'Substitution': <Icon name="substitution" className="w-5 h-5 text-blue-400"/>,
        'Foul': <Icon name="foul" className="w-5 h-5 text-gray-400"/>,
        'Shot On Target': <Icon name="shot-on" className="w-5 h-5 text-green-400"/>,
        'Shot Off Target': <Icon name="shot-off" className="w-5 h-5 text-red-400"/>,
    };
    return <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-800">{iconMap[type]}</div>;
}


const EventDetail: React.FC<{ event: MatchEvent }> = ({ event }) => {
    const { player, assistingPlayer, playerIn, playerOut } = event.details;

    switch (event.type) {
        case 'Goal':
            return <p><span className="font-bold">{player?.name}</span> scores! {assistingPlayer && `(Assist: ${assistingPlayer.name})`}</p>;
        case 'Yellow Card':
        case 'Red Card':
        case 'Foul':
        case 'Shot On Target':
        case 'Shot Off Target':
            return <p><span className="font-bold">{player?.name}</span> ({player?.teamName})</p>;
        case 'Substitution':
            return <p><span className="font-bold text-green-400">IN: {playerIn?.name}</span> / <span className="text-red-400">OUT: {playerOut?.name}</span></p>;
        default:
            return null;
    }
};


const MatchTimeline: React.FC<MatchTimelineProps> = ({ events, startTime }) => {
    if (events.length === 0) {
        return (
            <div className="flex-grow flex items-center justify-center text-gray-500">
                <p>No events yet. The match is underway!</p>
            </div>
        );
    }

    const getMatchMinute = (timestamp: number) => {
        const elapsedMs = timestamp - startTime;
        return Math.floor(elapsedMs / 60000);
    }
    
    return (
        <div className="flex-grow overflow-y-auto pr-2">
            <div className="relative border-l-2 border-gray-700 ml-4">
                {events.slice().reverse().map((event, index) => (
                    <div key={event.id} className="mb-6 ml-10">
                        <span className="absolute -left-4">{getEventIcon(event.type)}</span>
                        <div className="p-3 bg-gray-700 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-1 text-sm">
                                <span className="font-semibold text-white">{event.type}</span>
                                <time className="text-xs font-normal text-gray-400 flex items-center">
                                    <Icon name="clock" className="w-3 h-3 mr-1" />
                                    {getMatchMinute(event.timestamp)}'
                                </time>
                            </div>
                            <div className="text-gray-300 text-sm">
                                <EventDetail event={event} />
                            </div>
                        </div>
                    </div>
                ))}
                 <div className="mb-6 ml-10">
                    <span className="absolute -left-4">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ring-4 ring-gray-800">
                           <Icon name="whistle" className="w-5 h-5 text-gray-300"/>
                        </div>
                    </span>
                     <div className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-400">Kick Off</p>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default MatchTimeline;