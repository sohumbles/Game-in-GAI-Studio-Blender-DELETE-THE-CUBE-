import React from 'react';
import { LogMessage } from '../types';

interface ConsolePanelProps {
  logs: LogMessage[];
}

const ConsolePanel: React.FC<ConsolePanelProps> = ({ logs }) => {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-48 bg-[#181818] border-t border-[#111] flex flex-col font-mono text-xs">
      <div className="h-6 bg-[#2d2d2d] flex items-center px-2 space-x-2 border-b border-[#111]">
        <span className="text-[#a5a5a5]">Console</span>
        <span className="bg-[#111] px-2 py-0.5 rounded text-[#ea7724]">Python Interactive</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="text-[#a5a5a5]">
            Python 3.10.2 (main, Jan 14 2024, 12:00:00) [MSC v.1916 64 bit (AMD64)] on win32
            <br/>Type "help", "copyright", "credits" or "license" for more information.
            <br/>bpy.context.space_data.system_bookmarks_active = 1
        </div>
        {logs.map((log) => (
          <div key={log.id} className="flex space-x-2">
            <span className="text-[#555] select-none">[{log.time}]</span>
            <span className={`${
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'warning' ? 'text-yellow-400' : 'text-[#ccc]'
            }`}>
              {log.type === 'error' && 'Error: '}
              {log.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
        <div className="flex items-center text-[#a5a5a5]">
            <span className="mr-2 text-[#4772b3]">{`>>>`}</span>
            <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default ConsolePanel;