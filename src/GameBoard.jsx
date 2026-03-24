import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-12 relative" style={{ perspective: '1200px', width: '16rem', height: '24rem' }}>
      <div 
        className="w-full h-full relative" 
        style={{ 
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
        }}
      >
        
        {/* Front of Card: Premium Ivory with Pastel Blue Accents */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-3xl border-2 border-[#B8E3E9] shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
           {/* Elegant Minimalist Scanner */}
           <div className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center bg-white overflow-hidden transition-colors duration-300 ${isFlipped ? 'border-[#B8E3E9]' : 'border-slate-100'}`}>
              <div className={`w-12 h-12 rounded-full transition-all duration-300 ${isFlipped ? 'bg-[#B8E3E9] scale-110' : 'bg-slate-200'}`}></div>
           </div>
           <p className={`mt-8 font-bold tracking-[0.2em] text-xs uppercase transition-colors ${isFlipped ? 'text-[#7BB2BB]' : 'text-slate-400'}`}>
             {isFlipped ? 'Revealing...' : 'Hold to View'}
           </p>
        </div>

        {/* Back of Card: Soft Premium Colors */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden bg-white"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {status === 'SAFE' ? (
            <div className="w-full h-full rounded-3xl border-8 border-emerald-50 bg-emerald-50 flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-widest text-emerald-600">SAFE</span>
            </div>
          ) : (
            <div className="w-full h-full rounded-3xl border-8 border-rose-50 bg-rose-50 flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-widest text-rose-600">ELIMINATE</span>
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
    startGame, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult
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

  return (
    // Creamy white background (#FAF9F6)
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#FAF9F6] font-sans text-slate-800 select-none touch-none overflow-hidden">
      
      {/* --- LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <h1 className="text-3xl font-black tracking-[0.2em] mb-8 uppercase text-slate-800">The Deck</h1>
          
          {availableRecentNames.length > 0 && (
            <div className="w-full mb-6">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 pl-2">Recent Players</p>
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
              placeholder="Enter Name"
              className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-slate-800 outline-none focus:border-[#B8E3E9] transition-colors font-bold shadow-sm"
            />
            <button onClick={handleAddPlayer} className="px-6 bg-[#B8E3E9] text-slate-900 rounded-2xl font-black text-2xl active:scale-95 transition-transform shadow-md">+</button>
          </div>
          
          <div className="w-full space-y-2 mb-12">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <span className="font-bold tracking-widest text-slate-700">{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-rose-400 font-bold active:scale-90">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-6 bg-slate-800 text-white rounded-2xl font-black text-xl tracking-[0.2em] shadow-xl disabled:opacity-30 active:scale-95 transition-all"
          >
            START MATCH
          </button>
        </div>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-slate-400 uppercase tracking-widest text-sm mb-2">Current Player</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-slate-800">{players[0]?.name}</h2>

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
            className={`w-full max-w-xs py-5 rounded-2xl bg-[#B8E3E9] text-slate-900 font-black tracking-[0.2em] shadow-lg transition-opacity duration-300 ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100 active:scale-95'}`}
          >
            HIDE & PROCEED
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-slate-400 uppercase tracking-widest text-sm mb-2">Challenger</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-slate-800 mb-6">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-slate-400 tracking-widest uppercase text-xs mt-8 mb-4 font-bold">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-6 bg-white border-2 border-[#B8E3E9] rounded-2xl text-slate-800 font-black tracking-widest shadow-md active:bg-[#B8E3E9] transition-colors"
            >
              TAKE
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-6 bg-white border-2 border-slate-200 rounded-2xl text-slate-800 font-black tracking-widest shadow-md active:bg-slate-100 transition-colors"
            >
              PASS
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION PHASE --- */}
      {phase === 'resolution' && roundResult && (
        <div className="flex flex-col items-center w-full animate-fade-in text-center">
          
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-8 mb-12 w-full max-w-xs bg-white border border-slate-100 shadow-sm rounded-2xl py-6">
            <h2 className="text-4xl font-black text-slate-800 uppercase tracking-widest mb-2">{roundResult.loser.name}</h2>
            <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-sm">Eliminated</p>
            <div className="h-px w-1/2 bg-slate-200 mx-auto my-4"></div>
            <p className="text-slate-400 text-xs tracking-widest uppercase font-bold">Win Streak: {players[0]?.name === roundResult.winner.name ? winStreak + 1 : 1} / {Math.max(initialRoster.length - 1, 2)}</p>
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
        <div className="flex flex-col items-center animate-fade-in text-center mt-20">
          <div className="w-24 h-24 bg-[#B8E3E9] shadow-[0_10px_30px_rgba(184,227,233,0.5)] flex items-center justify-center rounded-full text-4xl mb-8">👑</div>
          <h2 className="text-5xl font-black text-slate-800 uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-emerald-500 font-bold tracking-[0.4em] mb-20 uppercase text-sm">Game Champion</p>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 bg-white border-2 border-slate-200 shadow-md rounded-2xl text-slate-800 font-bold tracking-[0.2em] active:bg-slate-50 transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}