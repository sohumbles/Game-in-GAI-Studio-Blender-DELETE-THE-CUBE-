
import React from 'react';
import { ToolType } from '../types';
import { 
  MousePointer2, 
  Move, 
  RotateCw, 
  Maximize2, 
  Box, 
  PenTool, 
  Ruler, 
  PlusSquare 
} from 'lucide-react';

interface SidebarProps {
  activeTool: ToolType;
  setTool: (t: ToolType) => void;
  t: (key: string) => string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setTool, t }) => {
  const tools = [
    { id: ToolType.SELECT, icon: <MousePointer2 size={18} />, label: t('tool.select') },
    { id: ToolType.CURSOR, icon: <Box size={18} className="border-dashed border rounded-sm" />, label: t('tool.cursor') },
    { id: ToolType.MOVE, icon: <Move size={18} />, label: t('tool.move') },
    { id: ToolType.ROTATE, icon: <RotateCw size={18} />, label: t('tool.rotate') },
    { id: ToolType.SCALE, icon: <Maximize2 size={18} />, label: t('tool.scale') },
    { id: ToolType.TRANSFORM, icon: <Box size={18} />, label: t('tool.transform') },
    { id: ToolType.ANNOTATE, icon: <PenTool size={18} />, label: t('tool.annotate') },
    { id: ToolType.MEASURE, icon: <Ruler size={18} />, label: t('tool.measure') },
    { id: ToolType.ADD_CUBE, icon: <PlusSquare size={18} />, label: t('tool.add_cube') },
  ];

  return (
    <div className="w-10 bg-[#2b2b2b] border-r border-[#111] flex flex-col items-center py-2 space-y-1">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setTool(tool.id)}
          title={tool.label}
          className={`
            w-8 h-8 flex items-center justify-center rounded-sm transition-colors
            ${activeTool === tool.id ? 'bg-[#4772b3] text-white' : 'text-[#a5a5a5] hover:bg-[#444] hover:text-white'}
          `}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
