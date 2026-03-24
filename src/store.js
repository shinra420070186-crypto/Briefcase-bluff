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
      initialRoster: [...shuffled],
      winStreak: 0,
      phase: 'peek',
      cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE'
    };
  }),

  goToChoicePhase: () => set({ phase: 'choice' }),

  makeChoice: (choice) => {
    const state = get();
    const status = state.cardStatus;
    const p1 = state.players[0]; // The one holding the phone
    const p2 = state.players[1]; // The challenger
    
    let p1Lost = false;

    // STEAL means P2 takes the card. LEAVE means P1 keeps the card.
    if (choice === 'STEAL') {
      if (status === 'ELIMINATE') p1Lost = false; 
      if (status === 'SAFE') p1Lost = true;       
    } else if (choice === 'LEAVE') {
      if (status === 'ELIMINATE') p1Lost = true;  
      if (status === 'SAFE') p1Lost = false;      
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

    // King of the Hill: Loser to the back of the line.
    if (state.roundResult.p1Lost) {
      const loser = nextPlayers.shift(); 
      nextPlayers.push(loser);
      nextWinStreak = 1; // New king gets 1 win
    } else {
      const loser = nextPlayers.splice(1, 1)[0]; 
      nextPlayers.push(loser);
      nextWinStreak += 1; // Current king streak increases
    }

    const targetWins = state.initialRoster.length - 1;

    if (nextWinStreak >= targetWins) {
      set({ phase: 'gameover', players: nextPlayers, winStreak: nextWinStreak });
    } else {
      set({ 
        phase: 'peek', 
        players: nextPlayers, 
        winStreak: nextWinStreak, 
        cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE', 
        roundResult: null
      });
    }
  },

  playAgain: () => set((state) => ({
    players: [...state.initialRoster],
    winStreak: 0,
    phase: 'peek',
    cardStatus: Math.random() > 0.5 ? 'SAFE' : 'ELIMINATE',
    roundResult: null
  }))
}));