
import { GoogleGenAI, Type } from "@google/genai";
import { Match, MatchEvent } from '../types';

const getMatchMinute = (eventTimestamp: number, matchStartTime: number): string => {
  const elapsedMs = eventTimestamp - matchStartTime;
  const minutes = Math.floor(elapsedMs / 60000);
  return `${minutes}'`;
};

const formatEventsForPrompt = (match: Match): string => {
  return match.events
    .map((event) => {
      const minute = getMatchMinute(event.timestamp, match.startTime);
      let eventString = `${minute} - ${event.type}`;
      if (event.details.player) eventString += ` by ${event.details.player.name} (${event.details.player.teamName})`;
      if (event.details.assistingPlayer) eventString += `, assisted by ${event.details.assistingPlayer.name}`;
      if (event.type === 'Substitution' && event.details.playerOut && event.details.playerIn) {
        eventString = `${minute} - Substitution for ${event.details.playerOut.teamName}: ${event.details.playerIn.name} IN, ${event.details.playerOut.name} OUT`;
      }
      return eventString;
    })
    .join('\n');
};

export const generateMatchSummary = async (match: Match): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set up your environment.";
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const eventLog = formatEventsForPrompt(match);
    const prompt = `
      You are a world-class football commentator.
      Based on the following event log for a match between ${match.teamA.name} and ${match.teamB.name},
      write an engaging and dramatic summary of the match.
      The final score was ${match.teamA.name} ${match.teamA.score} - ${match.teamB.score} ${match.teamB.name}.

      Event Log:
      ${eventLog}

      Please provide the summary in markdown format.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating match summary:", error);
    return "Failed to generate summary. Please check the console for details.";
  }
};

export const generatePostMatchReport = async (match: Match): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API key not configured. Please set up your environment.";
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const eventLog = formatEventsForPrompt(match);
    const prompt = `
      Analyze the following football match event log between ${match.teamA.name} and ${match.teamB.name} and generate a structured report.
      The final score was ${match.teamA.name} ${match.teamA.score} - ${match.teamB.score} ${match.teamB.name}.
      
      Event Log:
      ${eventLog}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyMoments: {
              type: Type.ARRAY,
              description: "List of the 3-5 most influential moments of the match.",
              items: {
                type: Type.OBJECT,
                properties: {
                  minute: { type: Type.STRING, description: "The minute the event occurred." },
                  description: { type: Type.STRING, description: "A brief description of the moment." },
                }
              }
            },
            playerOfTheMatch: {
              type: Type.OBJECT,
              description: "The player who had the most impact on the game.",
              properties: {
                name: { type: Type.STRING },
                team: { type: Type.STRING },
                reason: { type: Type.STRING, description: "Justification for the selection." },
              }
            },
            tacticalAnalysis: {
              type: Type.STRING,
              description: "A brief tactical overview of how the match was won and lost."
            }
          }
        },
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating post-match report:", error);
    return JSON.stringify({ error: "Failed to generate report. Please check the console for details." });
  }
};
