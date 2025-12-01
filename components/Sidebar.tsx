import React from 'react';
import { BookOpen, X } from 'lucide-react';
import { ExperimentMode } from '../types';
import { THEORY_DATA } from '../constants';

interface SidebarProps {
  activeMode: ExperimentMode;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMode, isOpen, onClose }) => {
  const info = THEORY_DATA[activeMode];

  return (
    <div 
      className={`fixed right-0 top-16 bottom-0 w-80 bg-slate-900 border-l border-slate-700 p-6 transform transition-transform duration-300 z-20 overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" /> Theory Log
        </h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-cyan-400 font-mono mb-2">HYPOTHESIS</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {info.hypothesis}
          </p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-orange-400 font-mono mb-2">GOVERNING EQUATION</div>
          <code className="text-sm font-mono text-white block bg-slate-900 p-2 rounded overflow-x-auto">
            {info.equation}
          </code>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-xs text-purple-400 font-mono mb-2">MECHANISM</div>
          <p className="text-sm text-slate-300">
            {info.mechanism}
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-bold">KEY REFERENCES</div>
          <div className="text-xs text-slate-400 italic bg-slate-900 p-3 rounded border border-slate-800">
            {info.citation}
          </div>
        </div>
      </div>
    </div>
  );
};
