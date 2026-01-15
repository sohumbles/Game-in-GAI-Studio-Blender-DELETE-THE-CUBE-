
export enum AppView {
  PROTOTYPE = 'PROTOTYPE',
  GDD = 'GDD',
  ARCHITECTURE = 'ARCHITECTURE',
  LEVELS = 'LEVELS'
}

export enum ToolType {
  SELECT = 'SELECT',
  CURSOR = 'CURSOR',
  MOVE = 'MOVE',
  ROTATE = 'ROTATE',
  SCALE = 'SCALE',
  TRANSFORM = 'TRANSFORM',
  ANNOTATE = 'ANNOTATE',
  MEASURE = 'MEASURE',
  ADD_CUBE = 'ADD_CUBE'
}

export interface LogMessage {
  id: number;
  time: string;
  type: 'info' | 'error' | 'warning';
  text: string;
}

export interface LevelData {
  id: number;
  name: string;
  description: string;
  solution: string;
}

export type Language = 'ru' | 'en' | 'ua' | 'de' | 'zh';

export interface TranslationDictionary {
  [key: string]: string;
}
