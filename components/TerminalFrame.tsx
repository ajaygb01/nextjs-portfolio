import React from 'react';

interface TerminalFrameProps {
  title: string;
  children: React.ReactNode;
}

const TerminalFrame: React.FC<TerminalFrameProps> = ({ title, children }) => {
  return (
    <div className="border-2 border-[var(--border)] rounded-lg shadow-lg my-8 bg-[var(--bg-secondary)]">
      <div className="bg-gray-900 text-white p-2 flex items-center rounded-t-md border-b-2 border-[var(--border)]">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-grow text-center text-sm font-mono text-gray-400">{title}</div>
      </div>
      <div className="p-6 bg-black text-green-400 font-mono text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default TerminalFrame;
