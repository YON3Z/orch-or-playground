import { ExperimentMode, ExperimentTheory } from './types';

export const THEORY_DATA: Record<ExperimentMode, ExperimentTheory> = {
  A: {
    title: "Anesthetic Inhibition of Superradiance",
    mechanism: "Dipole Detuning via Hydrophobic Binding",
    equation: "g²(τ) = 1 + exp(-|τ|/τ_c)",
    hypothesis: "Anesthetics act as 'Decoherence Catalysts', collapsing the collective superradiant state (g² > 1) to a classical Poissonian state (g² = 1).",
    citation: "Babcock et al. (2024), Kurian et al. (2025)",
    controls: ["Temperature (310K)", "UV Flux", "Microtubule Density"]
  },
  B: {
    title: "Gravitational Decoherence (Penrose Limit)",
    mechanism: "Space-Time Geometry Superposition",
    equation: "τ ≈ ℏ / E_G",
    hypothesis: "Biological systems suppress thermal noise long enough for Gravitational Self-Energy (E_G) to induce state reduction (The 'Conscious Moment').",
    citation: "Penrose (1996), Folman et al. (2025)",
    controls: ["Seismic Isolation (>60dB)", "Magnetic Shielding", "Microgravity"]
  },
  C: {
    title: "Bio-Magnetic Entrainment",
    mechanism: "Stochastic Resonance & CISS Rectification",
    equation: "HRV_max ∝ exp(-(f - f_Schumann)²)",
    hypothesis: "The Cardiac Binary utilizes environmental 'Zeitgebers' (7.83 Hz) to phase-lock the organism's quantum state via hemodynamic rectification.",
    citation: "Nelson (2025), McCraty (2025)",
    controls: ["Field Intensity (pT)", "Frequency Stability", "Shielding"]
  },
  D: {
    title: "Microdosing Neuroplasticity",
    mechanism: "5-HT2A Receptor Agonism & BDNF Upregulation",
    equation: "P(t) = P_0 + α · dose · exp(-dose/dose_opt)",
    hypothesis: "Sub-perceptual doses of psilocybin enhance neural plasticity and network flexibility without inducing entropic overload (hallucinations), optimizing the 'Sattvic' coherent state.",
    citation: "Cavanna et al. (2024), PMC11311906 (2024)",
    controls: ["Dose (mg)", "Frequency (Days)", "Set & Setting"]
  }
};