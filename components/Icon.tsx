import React from 'react';

type IconName = 'goal' | 'yellow-card' | 'red-card' | 'substitution' | 'foul' | 'shot-on' | 'shot-off' | 'ai-sparkles' | 'whistle' | 'clock';

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
  // FIX: Explicitly reference JSX through the React import to resolve the "Cannot find namespace 'JSX'" error.
  const icons: Record<IconName, React.JSX.Element> = {
    goal: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path d="M12.75 3.03v.568c0 .345.28.625.625.625h2.125c.345 0 .625-.28.625-.625v-.568a2.25 2.25 0 0 1 3.936-1.352l.243.243a.625.625 0 0 0 .884 0l.243-.243a2.25 2.25 0 0 1 3.936 1.352v.568c0 .345.28.625.625.625h.568a2.25 2.25 0 0 1 1.352 3.936l-.243.243a.625.625 0 0 0 0 .884l.243.243a2.25 2.25 0 0 1-1.352 3.936h-.568c-.345 0-.625.28-.625.625v2.125c0 .345-.28.625-.625.625h-2.125c-.345 0-.625-.28-.625-.625v-2.125c0-.345-.28-.625-.625-.625h-.568a2.25 2.25 0 0 1-3.936-1.352l-.243-.243a.625.625 0 0 0-.884 0l-.243.243a2.25 2.25 0 0 1-3.936 1.352v-.568c0-.345-.28-.625-.625-.625H4.125c-.345 0-.625.28-.625.625v.568a2.25 2.25 0 0 1-1.352-3.936l.243-.243a.625.625 0 0 0 0-.884l-.243-.243A2.25 2.25 0 0 1 2.925 8.5v-.568c0-.345.28-.625.625-.625h2.125c.345 0 .625-.28.625-.625V4.125c0-.345.28-.625.625-.625h.568a2.25 2.25 0 0 1 3.936 1.352l.243.243a.625.625 0 0 0 .884 0l.243-.243a2.25 2.25 0 0 1 1.352-3.936Z" />
      </svg>
    ),
    'yellow-card': <div className="w-full h-full bg-yellow-400 rounded-sm transform rotate-[-15deg]"></div>,
    'red-card': <div className="w-full h-full bg-red-600 rounded-sm transform rotate-[-15deg]"></div>,
    substitution: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    foul: (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    'shot-on': (
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    'shot-off': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="opacity-50">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
    'ai-sparkles': (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    whistle: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 0 0-6-6v-1.5a1.5 1.5 0 0 0-3 0v1.5a6 6 0 0 0-6 6v1.5a6 6 0 0 0 6 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5a6 6 0 0 0-6-6m0 12V3.75m0 15a6 6 0 0 1-6-6v-1.5a6 6 0 0 1 6-6m0 12a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-3 0v3a1.5 1.5 0 0 0 1.5 1.5Z" />
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  };

  return <div className={className}>{icons[name]}</div>;
};

export default Icon;