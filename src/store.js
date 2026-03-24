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
  phase: 'lobby', // lobby, peek, interrogation, choice, resolution, gameover
  players: [], 
  initialRoster: [],
  winStreak: 0,
  briefcaseStatus: null,
  timer: 60,
  timerRunning: false,
  intervalId: null,
  eliminationResult: null, // Stores who lost during resolution

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
      winStreak: 0,
      phase: 'peek',
      briefcaseStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE'
    };
  }),

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
    const dealer = state.players[0];
    const challenger = state.players[1];
    
    let dealerLost = false;

    // Strict Rule Execution
    if (choice === 'STEAL') {
      if (status === 'ELIMINATE') dealerLost = false; // Challenger Eliminated
      if (status === 'SAFE') dealerLost = true;       // Dealer Eliminated
    } else if (choice === 'LEAVE') {
      if (status === 'ELIMINATE') dealerLost = true;  // Dealer Eliminated
      if (status === 'SAFE') dealerLost = false;      // Challenger Eliminated
    }

    set({ 
      phase: 'resolution', 
      eliminationResult: {
        loser: dealerLost ? dealer : challenger,
        winner: dealerLost ? challenger : dealer,
        dealerLost,
        choice
      }
    });
  },

  nextRound: () => {
    const state = get();
    const nextPlayers = [...state.players];
    let nextWinStreak = state.winStreak;

    // The Winner stays as Dealer (index 0). Loser is deleted. Queue shifts up.
    if (state.eliminationResult.dealerLost) {
      nextPlayers.splice(0, 1); // Delete Dealer
      nextWinStreak = 0;        // Challenger becomes Dealer, streak resets
    } else {
      nextPlayers.splice(1, 1); // Delete Challenger
      nextWinStreak += 1;       // Dealer stays, streak increments
    }

    if (nextPlayers.length <= 1) {
      set({ phase: 'gameover', players: nextPlayers, winStreak: nextWinStreak });
    } else {
      set({ 
        phase: 'peek', 
        players: nextPlayers, 
        winStreak: nextWinStreak, 
        briefcaseStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE', 
        timer: 60,
        eliminationResult: null
      });
    }
  },

  playAgain: () => set((state) => ({
    players: [...state.initialRoster],
    winStreak: 0,
    timer: 60,
    phase: 'peek',
    briefcaseStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE',
    eliminationResult: null
  }))
}));