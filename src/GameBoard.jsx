import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// Background, Stars, Meteors, FAQ Button, Neon Card & Shine Text CSS
const MidnightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ backgroundColor: '#050505' }}>
    <style>{`
      /* Stars & Meteors */
      .stars { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .stars-1 {
        background-image: radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(1px 1px at 30% 20%, #fff, transparent), radial-gradient(1px 1px at 50% 50%, #fff, transparent), radial-gradient(1px 1px at 70% 30%, #fff, transparent), radial-gradient(1px 1px at 90% 10%, #fff, transparent);
        background-size: 100px 100px;
        animation: twinkle 3s ease-in-out infinite;
      }
      .stars-2 {
        background-image: radial-gradient(1.5px 1.5px at 20% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 60% 85%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 65%, #fff, transparent);
        background-size: 150px 150px;
        animation: twinkle 5s ease-in-out infinite 1s;
      }
      .stars-3 {
        background-image: radial-gradient(2px 2px at 40% 70%, #fff, transparent), radial-gradient(2px 2px at 10% 80%, #fff, transparent), radial-gradient(2px 2px at 80% 40%, #fff, transparent);
        background-size: 200px 200px;
        animation: twinkle 7s ease-in-out infinite 2s;
      }
      .meteor { position: absolute; width: 1.5px; height: 1.5px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5); opacity: 0; pointer-events: none; }
      .meteor::after { content: ""; position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 1px; background: linear-gradient(90deg, #fff, transparent); }
      .m1 { top: 10%; left: 110%; animation: shoot 8s linear infinite; }
      .m2 { top: 30%; left: 110%; animation: shoot 12s linear infinite 4s; }
      .m3 { top: 50%; left: 110%; animation: shoot 10s linear infinite 2s; }
      .moon { position: absolute; top: 15%; right: 15%; width: 40px; height: 40px; border-radius: 50%; background: transparent; box-shadow: 7px 7px 0 0 #fdfbd3; filter: drop-shadow(0 0 7px rgba(253, 251, 211, 0.4)); z-index: 10; }
      
      @keyframes twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      @keyframes shoot { 0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; } 5% { opacity: 1; } 15% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } 100% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } }
      
      /* FAQ Button Jello Effect */
      @keyframes jello-vertical {
        0% { transform: scale3d(1, 1, 1); }
        30% { transform: scale3d(0.75, 1.25, 1); }
        40% { transform: scale3d(1.25, 0.75, 1); }
        50% { transform: scale3d(0.85, 1.15, 1); }
        65% { transform: scale3d(1.05, 0.95, 1); }
        75% { transform: scale3d(0.95, 1.05, 1); }
        100% { transform: scale3d(1, 1, 1); }
      }
      .animate-jello-vertical { animation: jello-vertical 0.7s both; }

      /* Neon Rule Card CSS (Scaled up to fit 4 rules) */
      .neon-card {
        position: relative;
        width: 300px;
        height: 380px;
        background-color: #000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 24px;
        gap: 16px;
        border-radius: 8px;
        cursor: pointer;
        color: white;
      }
      .neon-card::before {
        content: '';
        position: absolute;
        inset: 0;
        left: -5px;
        margin: auto;
        width: 310px;
        height: 390px;
        border-radius: 10px;
        background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
        z-index: -10;
        pointer-events: none;
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .neon-card::after {
        content: "";
        z-index: -1;
        position: absolute;
        inset: 0;
        background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
        transform: translate3d(0, 0, 0) scale(0.95);
        filter: blur(20px);
      }
      .neon-heading {
        font-size: 24px;
        text-transform: uppercase;
        font-weight: 800;
        color: #e81cff;
        text-align: center;
        margin-bottom: 10px;
      }
      .neon-card p:not(.neon-heading) {
        font-size: 14px;
        line-height: 1.4;
        color: #ddd;
      }
      .neon-card:hover::after, .neon-card:active::after {
        filter: blur(30px);
      }
      .neon-card:hover::before, .neon-card:active::before {
        transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
      }

      /* Shine Text CSS for Lobby Title */
      .shine-text {
        color: rgba(255, 255, 255, 0.3);
        background: #222 -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff)) 0 0 no-repeat;
        background-image: -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%);
        -webkit-background-clip: text;
        -webkit-background-size: 50px;
        -webkit-animation: zezzz 5s infinite;
      }
      @-webkit-keyframes zezzz {
        0%, 10% { background-position: -200px; }
        20% { background-position: top left; }
        100% { background-position: 200px; }
      }
    `}</style>
    <div className="stars stars-1"></div>
    <div className="stars stars-2"></div>
    <div className="stars stars-3"></div>
    <div className="meteor m1"></div>
    <div className="meteor m2"></div>
    <div className="meteor m3"></div>
    <div className="moon"></div>
  </div>
);

