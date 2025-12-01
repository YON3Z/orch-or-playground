export type ExperimentMode = 'A' | 'B' | 'C' | 'D';

export interface SimulationData {
  time: number;
  value: number;
  noise: number;
  threshold: number;
}

export interface ExperimentTheory {
  title: string;
  mechanism: string;
  equation: string;
  hypothesis: string;
  citation: string;
  controls: string[];
}

export interface PhysicsParams {
  // Exp A
  propofol: number;
  temperature: number;
  // Exp B
  gravity: number;
  isolation: number;
  // Exp C
  frequency: number;
  noiseFloor: number;
  // Exp D
  microDose: number;
  doseFreq: number;
}