
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import PrototypeView from './views/PrototypeView';
import DocsView from './views/DocsView';
import ConsolePanel from './components/ConsolePanel';
import { AppView, ToolType, LogMessage, Language } from './types';
import { TRANSLATIONS } from './localization';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.PROTOTYPE);
  const [activeTool, setTool] = useState<ToolType>(ToolType.SELECT);
  
  // Localization State - Default to 'ru'
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('app_language') as Language) || 'ru';
  });

  const [logs, setLogs] = useState<LogMessage[]>([
    { id: 0, time: new Date().toLocaleTimeString(), type: 'info', text: 'Blender 4.0.0 Alpha started' },
    { id: 1, time: new Date().toLocaleTimeString(), type: 'warning', text: 'Warning: Default Cube is unstable' },
  ]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Translation helper
  const t = useCallback((key: string): string => {
    return TRANSLATIONS[language][key] || key;
  }, [language]);

  const addLog = (text: string, type: 'info' | 'error' | 'warning' = 'info') => {
    setLogs(prev => [
      ...prev,
      { id: Date.now(), time: new Date().toLocaleTimeString(), type, text }
    ]);
  };

  // Chinese Font Class injection
  const fontFamilyClass = language === 'zh' ? 'font-sans' : 'font-sans'; 
  // Note: Tailwind 'font-sans' usually falls back to system fonts which handle Chinese well. 
  // If we wanted a specific font we'd add a style tag or class here.

  return (
    <div className={`flex flex-col h-screen w-screen bg-[#1d1d1d] text-[#e1e1e1] overflow-hidden ${fontFamilyClass}`}>
      {/* Top Menu Bar */}
      <TopBar 
        currentView={currentView} 
        setView={setView} 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <Sidebar activeTool={activeTool} setTool={setTool} t={t} />

        {/* Center Content Area */}
        <div className="flex flex-col flex-1 relative">
          
          {/* Main View Area */}
          <div className="flex-1 flex overflow-hidden relative">
            {currentView === AppView.PROTOTYPE ? (
              <PrototypeView activeTool={activeTool} addLog={addLog} t={t} />
            ) : (
              <DocsView view={currentView} />
            )}
            
            {/* Right Properties Panel (Visual Filler) */}
            <div className="w-64 bg-[#2b2b2b] border-l border-[#111] hidden md:flex flex-col text-xs">
                 {/* Outliner */}
                 <div className="h-1/3 border-b border-[#111] flex flex-col">
                    <div className="h-6 bg-[#2d2d2d] px-2 flex items-center text-[#a5a5a5]">{t('ui.collection')}</div>
                    <div className="p-2 space-y-1">
                        <div className="flex items-center space-x-2 text-white">
                            <span className="opacity-50">▼</span>
                            <span>{t('ui.collection')} 1</span>
                        </div>
                        <div className="pl-4 flex items-center space-x-2 bg-[#4772b3] rounded px-1 text-white">
                             <span className="text-[#ea7724]">cube</span>
                             <span>{t('ui.cube')}</span>
                        </div>
                    </div>
                 </div>
                 {/* Properties */}
                 <div className="flex-1 bg-[#2b2b2b] flex flex-col">
                     <div className="h-8 bg-[#2d2d2d] flex items-center px-1 space-x-1 border-b border-[#111]">
                         {[...Array(8)].map((_, i) => (
                             <div key={i} className={`w-6 h-6 rounded flex items-center justify-center ${i === 3 ? 'bg-[#3d3d3d]' : ''}`}>
                                 <div className={`w-3 h-3 rounded-sm ${i===3 ? 'bg-[#ea7724]' : 'bg-gray-500'}`}></div>
                             </div>
                         ))}
                     </div>
                     <div className="p-2 space-y-4">
                         <div>
                             <div className="mb-1 text-[#a5a5a5]">Transform</div>
                             <div className="grid grid-cols-2 gap-1 text-xs">
                                 <div className="bg-[#111] p-1 rounded border border-[#333]">Loc X: 0m</div>
                                 <div className="bg-[#111] p-1 rounded border border-[#333]">Rot X: 0°</div>
                                 <div className="bg-[#111] p-1 rounded border border-[#333]">Loc Y: 0m</div>
                                 <div className="bg-[#111] p-1 rounded border border-[#333]">Rot Y: 0°</div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
          </div>

          {/* Bottom Console/Timeline */}
          <ConsolePanel logs={logs} />
          
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <div className="h-6 bg-[#1d1d1d] border-t border-[#111] flex items-center px-2 justify-between text-[10px] text-[#a5a5a5]">
         <div className="flex space-x-4">
             <span>{t('tool.select')}</span>
             <span>Call Menu</span>
             <span>Rotate View</span>
         </div>
         <div>
             Mem: 48.2 MB | VRAM: 0.2/8.0 GB | 3.6.1
         </div>
      </div>
    </div>
  );
};

export default App;
