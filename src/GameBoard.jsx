import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// Background & CSS Animations (Stars, Meteor, Jello, and Accordion)
const MidnightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ backgroundColor: '#050505' }}>
    <style>{`
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

      /* Uiverse Accordion Rule Book Styles */
      .rule-card {
        width: 100%;
        max-width: 340px;
        height: 380px;
        border-radius: 12px;
        background: #212121;
        display: flex;
        gap: 5px;
        padding: 0.5em;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      }
      .rule-item {
        height: 100%;
        flex: 1;
        overflow: hidden;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        background: #212121;
        border: 1px solid #ff5a91;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .rule-item.active {
        flex: 5;
        background: #2a2a2a;
      }
      .rule-heading {
        min-width: 14em;
        text-align: center;
        transform: rotate(-90deg);
        transition: all 0.5s;
        text-transform: uppercase;
        color: #ff568e;
        letter-spacing: 0.1em;
        font-weight: 900;
        font-size: 0.9rem;
      }
      .rule-item.active .rule-heading {
        transform: rotate(0);
        min-width: auto;
        padding-top: 20px;
        margin-bottom: 15px;
        font-size: 1.2rem;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 86, 142, 0.8);
      }
      .rule-content {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease-in-out;
        display: none;
      }
      .rule-item.active .rule-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 1;
        transform: translateY(0);
        transition-delay: 0.2s;
        padding: 0 15px 20px 15px;
        color: #ddd;
        text-align: center;
        font-size: 0.85rem;
        line-height: 1.5;
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
  
  // Controls the overall Rules Modal overlay
  const [showRules, setShowRules] = useState(false);
  // Controls which accordion tab is expanded (defaults to the first one: 0)
  const [activeRuleTab, setActiveRuleTab] = useState(0);

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
      
      {/* --- INTERACTIVE RULE ACCORDION OVERLAY --- */}
      {showRules && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => handleAction(() => setShowRules(false))} // Clicking dark background closes the modal
        >
          {/* We use stopPropagation so clicking INSIDE the rule book doesn't close it */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div className="rule-card">
              
              {/* Tab 1: The Peek */}
              <div 
                className={`rule-item ${activeRuleTab === 0 ? 'active' : ''}`} 
                onClick={() => handleAction(() => setActiveRuleTab(0))}
              >
                <span className="rule-heading">1. THE PEEK</span>
                <div className="rule-content">
                  <span className="text-3xl mb-2">🤫</span>
                  <p>Secretly press and hold to check your card. You will draw either a green <strong>SAFE</strong> or a red <strong className="text-rose-500">ELIMINATE</strong>.</p>
                </div>
              </div>

              {/* Tab 2: Poker Face */}
              <div 
                className={`rule-item ${activeRuleTab === 1 ? 'active' : ''}`} 
                onClick={() => handleAction(() => setActiveRuleTab(1))}
              >
                <span className="rule-heading">2. POKER FACE</span>
                <div className="rule-content">
                  <span className="text-3xl mb-2">🗿</span>
                  <p>Do not react! Keep a completely straight face, bluff if you need to, and hand the phone to the Challenger.</p>
                </div>
              </div>

              {/* Tab 3: Take or Pass */}
              <div 
                className={`rule-item ${activeRuleTab === 2 ? 'active' : ''}`} 
                onClick={() => handleAction(() => setActiveRuleTab(2))}
              >
                <span className="rule-heading">3. FATE</span>
                <div className="rule-content">
                  <span className="text-3xl mb-2">🎯</span>
                  <p>The Challenger must read your face and make a blind choice: <strong>TAKE</strong> the card from you, or <strong>PASS</strong> it back.</p>
                </div>
              </div>

              {/* Tab 4: Elimination */}
              <div 
                className={`rule-item ${activeRuleTab === 3 ? 'active' : ''}`} 
                onClick={() => handleAction(() => setActiveRuleTab(3))}
              >
                <span className="rule-heading">4. OUT!</span>
                <div className="rule-content">
                  <span className="text-3xl mb-2">☠️</span>
                  <p>Once the choice is made, the card flips! Whoever ends up holding the <strong className="text-rose-500">ELIMINATE</strong> card is immediately OUT!</p>
                </div>
              </div>

            </div>
            
            {/* Optional visible close text under the accordion */}
            <p className="text-center text-white/50 text-xs mt-4 tracking-widest uppercase">Tap anywhere outside to close</p>
          </div>
        </div>
      )}

      {/* --- LOBBY BACKGROUND --- */}
      {phase === 'lobby' && <MidnightSky />}
      
      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <>
          {/* UIVERSE FAQ BUTTON - Top Right */}
          <button 
            onClick={() => handleAction(() => { setShowRules(true); setActiveRuleTab(0); })}
            className="group absolute top-6 right-6 w-[50px] h-[50px] rounded-full border-none flex items-center justify-center cursor-pointer shadow-[0px_10px_10px_rgba(0,0,0,0.15)] z-20"
            style={{ backgroundImage: 'linear-gradient(147deg, #ffe53b 0%, #ff2525 74%)' }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 320 512"
              className="h-[1.5em] fill-white group-hover:animate-jello-vertical"
            >
              <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
            </svg>
            <span 
              className="absolute top-[-20px] opacity-0 group-hover:top-[-45px] group-hover:opacity-100 transition-all duration-300 text-white px-[10px] py-[5px] rounded-[5px] flex items-center justify-center pointer-events-none tracking-[0.5px] text-xs font-bold"
              style={{ backgroundImage: 'linear-gradient(147deg, #ffe53b 0%, #ff2525 74%)' }}
            >
              FAQ
              <span className="absolute -bottom-[4px] w-[10px] h-[10px] bg-[#ff2525] rotate-45 z-[-1]"></span>
            </span>
          </button>

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm animate-fade-in py-8 mt-4">
            <h1 className="text-3xl font-black tracking-[0.2em] mb-8 uppercase text-white drop-shadow-lg">The Deck</h1>
            
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
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B