const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-6 relative w-[190px] h-[254px] [perspective:1000px] font-sans">
      <div 
        className="relative w-full h-full text-center transition-transform duration-[800ms] [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden] border border-[coral] rounded-2xl shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
          style={{
            background: 'linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%)',
            color: 'coral'
          }}
        >
          <p className="text-2xl font-black tracking-widest m-0 uppercase">THE DECK</p>
          <p className="mt-2 font-bold tracking-[0.2em] text-[10px] uppercase opacity-80">
            {isFlipped ? 'Revealing...' : 'Hold to View'}
          </p>
        </div>

        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden] rounded-2xl shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
          style={{ 
            transform: 'rotateY(180deg)',
            background: status === 'SAFE' 
              ? 'linear-gradient(120deg, #d1fae5 30%, #10b981 88%, #ecfdf5 40%, #6ee7b7 78%)'
              : 'linear-gradient(120deg, #ffe4e6 30%, #e11d48 88%, #fff1f2 40%, #fda4af 78%)',
            border: status === 'SAFE' ? '1px solid #10b981' : '1px solid #e11d48',
            color: 'white'
          }}
        >
          <p className="text-3xl font-black tracking-widest m-0 drop-shadow-md">
            {status === 'SAFE' ? 'SAFE' : 'ELIMINATE'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, winStreak, initialRoster, recentNames,
    startGame, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult,
    playAgain, backToLobby
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [isHoldingCard, setIsHoldingCard] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);
  
  // Rule Modal Controls
  const [showRules, setShowRules] = useState(false);

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

  const displayStreak = roundResult
    ? (roundResult.p1Lost ? 1 : winStreak + 1)
    : winStreak;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#FAF9F6] font-sans text-slate-800 select-none overflow-x-hidden w-full">
      
      {/* --- NEON RULE CARD OVERLAY --- */}
      {showRules && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => handleAction(() => setShowRules(false))} 
        >
          {/* Stop propagation so clicking the card itself doesn't close it */}
          <div className="neon-card" onClick={(e) => e.stopPropagation()}>
            <p className="neon-heading">How to Play</p>
            <p><strong>1. PEEK:</strong> Secretly check your card. It's either SAFE or ELIMINATE.</p>
            <p><strong>2. FACE:</strong> Keep a straight poker face and hand the phone over.</p>
            <p><strong>3. FATE:</strong> The Challenger must read your face and choose to TAKE or PASS.</p>
            <p><strong>4. OUT:</strong> Whoever ends up holding the ELIMINATE card loses!</p>
          </div>
          <p className="text-center text-white/50 text-xs mt-10 tracking-widest uppercase">Tap background to close</p>
        </div>
      )}

      {/* --- LOBBY BACKGROUND --- */}
      {phase === 'lobby' && <MidnightSky />}
      
      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <>
          {/* UIVERSE FAQ BUTTON - FIXED TOP LEFT & SMALLER (32x32) */}
          <button 
            onClick={() => handleAction(() => setShowRules(true))}
            className="group fixed top-6 left-6 w-[32px] h-[32px] rounded-full border-none flex items-center justify-center cursor-pointer shadow-[0px_10px_10px_rgba(0,0,0,0.15)] z-40"
            style={{ backgroundImage: 'linear-gradient(147deg, #ffe53b 0%, #ff2525 74%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-[1em] fill-white group-hover:animate-jello-vertical">
              <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
            </svg>
            <span 
              className="absolute top-[-20px] opacity-0 group-hover:top-[-40px] group-hover:opacity-100 transition-all duration-300 text-white px-[8px] py-[4px] rounded-[4px] flex items-center justify-center pointer-events-none tracking-[0.5px] text-[10px] font-bold"
              style={{ backgroundImage: 'linear-gradient(147deg, #ffe53b 0%, #ff2525 74%)' }}
            >
              FAQ
              <span className="absolute -bottom-[4px] w-[8px] h-[8px] bg-[#ff2525] rotate-45 z-[-1]"></span>
            </span>
          </button>

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm animate-fade-in py-8 mt-4">
            
            {/* LOBBY TITLE - NOW WITH UIVERSE SHINE EFFECT */}
            <h1 className="shine-text text-4xl font-black tracking-[0.2em] mb-8 uppercase drop-shadow-lg text-center">
              The Deck
            </h1>
            
            {availableRecentNames.length > 0 && (
              <div className="w-full mb-6">
                <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-3 pl-2">Recent Players</p>
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
              className={`relative w-full py-5 rounded-[10rem] font-black text-lg tracking-[0.2em] shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 ${
                players.length < 2 
                  ? 'bg-slate-200 text-slate-400 opacity-50 pointer-events-none' 
                  : 'bg-white text-slate-900 active:scale-[0.97]'
              }`}
            >
              <div className={`absolute inset-0 flex items-center justify-center z-0 transition-opacity duration-500 ${players.length < 2 ? 'opacity-0' : 'opacity-100'}`}>
                <div 
                  className="w-[20rem] h-[20rem] rounded-full blur-[20px] animate-[spin_3s_linear_infinite] opacity-60"
                  style={{ background: 'linear-gradient(90deg, rgba(222, 0, 75, 1) 0%, rgba(191, 70, 255, 1) 49%, rgba(0, 212, 255, 1) 100%)' }}
                ></div>
              </div>
              <span className="relative z-10 transition-colors duration-300 drop-shadow-sm">START MATCH</span>
            </button>
          </div>
        </>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in py-6">
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
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in py-6">
          <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-bold">Challenger</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-slate-800 mb-2">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-slate-400 tracking-widest uppercase text-[10px] mt-6 mb-3 font-bold">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/15 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                TAKE
              </span>
            </button>

            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/15 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                PASS
              </span>
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION PHASE --- */}
      {phase === 'resolution' && roundResult && (
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in text-center py-6">
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-4 mb-6 w-full max-w-xs bg-white border border-slate-100 shadow-sm rounded-2xl py-5">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest mb-1">{roundResult.loser.name}</h2>
            <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px]">Eliminated</p>
            <div className="h-px w-1/3 bg-slate-100 mx-auto my-3"></div>
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
        <div className="relative z-10 flex flex-col items-center animate-fade-in text-center mt-16 w-full">
          
          {/* FIXED TOP RIGHT BACK BUTTON */}
          <button 
            onClick={() => handleAction(backToLobby)}
            className="group fixed top-6 right-6 flex items-center justify-center h-10 px-3 bg-white border border-slate-200 shadow-sm rounded-lg text-slate-600 font-bold tracking-widest uppercase text-[10px] active:scale-95 active:-translate-y-1 active:shadow-md transition-all duration-200 z-50"
          >
            <svg className="h-4 w-4 mr-1 transition-transform duration-300 group-active:-translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            BACK
          </button>

          <div className="w-20 h-20 bg-[#B8E3E9] shadow-[0_10px_30px_rgba(184,227,233,0.5)] flex items-center justify-center rounded-full text-3xl mb-6">👑</div>
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-emerald-500 font-bold tracking-[0.3em] mb-16 uppercase text-xs">Game Champion</p>
          
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