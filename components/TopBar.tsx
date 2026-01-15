
import React from 'react';
import { AppView, Language } from '../types';
import { Settings, Play, FileCode, BookOpen, Layers, Globe } from 'lucide-react';

interface TopBarProps {
  currentView: AppView;
  setView: (v: AppView) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
}

const TopBar: React.FC<TopBarProps> = ({ currentView, setView, language, setLanguage, t }) => {
  const tabs = [
    { id: AppView.PROTOTYPE, label: 'Viewport (Play)', icon: <Play size={14} /> },
    { id: AppView.GDD, label: 'Design Doc', icon: <BookOpen size={14} /> },
    { id: AppView.LEVELS, label: 'Level Table', icon: <Layers size={14} /> },
    { id: AppView.ARCHITECTURE, label: 'Scripting', icon: <FileCode size={14} /> },
  ];

  const langs: {id: Language, label: string}[] = [
      { id: 'ru', label: 'RU' },
      { id: 'en', label: 'EN' },
      { id: 'ua', label: 'UA' },
      { id: 'de', label: 'DE' },
      { id: 'zh', label: 'ZH' },
  ];

  return (
    <div className="h-8 bg-[#1d1d1d] border-b border-[#111] flex items-center px-2 justify-between select-none">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 mr-4">
          <div className="w-5 h-5 bg-[#ea7724] rounded-sm flex items-center justify-center">
            <span className="font-bold text-black text-xs">B</span>
          </div>
          <span className="text-xs text-[#a5a5a5]">{t('ui.file')}</span>
          <span className="text-xs text-[#a5a5a5]">{t('ui.edit')}</span>
          <span className="text-xs text-[#a5a5a5]">{t('ui.render')}</span>
          <span className="text-xs text-[#a5a5a5]">{t('ui.window')}</span>
          <span className="text-xs text-[#a5a5a5]">{t('ui.help')}</span>
        </div>

        <div className="flex bg-[#111] rounded overflow-hidden">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setView(tab.id)}
                    className={`
                        px-3 py-1 text-xs flex items-center space-x-2
                        ${currentView === tab.id ? 'bg-[#3d3d3d] text-white' : 'text-[#888] hover:bg-[#2a2a2a]'}
                    `}
                >
                    {tab.icon}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-xs text-[#a5a5a5]">
        
        {/* Language Selector */}
        <div className="flex items-center space-x-1 bg-[#2d2d2d] px-2 py-0.5 rounded border border-[#333]">
            <Globe size={12} />
            <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent outline-none text-[#e1e1e1] cursor-pointer"
            >
                {langs.map(l => (
                    <option key={l.id} value={l.id} className="bg-[#2d2d2d]">{l.label}</option>
                ))}
            </select>
        </div>

        <span>Scene Collection</span>
        <span>v2.4.9</span>
        <Settings size={14} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
