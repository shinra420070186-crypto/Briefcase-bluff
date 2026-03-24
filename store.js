import { create } from 'zustand';

// Helper to shuffle the array securely
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameStore = create((set, get) => ({
  // --- STATE VARIABLES ---
  phase: 'lobby', // 'lobby', 'peek', 'interrogation', 'choice', 'result', 'gameover'
  players: [], 
  initialRoster: [],
  dealerIndex: 0,
  challengerIndex: 1,
  winStreak: 0,
  briefcaseStatus: null, // 'SAFE' or 'ELIMINATE'
  timer: 60,
  timerRunning: false,
  intervalId: null,

  // --- LOBBY ACTIONS ---
  addPlayer: (name) => set((state) => {
    const newPlayer = { name, id: crypto.randomUUID() };
    const updatedPlayers = [...state.players, newPlayer];
    // Persist quick-add names to localStorage
    const savedNames = JSON.parse(localStorage.getItem('bb_saved_names') || '[]');
    if (!savedNames.includes(name)) {
      localStorage.setItem('bb_saved_names', JSON.stringify([...savedNames, name]));
    }
    return { players: updatedPlayers };
  }),

  removePlayer: (id) => set((state) => ({
    players: state.players.filter(p => p.id !== id)
  })),

  // --- GAME LOOP ACTIONS ---
  startGame: () => set((state) => {
    if (state.players.length < 2) return state; // Guard clause
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

  peekAtBriefcase: () => set(() => {
    // 50/50 chance per round
    const status = Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE';
    return { briefcaseStatus: status };
  }),

  startInterrogation: () => {
    const state = get();
    // Clear any existing timer to prevent leaks
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

    set({ 
      phase: 'interrogation', 
      timer: 60, 
      timerRunning: true, 
      intervalId 
    });
  },

  goToChoicePhase: () => {
    const state = get();
    if (state.intervalId) clearInterval(state.intervalId);
    set({ phase: 'choice', timerRunning: false });
  },

  makeChoice: (choice) => { // 'STEAL' or 'LEAVE'
    const state = get();
    const status = state.briefcaseStatus;
    let dealerLost = false;

    // Strict Resolution Matrix
    if (choice === 'STEAL') {
      if (status === 'ELIMINATE') dealerLost = false; // Challenger OUT
      if (status === 'SAFE') dealerLost = true;       // Dealer OUT
    } else if (choice === 'LEAVE') {
      if (status === 'ELIMINATE') dealerLost = true;  // Dealer OUT
      if (status === 'SAFE') dealerLost = false;      // Challenger OUT
    }

    const nextPlayers = [...state.players];
    let nextWinStreak = state.winStreak;

    // Loser is removed. Because Dealer is always index 0 and Challenger is index 1,
    // splicing the loser automatically shifts the next player into the Challenger slot.
    if (dealerLost) {
      nextPlayers.splice(0, 1); // Remove Dealer
      nextWinStreak = 0;        // Reset streak, Challenger becomes Dealer
    } else {
      nextPlayers.splice(1, 1); // Remove Challenger
      nextWinStreak += 1;       // Dealer survives, increment streak
    }

    // Check win condition
    if (nextPlayers.length <= 1) {
      set({ 
        phase: 'gameover', 
        players: nextPlayers,
        winStreak: nextWinStreak 
      });
    } else {
      // Setup next round
      set({ 
        phase: 'peek', 
        players: nextPlayers, 
        winStreak: nextWinStreak,
        briefcaseStatus: null,
        timer: 60
      });
    }
  },

  playAgain: () => set((state) => ({
    // Instantly restore the saved initial roster, bypassing lobby
    players: [...state.initialRoster],
    dealerIndex: 0,
    challengerIndex: 1,
    winStreak: 0,
    briefcaseStatus: null,
    timer: 60,
    phase: 'peek'
  }))
}));
