
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToolType, LogMessage } from '../types';
import { Trash2, Lock, Ban, HelpCircle } from 'lucide-react';

interface PrototypeViewProps {
  activeTool: ToolType;
  addLog: (text: string, type: 'info' | 'error' | 'warning') => void;
  t: (key: string) => string;
}

const PrototypeView: React.FC<PrototypeViewProps> = ({ activeTool, addLog, t }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [cubeCount, setCubeCount] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [scale, setScale] = useState(1);
  
  // CubeMind State
  const [mindText, setMindText] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [failStreak, setFailStreak] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false); // The penalty state
  
  // HintFlow State
  const [hintStage, setHintStage] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  
  // Timers
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastProgressTimeRef = useRef(Date.now());

  // --- CUBEMIND LOGIC ---

  const triggerMindSpeech = useCallback((text: string, duration: number = 3000) => {
    setIsTyping(true);
    setMindText(text); 
    setTimeout(() => {
        setIsTyping(false);
    }, 500); // Fake typing time

    setTimeout(() => {
        if (!isBlocked) setMindText(null);
    }, duration);
  }, [isBlocked]);

  // Hint Logic
  const advanceHint = useCallback(() => {
      // 4 hint stages defined in localization
      if (hintStage < 4) {
          const hintKey = `hint.stage${hintStage + 1}`;
          triggerMindSpeech(t(hintKey), 5000);
          setHintStage(prev => prev + 1);
          lastProgressTimeRef.current = Date.now(); // Reset stuck timer
          
          // Level 4 Hint: Forced Help
          if (hintStage === 3) {
              setIsHighlighting(true);
              setTimeout(() => setIsHighlighting(false), 6000);
          }
      }
  }, [hintStage, triggerMindSpeech, t]);

  const handlePainButton = () => {
      if (isBlocked) return;
      
      // Mockery
      const painLines = [
          t('cubemind.pain.1'),
          t('cubemind.pain.2'),
          t('cubemind.pain.3'),
          t('cubemind.pain.4'),
      ];
      triggerMindSpeech(painLines[Math.floor(Math.random() * painLines.length)], 2000);
      
      // Advance hint after a short delay
      setTimeout(() => {
          advanceHint();
      }, 2500);
  };

  // Check 90s stuck timer
  useEffect(() => {
      const interval = setInterval(() => {
          if (Date.now() - lastProgressTimeRef.current > 90000 && hintStage < 4 && !isBlocked) {
               addLog(t('log.stagnation'), 'info');
               advanceHint();
          }
      }, 1000);
      return () => clearInterval(interval);
  }, [hintStage, isBlocked, advanceHint, addLog, t]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isBlocked) return;

    idleTimerRef.current = setTimeout(() => {
        const idleLines = [
            t('cubemind.idle.1'),
            t('cubemind.idle.2'),
            t('cubemind.idle.3'),
            t('cubemind.idle.4')
        ];
        // Only trigger idle speech if no hint is active
        if (!mindText) {
            triggerMindSpeech(idleLines[Math.floor(Math.random() * idleLines.length)]);
        }
    }, 8000); // 8 seconds idle (AFK)
  }, [triggerMindSpeech, isBlocked, mindText, t]);

  // Reset idle timer on any interaction
  useEffect(() => {
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer(); // Start immediately
    return () => {
        window.removeEventListener('mousemove', resetIdleTimer);
        window.removeEventListener('keydown', resetIdleTimer);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  const handleCubeMindReaction = (eventType: 'fail' | 'select' | 'spam') => {
      if (isBlocked) return;

      if (eventType === 'fail') {
          const newStreak = failStreak + 1;
          setFailStreak(newStreak);

          // Check for Hint Trigger (every 3 fails)
          if (newStreak % 3 === 0 && hintStage < 4) {
              advanceHint();
              return; // Hint takes priority over random mockery
          }

          if (newStreak >= 5) {
              // PENALTY MECHANIC
              setIsBlocked(true);
              setMindText(t('cubemind.penalty.start'));
              addLog(t('ui.lockdown'), 'error');
              setTimeout(() => {
                  setIsBlocked(false);
                  setFailStreak(0);
                  setMindText(t('cubemind.penalty.end'));
                  setTimeout(() => setMindText(null), 3000);
              }, 5000);
              return;
          }

          // Aggression progression (only if no hint was triggered)
          if (newStreak % 3 !== 0) {
              if (newStreak < 3) {
                const mildLines = [
                    t('cubemind.mild.1'), t('cubemind.mild.2'), t('cubemind.mild.3'), t('cubemind.mild.4')
                ];
                triggerMindSpeech(mildLines[Math.floor(Math.random() * mildLines.length)]);
              } else {
                const aggressiveLines = [
                     t('cubemind.high.1'), t('cubemind.high.2'), t('cubemind.high.3'), t('cubemind.high.4')
                ];
                triggerMindSpeech(aggressiveLines[Math.floor(Math.random() * aggressiveLines.length)]);
              }
          }
      }
  };

  // --- GAME LOGIC ---

  const handleDeleteAttempt = () => {
    if (isBlocked) return;

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    const eventId = Math.floor(Math.random() * 5);
    
    // CubeMind reacts first
    handleCubeMindReaction('fail');

    if (eventId === 0) {
        setCubeCount(prev => Math.min(prev + 1, 8));
        addLog(t('log.regen'), 'warning');
    } else if (eventId === 1) {
        setScale(prev => prev * 0.8);
        addLog(t('log.zoom'), 'warning');
    } else if (eventId === 2) {
        setRotation({ 
            x: Math.random() * 360, 
            y: Math.random() * 360 
        });
        addLog(t('log.gimbal'), 'info');
    }
  };

  const handleCubeClick = () => {
    if (isBlocked) return;
    lastProgressTimeRef.current = Date.now(); // Reset stuck timer on interaction

    if (activeTool === ToolType.SELECT) {
        addLog(t('log.selected'), 'info');
        if (Math.random() > 0.8 && !mindText) triggerMindSpeech(t('cubemind.select'));
    } else if (activeTool === ToolType.MOVE) {
        addLog(t('log.move_fail'), 'warning');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
        triggerMindSpeech(t('cubemind.heavy'));
    } else if (activeTool === ToolType.ROTATE) {
        setRotation(prev => ({ x: prev.x + 45, y: prev.y + 45 }));
        addLog(t('log.rotate'), 'info');
    } else if (activeTool === ToolType.SCALE) {
        setScale(prev => prev === 1 ? 1.5 : 1);
        addLog(t('log.scale'), 'info');
    }
  };

  // Render multiple cubes if they multiplied
  const renderCubes = () => {
    const cubes = [];
    for (let i = 0; i < cubeCount; i++) {
        // Simple positioning logic for duplicates
        const offsetX = (i % 3) * 120 - (i > 0 ? 60 : 0); 
        const offsetY = Math.floor(i / 3) * 120;
        
        cubes.push(
            <div 
                key={i}
                className={`
                    cube-container cursor-pointer transition-all duration-300
                    ${isHighlighting ? 'animate-pulse scale-110' : ''}
                `}
                style={{
                    transform: `
                        rotateX(${rotation.x}deg) 
                        rotateY(${rotation.y}deg) 
                        scale(${scale})
                        translateX(${offsetX}px)
                        translateY(${offsetY}px)
                    `,
                }}
                onClick={handleCubeClick}
            >
                <div className={`cube-face front ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>front</div>
                <div className={`cube-face back ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>back</div>
                <div className={`cube-face right ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>right</div>
                <div className={`cube-face left ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>left</div>
                <div className={`cube-face top ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>top</div>
                <div className={`cube-face bottom ${isShaking ? 'bg-red-900/50' : ''} ${isHighlighting ? 'border-yellow-400 bg-yellow-500/20' : ''}`}>btm</div>
            </div>
        );
    }
    return cubes;
  };

  return (
    <div className="flex-1 bg-[#3a3a3a] relative overflow-hidden flex flex-col">
        {/* BLOCKER OVERLAY */}
        {isBlocked && (
            <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
                <Ban size={64} className="text-red-500 mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-red-500 mb-2">{t('ui.lockdown')}</h2>
                <p className="text-[#a5a5a5] font-mono text-center max-w-md">
                    {t('ui.locked_msg')}
                </p>
                <div className="mt-4 w-32 h-1 bg-[#333] rounded overflow-hidden">
                    <div className="h-full bg-red-500 animate-[width_5s_linear] w-full origin-left"></div>
                </div>
            </div>
        )}

        {/* Viewport Overlay UI */}
        <div className="absolute top-2 left-2 text-[#e1e1e1] text-xs space-y-1 z-10 pointer-events-none">
            <div className="bg-[#1d1d1d]/80 px-2 py-1 rounded">{t('ui.perspective')}</div>
            <div className="bg-[#1d1d1d]/80 px-2 py-1 rounded">(1) {t('ui.collection')} | {t('ui.cube')}</div>
        </div>

        <div className="absolute top-2 right-2 flex space-x-1 z-10">
            <div className="w-8 h-8 bg-[#2d2d2d] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#444]">
                <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
             <div className="w-8 h-8 bg-[#2d2d2d] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#444]">
                <div className="w-4 h-4 border border-white rounded-full"></div>
            </div>
        </div>

        {/* The 3D Scene */}
        <div className="flex-1 scene bg-gradient-to-b from-[#252525] to-[#181818] relative">
            {/* Grid Floor */}
            <div className="absolute w-[200%] h-[200%] pointer-events-none" 
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'rotateX(60deg) translateY(-200px) translateZ(-200px)',
                    opacity: 0.5
                }} 
            />
            
            <div className={`relative ${isShaking ? 'animate-[ping_0.2s_ease-in-out]' : ''}`}>
                {/* CUBEMIND SPEECH BUBBLE */}
                {mindText && (
                    <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 z-20 pointer-events-none">
                        <div className={`
                            bg-[#1d1d1d] border border-[#ea7724] text-[#e1e1e1] p-3 rounded-lg text-sm shadow-xl relative
                            ${isTyping ? 'animate-pulse' : ''}
                        `}>
                            <div className="font-bold text-[#ea7724] text-[10px] uppercase mb-1 flex justify-between">
                                <span>CubeMind AI</span>
                                {isBlocked && <Lock size={10} />}
                            </div>
                            <p className="font-mono leading-tight">{mindText}</p>
                            
                            {/* Triangle / Arrow */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 
                                border-l-[8px] border-l-transparent
                                border-r-[8px] border-r-transparent
                                border-t-[8px] border-t-[#ea7724]">
                            </div>
                        </div>
                    </div>
                )}

                {renderCubes()}
            </div>
        </div>

        {/* Viewport Footer Tools */}
        <div className="h-8 bg-[#2d2d2d] border-t border-[#111] flex items-center px-4 justify-between">
            <div className="flex space-x-4 text-xs">
                <span className="text-[#a5a5a5]">{t('tool.select')}: Left Click</span>
                <span className="text-[#a5a5a5]">{t('tool.rotate')}: Drag</span>
                <button 
                    onClick={handleDeleteAttempt}
                    disabled={isBlocked}
                    className={`
                        flex items-center space-x-1 px-2 rounded transition-colors
                        ${isBlocked 
                            ? 'opacity-50 cursor-not-allowed bg-red-900/20 text-red-500' 
                            : 'hover:text-red-400 text-[#e1e1e1] bg-[#444]'}
                    `}
                >
                    <Trash2 size={12} />
                    <span>{t('ui.delete_btn')}</span>
                </button>
            </div>

            <div className="flex items-center space-x-4">
                 <button 
                    onClick={handlePainButton}
                    disabled={isBlocked || hintStage >= 4}
                    className={`
                        flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors border border-transparent
                        ${isBlocked || hintStage >= 4
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-[#444] text-[#ea7724] hover:border-[#ea7724]'}
                    `}
                    title="I'm in pain (Ask for Hint)"
                >
                    <HelpCircle size={12} />
                    <span>{t('ui.pain_btn')}</span>
                </button>
                <div className="text-xs text-[#a5a5a5]">
                    {t('ui.objects')}: {cubeCount}/1 | {t('ui.verts')}: {8 * cubeCount}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PrototypeView;
