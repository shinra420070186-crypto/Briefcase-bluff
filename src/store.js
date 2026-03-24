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
  winStreak: 0,
  cardStatus: null, // SAFE or ELIMINATE
  timer: 60,
  timerRunning: false,
  intervalId: null,
  roundResult: null,

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
      initialRoster: [...shuffled], // Save names for Play Again
      winStreak: 0,
      phase: 'peek',
      cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE'
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
    const status = state.cardStatus;
    const p1 = state.players[0]; // The one who peeked
    const p2 = state.players[1]; // The challenger
    
    let p1Lost = false;

    if (choice === 'STEAL') {
      if (status === 'ELIMINATE') p1Lost = false; // P2 steals the trap and loses
      if (status === 'SAFE') p1Lost = true;       // P2 steals the safe spot, P1 loses
    } else if (choice === 'LEAVE') {
      if (status === 'ELIMINATE') p1Lost = true;  // P1 is stuck with the trap and loses
      if (status === 'SAFE') p1Lost = false;      // P2 leaves the safe spot, P2 loses
    }

    set({ 
      phase: 'resolution', 
      roundResult: {
        loser: p1Lost ? p1 : p2,
        winner: p1Lost ? p2 : p1,
        p1Lost,
        choice
      }
    });
  },

  nextRound: () => {
    const state = get();
    const nextPlayers = [...state.players];
    let nextWinStreak = state.winStreak;

    // King of the Hill Logic: Loser goes to the back of the line.
    if (state.roundResult.p1Lost) {
      // P1 lost. Move P1 to the end. P2 becomes the new P1.
      const loser = nextPlayers.shift(); 
      nextPlayers.push(loser);
      nextWinStreak = 1; // P2 just got their first win
    } else {
      // P2 lost. Move P2 to the end. P1 stays at the front.
      const loser = nextPlayers.splice(1, 1)[0]; 
      nextPlayers.push(loser);
      nextWinStreak += 1; // P1 increases their win streak
    }

    // Check if the current P1 has defeated everyone else
    const targetWins = state.initialRoster.length - 1;

    if (nextWinStreak >= targetWins) {
      set({ phase: 'gameover', players: nextPlayers, winStreak: nextWinStreak });
    } else {
      // Round continues with a new random card
      set({ 
        phase: 'peek', 
        players: nextPlayers, 
        winStreak: nextWinStreak, 
        cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE', 
        timer: 60,
        roundResult: null
      });
    }
  },

  playAgain: () => set((state) => ({
    // Instantly loads the exact same friends from the last game
    players: [...state.initialRoster],
    winStreak: 0,
    timer: 60,
    phase: 'peek',
    cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE',
    roundResult: null
  }))
}));