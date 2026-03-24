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
        
        {/* Front: Frosted Glass Fingerprint Scanner */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-500/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
           <div className={`relative w-24 h-24 rounded-3xl border flex items-center justify-center bg-slate-900/80 overflow-hidden transition-colors duration-300 ${isFlipped ? 'border-cyan-400' : 'border-slate-600'}`}>
              
              {/* Fingerprint SVG */}
              <svg className={`w-12 h-12 transition-colors duration-300 ${isFlipped ? 'text-cyan-400' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>

              {/* Laser Scan Animation (Only active when touched) */}
              {isFlipped && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_15px_3px_rgba(34,211,238,0.8)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
              )}
           </div>
           <p className={`mt-8 font-bold tracking-[0.3em] text-xs uppercase transition-colors ${isFlipped ? 'text-cyan-300' : 'text-slate-500'}`}>
             {isFlipped ? 'Scanning...' : 'Hold to Scan'}
           </p>
        </div>

        {/* Back: Neon Reveal */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-950 border border-slate-700 overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {status === 'SAFE' ? (
            <div className="relative z-10 w-[90%] h-[90%] rounded-2xl border-2 border-cyan-500/50 bg-cyan-900/20 flex flex-col items-center justify-center shadow-[inset_0_0_60px_rgba(6,182,212,0.2)]">
              <span className="text-5xl font-black tracking-widest text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,1)]">SAFE</span>
              <span className="mt-2 text-cyan-500/50 tracking-widest text-xs uppercase">Identity Confirmed</span>
            </div>
          ) : (
            <div className="relative z-10 w-[90%] h-[90%] rounded-2xl border-2 border-fuchsia-600/50 bg-fuchsia-900/20 flex flex-col items-center justify-center shadow-[inset_0_0_60px_rgba(217,70,239,0.2)]">
              <span className="text-4xl font-black tracking-widest text-fuchsia-500 drop-shadow-[0_0_20px_rgba(217,70,239,1)] animate-pulse">ELIMINATE</span>
              <span className="mt-2 text-fuchsia-500/50 tracking-widest text-xs uppercase">Threat Detected</span>
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

  // Prevent default behavior to stop screen magnification on mobile touch
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

  // Filter out names already in the game for the quick-add chips
  const availableRecentNames = recentNames.filter(n => !players.some(p => p.name === n));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 font-sans text-slate-200 select-none touch-none overflow-hidden">
      
      {/* Laser Keyframe Injection */}
      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          50% { top: 110%; }
          100% { top: -10%; }
        }
      `}</style>

      {/* --- LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <h1 className="text-3xl font-black tracking-[0.2em] mb-8 uppercase text-slate-100 drop-shadow-md">Clearance</h1>
          
          {/* Quick-Add Chips */}
          {availableRecentNames.length > 0 && (
            <div className="w-full mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 pl-2">Recent Subjects</p>
              <div className="flex flex-wrap gap-2">
                {availableRecentNames.slice(0, 6).map(name => (
                  <button 
                    key={name} 
                    onClick={() => handleAction(() => addPlayer(name), sfx.addPlayer)} 
                    className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-full text-slate-400 text-xs font-bold tracking-wider active:bg-cyan-900/40 active:text-cyan-400 transition-colors"
                  >
                    + {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manual Input */}
          <div className="w-full flex gap-2 mb-8">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Subject Name"
              className="flex-1 p-4 bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl text-white outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-600 font-bold"
            />
            <button onClick={handleAddPlayer} className="px-6 bg-cyan-600 text-slate-900 rounded-xl font-black text-2xl active:scale-95 transition-transform">+</button>
          </div>
          
          {/* Active Player List */}
          <div className="w-full space-y-2 mb-12">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg">
                <span className="font-bold tracking-widest text-slate-300">{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-fuchsia-500 font-bold active:scale-90">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-6 bg-slate-100 text-slate-900 rounded-2xl font-black text-xl tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-20 active:scale-95 transition-all"
          >
            INITIALIZE
          </button>
        </div>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-slate-500 uppercase tracking-widest text-sm mb-2">Device Control</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-slate-100">{players[0]?.name}</h2>

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
            className={`w-full max-w-xs py-5 rounded-2xl border border-cyan-500/50 bg-cyan-900/20 text-cyan-400 font-bold tracking-[0.2em] shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] transition-opacity duration-300 ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100 active:scale-95'}`}
          >
            SECURE & PROCEED
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-slate-500 uppercase tracking-widest text-sm mb-2">Subject Action</p>
          <h2 className="text-4xl font-black tracking-widest uppercase text-slate-100 mb-6">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-slate-500 tracking-widest uppercase text-xs mt-8 mb-4">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-6 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-2xl text-slate-200 font-black tracking-widest shadow-lg active:bg-cyan-900/50 active:border-cyan-500 transition-colors"
            >
              TAKE
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-6 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-2xl text-slate-200 font-black tracking-widest shadow-lg active:bg-cyan-900/50 active:border-cyan-500 transition-colors"
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

          <div className="mt-8 mb-12 w-full max-w-xs bg-slate-900/50 border border-slate-800 rounded-2xl py-6">
            <h2 className="text-4xl font-black text-slate-200 uppercase tracking-widest mb-2">{roundResult.loser.name}</h2>
            <p className="text-fuchsia-500 font-bold tracking-[0.3em] uppercase text-sm">Eliminated</p>
            <div className="h-px w-1/2 bg-slate-800 mx-auto my-4"></div>
            <p className="text-slate-500 text-xs tracking-widest uppercase">Target Win Streak: {players[0]?.name === roundResult.winner.name ? winStreak + 1 : 1} / {initialRoster.length - 1}</p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full max-w-xs py-5 bg-slate-200 text-slate-900 rounded-2xl font-black tracking-[0.2em] active:scale-95 transition-transform"
          >
            NEXT ROUND
          </button>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center mt-20">
          <div className="w-24 h-24 border-2 border-cyan-500 bg-cyan-900/20 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center rounded-full text-4xl mb-8">👑</div>
          <h2 className="text-5xl font-black text-slate-100 uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-cyan-400 font-bold tracking-[0.4em] mb-20 uppercase text-sm">System Overwritten</p>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 bg-slate-800/80 backdrop-blur-md border border-slate-600 rounded-2xl text-slate-200 font-bold tracking-[0.2em] shadow-lg active:bg-cyan-900/50 transition-colors"
          >
            REBOOT SYSTEM
          </button>
        </div>
      )}
    </div>
  );
}