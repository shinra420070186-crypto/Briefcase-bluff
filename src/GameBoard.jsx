import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-6 relative" style={{ perspective: '1200px', width: '14rem', height: '21rem' }}>
      <div 
        className="w-full h-full relative" 
        style={{ 
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        
        {/* Front of Card: Premium Ivory */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-3xl border-2 border-[#B8E3E9] shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
           <div className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center bg-white overflow-hidden transition-colors duration-300 ${isFlipped ? 'border-[#B8E3E9]' : 'border-slate-100'}`}>
              <div className={`w-10 h-10 rounded-full transition-all duration-300 ${isFlipped ? 'bg-[#B8E3E9] scale-110' : 'bg-slate-200'}`}></div>
           </div>
           <p className={`mt-6 font-bold tracking-[0.2em] text-[10px] uppercase transition-colors ${isFlipped ? 'text-[#7BB2BB]' : 'text-slate-400'}`}>
             {isFlipped ? 'Revealing...' : 'Hold to View'}
           </p>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.12)] overflow-hidden bg-white"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {status === 'SAFE' ? (
            <div className="w-full h-full rounded-3xl border-8 border-emerald-50 bg-emerald-50 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-widest text-emerald-600">SAFE</span>
            </div>
          ) : (
            <div className="w-full h-full rounded-3xl border-8 border-rose-50 bg-rose-50 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-widest text-rose-600">ELIMINATE</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, winStreak, initialRoster, recentNames,
    startGame, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult,
    playAgain
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [isHoldingCard, setIsHoldingCard] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  useEffect(() => {
    if (phase === 'peek') setHasPeeked(false);
  }, [phase]);

  const handleAction = (actionCallback, soundEffect = sfx.tap) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) actionCallback();
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      handleAction(() => addPlayer(newPlayerName.trim()), sfx.addPlayer);
      setNewPlayerName('');
    }
  };

  const onHoldStart = (e) => {
    if (e.cancelable) e.preventDefault(); 
    sfx.init();
    sfx.tap();
    setIsHoldingCard(true);
    setHasPeeked(true);
  };

  const onHoldEnd = (e) => {
    if (e.cancelable) e.preventDefault();
    if (isHoldingCard) sfx.tap(); 
    setIsHoldingCard(false);
  };

  const availableRecentNames = recentNames.filter(n => !players.some(p => p.name === n));

  // FIX: Compute correct displayed streak — the store already holds the correct value,
  // but during resolution we want to show what it WILL BE after nextRound resolves.
  const displayStreak = roundResult
    ? (roundResult.p1Lost ? 1 : winStreak + 1)
    : winStreak;

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#FAF9F6] font-sans text-slate-800 select-none overflow-x-hidden w-full">
      
      {/* --- LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in py-8">
          <h1 className="text-3xl font-black tracking-[0.2em] mb-8 uppercase text-slate-800">The Deck</h1>
          
          {availableRecentNames.length > 0 && (
            <div className="w-full mb-6">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 pl-2">Recent Players</p>
              <div className="flex flex-wrap gap-2">
                {availableRecentNames.slice(0, 6).map(name => (
                  <button 
                    key={name} 
                    onClick={() => handleAction(() => addPlayer(name), sfx.addPlayer)} 
                    className="px-4 py-2 bg-white border border-[#B8E3E9] rounded-full text-slate-600 text-xs font-bold tracking-wider active:bg-[#B8E3E9] transition-colors shadow-sm"
                  >
                    + {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex gap-2 mb-8">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              placeholder="Enter Name"
              className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 outline-none focus:border-[#B8E3E9] transition-colors font-bold shadow-sm"
            />
            <button onClick={handleAddPlayer} className="px-6 bg-[#B8E3E9] text-slate-900 rounded-2xl font-black text-2xl active:scale-95 transition-transform shadow-md">+</button>
          </div>
          
          <div className="w-full space-y-2 mb-10">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <span className="font-bold tracking-widest text-slate-700">{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-rose-400 font-bold active:scale-90 flex items-center justify-center w-6 h-6">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-5 bg-slate-800 text-white rounded-2xl font-black text-lg tracking-[0.2em] shadow-xl disabled:opacity-30 active:scale-95 transition-all"
          >
            START MATCH
          </button>
        </div>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full animate-fade-in py-6">
          <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-bold">Current Player</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-slate-800">{players[0]?.name}</h2>

          <div 
            onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onMouseLeave={onHoldEnd}
            onTouchStart={onHoldStart} onTouchEnd={onHoldEnd}
            className="cursor-pointer"
          >
            <FlipCard isFlipped={isHoldingCard} status={cardStatus} />
          </div>

          <button 
            onClick={() => handleAction(goToChoicePhase)}
            disabled={!hasPeeked || isHoldingCard}
            className={`w-full max-w-xs mt-4 py-5 rounded-2xl bg-[#B8E3E9] text-slate-900 font-black tracking-[0.2em] shadow-lg transition-opacity duration-300 ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100 active:scale-95'}`}
          >
            HIDE & PROCEED
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full animate-fade-in py-6">
          <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-bold">Challenger</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-slate-800 mb-2">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-slate-400 tracking-widest uppercase text-[10px] mt-6 mb-3 font-bold">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-5 bg-white border-2 border-[#B8E3E9] rounded-2xl text-slate-800 font-black tracking-widest shadow-md active:bg-[#B8E3E9] transition-colors"
            >
              TAKE
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-5 bg-white border-2 border-[#B8E3E9] rounded-2xl text-slate-800 font-black tracking-widest shadow-md active:bg-[#B8E3E9] transition-colors"
            >
              PASS
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION PHASE --- */}
      {phase === 'resolution' && roundResult && (
        <div className="flex flex-col items-center w-full animate-fade-in text-center py-6">
          
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-4 mb-6 w-full max-w-xs bg-white border border-slate-100 shadow-sm rounded-2xl py-5">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest mb-1">{roundResult.loser.name}</h2>
            <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px]">Eliminated</p>
            <div className="h-px w-1/3 bg-slate-100 mx-auto my-3"></div>
            {/* FIX: Use pre-computed displayStreak instead of fragile inline logic */}
            <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">
              Win Streak: {displayStreak} / {Math.max(initialRoster.length - 1, 2)}
            </p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full max-w-xs py-5 bg-slate-800 text-white rounded-2xl font-black tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center mt-16">
          <div className="w-20 h-20 bg-[#B8E3E9] shadow-[0_10px_30px_rgba(184,227,233,0.5)] flex items-center justify-center rounded-full text-3xl mb-6">👑</div>
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-emerald-500 font-bold tracking-[0.3em] mb-16 uppercase text-xs">Game Champion</p>
          
          {/* FIX: Use playAgain from store (reshuffles) instead of window.location.reload() */}
          <button 
            onClick={() => handleAction(playAgain)}
            className="px-8 py-4 bg-white border-2 border-slate-200 shadow-md rounded-2xl text-slate-800 font-bold tracking-[0.2em] active:bg-slate-50 transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}