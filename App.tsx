import React, { useState, useEffect, useRef } from 'react';
import { Sigma, BookOpen, Play, Pause } from 'lucide-react';
import { ExperimentMode, PhysicsParams, SimulationData } from './types';
import { PhysicsKernel } from './services/physicsEngine';
import { Sidebar } from './components/Sidebar';
import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';

export default function App() {
  const [activeMode, setActiveMode] = useState<ExperimentMode>('A');
  const [isRunning, setIsRunning] = useState(false);
  const [showTheory, setShowTheory] = useState(true);
  
  const [data, setData] = useState<SimulationData[]>([]);
  
  const [params, setParams] = useState<PhysicsParams>({
    // Exp A
    propofol: 0,
    temperature: 310,
    // Exp B
    gravity: 1.0,
    isolation: 50,
    // Exp C
    frequency: 1.0,
    noiseFloor: 0.2
  });

  // Ref to hold current params for the animation loop
  // This avoids re-creating the loop on every slider change
  const paramsRef = useRef(params);
  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  // Handle switching modes
  const handleModeChange = (mode: ExperimentMode) => {
    setActiveMode(mode);
    setData([]); // Clear data on mode switch
    setIsRunning(false); // Stop simulation
  };

  // Simulation Loop
  useEffect(() => {
    let frameId: number;
    
    const simulate = () => {
      if (!isRunning) return;
      
      const timestamp = Date.now();
      const newPoint = PhysicsKernel.tick(timestamp, activeMode, paramsRef.current);
      
      setData(prev => {
        const newData = [...prev, newPoint];
        // Keep last 60 points for a smooth ~1-2 sec scrolling window at 60fps
        return newData.slice(-60); 
      });

      frameId = requestAnimationFrame(simulate);
    };

    if (isRunning) {
      frameId = requestAnimationFrame(simulate);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isRunning, activeMode]);

  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-slate-900 font-bold">
              <Sigma className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Coherence<span className="text-cyan-400">Protocol</span> Lab</span>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-1">
            {(['A', 'B', 'C'] as ExperimentMode[]).map((mode) => (
              <button 
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeMode === mode 
                    ? mode === 'A' ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25' 
                      : mode === 'B' ? 'bg-orange-500 text-slate-900 shadow-lg shadow-orange-500/25'
                      : 'bg-pink-500 text-slate-900 shadow-lg shadow-pink-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'A' ? 'Exp A: Superradiance' : mode === 'B' ? 'Exp B: Gravity' : 'Exp C: Entrainment'}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowTheory(!showTheory)}
            className={`p-2 rounded-lg border transition-all ${showTheory ? 'bg-slate-700 border-slate-600 text-white' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
          >
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MOBILE NAV (Visible only on small screens) */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-slate-800 flex justify-between gap-2 overflow-x-auto">
         {(['A', 'B', 'C'] as ExperimentMode[]).map((mode) => (
            <button 
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-bold transition-all ${
                activeMode === mode 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-500 bg-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
      </div>

      {/* MAIN CONTENT */}
      <main className={`flex-1 max-w-7xl mx-auto w-full p-6 transition-all duration-300 ${showTheory ? 'lg:pr-80' : ''}`}>
        
        {/* GLOBAL CONTROLS */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {activeMode === 'A' && "Experiment A: Anesthetic Inhibition"}
              {activeMode === 'B' && "Experiment B: Gravitational Decoherence"}
              {activeMode === 'C' && "Experiment C: Bio-Magnetic Entrainment"}
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
              {activeMode === 'A' && "Testing the hypothesis that consciousness requires collective superradiance in Tryptophan networks."}
              {activeMode === 'B' && "Isolating the Gravitational Self-Energy (E_G) term by removing thermal and seismic noise."}
              {activeMode === 'C' && "Validating the 'Cardiac Binary' entrainment via Earth-Ionosphere resonance frequencies."}
            </p>
          </div>
          
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all w-full sm:w-auto justify-center ${
              isRunning 
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20' 
                : 'bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500/20'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'PAUSE' : 'START SIMULATION'}
          </button>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* VISUALIZATION PANEL */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl h-[400px] lg:h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase">Real-Time Data Stream</h3>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                <span className="text-xs text-slate-500 font-mono">{isRunning ? 'LIVE' : 'OFFLINE'}</span>
              </div>
            </div>
            
            <Visualizer 
              data={data} 
              mode={activeMode} 
              isRunning={isRunning} 
            />
          </div>

          {/* CONTROL PANEL */}
          <div className="lg:col-span-4">
             <Controls 
               mode={activeMode} 
               params={params} 
               setParams={setParams} 
               currentValue={data.length > 0 ? data[data.length - 1].value : 0} 
             />
          </div>
        </div>

        <Sidebar 
          activeMode={activeMode} 
          isOpen={showTheory} 
          onClose={() => setShowTheory(false)} 
        />
        
      </main>
    </div>
  );
}
