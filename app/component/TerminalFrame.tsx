import React from 'react';

interface TerminalFrameProps {
  title: string;
  children: React.ReactNode;
}

const TerminalFrame: React.FC<TerminalFrameProps> = ({ title, children }) => {
  return (
    <div className="border border-[var(--border)] rounded-lg shadow-lg overflow-hidden w-full my-8">
      <div className="bg-[rgba(255,255,255,0.05)] text-[var(--muted)] px-4 py-2 flex items-center border-b border-[var(--border)]">
        <div className="flex space-x-2 mr-4">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <div className="text-sm">{title}</div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default TerminalFrame;
