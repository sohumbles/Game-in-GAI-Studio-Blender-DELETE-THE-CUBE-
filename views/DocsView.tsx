import React from 'react';
import { AppView, LevelData } from '../types';
import { GDD_CONTENT, CS_SCRIPTS, LEVELS } from '../constants';
import { FileText, Cpu, Gamepad2, Database } from 'lucide-react';

interface DocsViewProps {
  view: AppView;
}

const DocsView: React.FC<DocsViewProps> = ({ view }) => {
  
  // Renderer for standard GDD
  const renderGDD = () => (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="border-b border-[#444] pb-4">
        <h1 className="text-4xl font-bold text-[#ea7724] mb-2">Game Design Document</h1>
        <p className="text-[#a5a5a5]">Project: BLENDER: DELETE THE CUBE</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xl font-semibold text-white">
          <Gamepad2 className="text-[#4772b3]" />
          <h2>Overview & Story</h2>
        </div>
        <div className="bg-[#2d2d2d] p-6 rounded-lg border border-[#444] text-sm leading-relaxed whitespace-pre-line text-[#ccc]">
          {GDD_CONTENT.summary}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xl font-semibold text-white">
          <Cpu className="text-[#4772b3]" />
          <h2>Core Mechanics</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GDD_CONTENT.mechanics.map((m, i) => (
            <li key={i} className="bg-[#2d2d2d] p-4 rounded border border-[#444] text-sm">
                <div dangerouslySetInnerHTML={{ __html: m.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#ea7724]">$1</strong>') }} />
            </li>
          ))}
        </ul>
      </section>

       <section className="space-y-4">
        <div className="flex items-center space-x-2 text-xl font-semibold text-white">
          <Database className="text-[#4772b3]" />
          <h2>Monetization</h2>
        </div>
        <div className="bg-[#2d2d2d] p-6 rounded-lg border border-[#444] text-sm space-y-2">
           {GDD_CONTENT.monetization.map((m, i) => (
               <div key={i} className="flex items-start space-x-2">
                   <span className="text-[#ea7724]">•</span>
                   <span dangerouslySetInnerHTML={{ __html: m.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
               </div>
           ))}
        </div>
      </section>
    </div>
  );

  // Renderer for Levels Table
  const renderLevels = () => (
    <div className="p-8 max-w-5xl mx-auto h-full flex flex-col">
       <div className="border-b border-[#444] pb-4 mb-6">
        <h1 className="text-3xl font-bold text-[#ea7724] mb-2">Level Design Table</h1>
        <p className="text-[#a5a5a5]">Progression and Puzzle Logic</p>
      </div>
      
      <div className="bg-[#2d2d2d] rounded-lg border border-[#444] overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1d1d1d] text-[#a5a5a5] uppercase font-mono">
            <tr>
              <th className="px-6 py-3 border-b border-[#444]">Level ID</th>
              <th className="px-6 py-3 border-b border-[#444]">Name</th>
              <th className="px-6 py-3 border-b border-[#444]">Description</th>
              <th className="px-6 py-3 border-b border-[#444]">Solution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#444]">
            {LEVELS.map((level) => (
              <tr key={level.id} className="hover:bg-[#363636] transition-colors">
                <td className="px-6 py-4 font-mono text-[#ea7724]">LVL_{level.id.toString().padStart(2, '0')}</td>
                <td className="px-6 py-4 font-semibold">{level.name}</td>
                <td className="px-6 py-4 text-[#ccc]">{level.description}</td>
                <td className="px-6 py-4 text-[#8fbc8f] italic">{level.solution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Renderer for Architecture
  const renderArchitecture = () => (
     <div className="p-4 h-full flex flex-col">
        <div className="mb-4">
             <h1 className="text-2xl font-bold text-[#ea7724]">Unity Architecture</h1>
             <p className="text-xs text-[#a5a5a5]">C# Script Visualization</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            {Object.entries(CS_SCRIPTS).map(([name, code]) => (
                <div key={name} className="flex flex-col bg-[#111] rounded border border-[#333] overflow-hidden">
                    <div className="bg-[#222] px-4 py-2 text-xs font-mono text-[#a5a5a5] border-b border-[#333] flex items-center">
                        <FileText size={12} className="mr-2 text-[#4772b3]" />
                        {name}.cs
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <pre className="font-mono text-xs text-[#dcdcaa]">
                            {code}
                        </pre>
                    </div>
                </div>
            ))}
        </div>
     </div>
  );

  return (
    <div className="flex-1 bg-[#252525] overflow-y-auto text-[#e1e1e1]">
      {view === AppView.GDD && renderGDD()}
      {view === AppView.LEVELS && renderLevels()}
      {view === AppView.ARCHITECTURE && renderArchitecture()}
    </div>
  );
};

export default DocsView;