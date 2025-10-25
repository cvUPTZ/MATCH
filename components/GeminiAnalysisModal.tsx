
import React, { useState, useCallback, useEffect } from 'react';
import { Match } from '../types';
import { generateMatchSummary, generatePostMatchReport } from '../services/geminiService';
import Icon from './Icon';

interface GeminiAnalysisModalProps {
  match: Match;
  onClose: () => void;
}

type AnalysisType = 'summary' | 'report';

const GeminiAnalysisModal: React.FC<GeminiAnalysisModalProps> = ({ match, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType>('summary');
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(async (type: AnalysisType) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      let result;
      if (type === 'summary') {
        result = await generateMatchSummary(match);
      } else {
        const reportJson = await generatePostMatchReport(match);
        try {
          // Format the JSON for better readability
          const parsed = JSON.parse(reportJson);
          result = `\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
        } catch(e) {
          result = "Received an invalid JSON report from the AI.";
        }
      }
      setAnalysisResult(result);
    } catch (e) {
      setError("An error occurred while generating the analysis.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [match]);
  
  useEffect(() => {
    fetchAnalysis(analysisType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisType]);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Icon name="ai-sparkles" className="w-16 h-16 text-brand-accent animate-pulse" />
          <p className="mt-4 text-lg text-gray-300">Generating AI Analysis...</p>
        </div>
      );
    }

    if (error) {
      return (
          <div className="text-center p-4 bg-red-900/50 rounded-lg">
              <p className="text-red-400">{error}</p>
          </div>
      );
    }

    if (analysisResult) {
      // Basic markdown simulation
      const formattedResult = analysisResult.split('\n').map((line, i) => {
        if(line.startsWith('```')) return null;
        if(line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>
        if(line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-3 mb-1">{line.substring(3)}</h2>
        if(line.startsWith('* ')) return <li key={i} className="ml-5 list-disc">{line.substring(2)}</li>
        return <p key={i} className="mb-2">{line}</p>
      }).filter(Boolean);
      
      if(analysisResult.includes('```json')) {
        return <pre className="bg-gray-900 p-4 rounded-md text-sm text-gray-200 overflow-x-auto whitespace-pre-wrap">{analysisResult.replace(/```json\n|```/g, '')}</pre>
      }

      return <div className="prose prose-invert max-w-none text-gray-300">{formattedResult}</div>;
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center"><Icon name="ai-sparkles" className="w-6 h-6 mr-3 text-brand-accent"/>AI Match Analysis</h2>
           <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg">
              <button onClick={() => setAnalysisType('summary')} className={`px-3 py-1 text-sm rounded-md transition-colors ${analysisType === 'summary' ? 'bg-brand-primary text-white' : 'text-gray-300 hover:bg-gray-600'}`}>Summary</button>
              <button onClick={() => setAnalysisType('report')} className={`px-3 py-1 text-sm rounded-md transition-colors ${analysisType === 'report' ? 'bg-brand-primary text-white' : 'text-gray-300 hover:bg-gray-600'}`}>Report</button>
           </div>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          {renderContent()}
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAnalysisModal;
