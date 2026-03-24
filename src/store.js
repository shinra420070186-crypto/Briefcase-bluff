import { create } from 'zustand';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameStore = create((set, get) => ({
  phase: 'lobby',
  players: [], 
  initialRoster: [],
  dealerIndex: 0,
  challengerIndex: 1,
  winStreak: 0,
  briefcaseStatus: null,
  timer: 60,
  timerRunning: false,
  intervalId: null,

  addPlayer: (name) => set((state) => {
    const newPlayer = { name, id: crypto.randomUUID() };
    const savedNames = JSON.parse(localStorage.getItem('bb_saved_names') || '[]');
    if (!savedNames.includes(name)) {
      localStorage.setItem('bb_saved_names', JSON.stringify([...savedNames, name]));
    }
    return { players: [...state.players, newPlayer] };
  }),

  removePlayer: (id) => set((state) => ({
    players: state.players.filter(p => p.id !== id)
  })),

  startGame: () => set((state) => {
    if (state.players.length < 2) return state;
    const shuffled = shuffleArray(state.players);
    return {
      players: shuffled,
      initialRoster: [...shuffled],
      dealerIndex: 0,
      challengerIndex: 1,
      winStreak: 0,
      phase: 'peek'
    };
  }),

  peekAtBriefcase: () => set(() => ({
    briefcaseStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE'
  })),

  startInterrogation: () => {
    const state = get();
    if (state.intervalId) clearInterval(state.intervalId);

    const intervalId = setInterval(() => {
      const currentState = get();
      if (currentState.timer > 0) {
        set({ timer: currentState.timer - 1 });
      } else {
        clearInterval(currentState.intervalId);
        set({ timerRunning: false });
      }
    }, 1000);

    set({ phase: 'interrogation', timer: 60, timerRunning: true, intervalId });
  },

  goToChoicePhase: () => {
    const state = get();
    if (state.intervalId) clearInterval(state.intervalId);
    set({ phase: 'choice', timerRunning: false });
  },

  makeChoice: (choice) => {
    const state = get();
    const status = state.briefcaseStatus;
    let dealerLost = false;

    if (choice === 'STEAL') {
      if (status === 'ELIMINATE') dealerLost = false;
      if (status === 'SAFE') dealerLost = true;
    } else if (choice === 'LEAVE') {
      if (status === 'ELIMINATE') dealerLost = true;
      if (status === 'SAFE') dealerLost = false;
    }

    const nextPlayers = [...state.players];
    let nextWinStreak = state.winStreak;

    if (dealerLost) {
      nextPlayers.splice(0, 1);
      nextWinStreak = 0;
    } else {
      nextPlayers.splice(1, 1);
      nextWinStreak += 1;
    }

    if (nextPlayers.length <= 1) {
      set({ phase: 'gameover', players: nextPlayers, winStreak: nextWinStreak });
    } else {
      set({ phase: 'peek', players: nextPlayers, winStreak: nextWinStreak, briefcaseStatus: null, timer: 60 });
    }
  },

  playAgain: () => set((state) => ({
    players: [...state.initialRoster],
    dealerIndex: 0,
    challengerIndex: 1,
    winStreak: 0,
    briefcaseStatus: null,
    timer: 60,
    phase: 'peek'
  }))
}));
