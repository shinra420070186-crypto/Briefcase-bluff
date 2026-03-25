import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// Background, Stars, Meteors, FAQ Button, Neon Card, Shine Text & Neon Input CSS
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

      /* Neon Rule Card CSS */
      .neon-card { position: relative; width: 300px; height: 380px; background-color: #000; display: flex; flex-direction: column; justify-content: center; padding: 24px; gap: 16px; border-radius: 8px; cursor: pointer; color: white; }
      .neon-card::before { content: ''; position: absolute; inset: 0; left: -5px; margin: auto; width: 310px; height: 390px; border-radius: 10px; background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% ); z-index: -10; pointer-events: none; transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .neon-card::after { content: ""; z-index: -1; position: absolute; inset: 0; background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% ); transform: translate3d(0, 0, 0) scale(0.95); filter: blur(20px); }
      .neon-heading { font-size: 24px; text-transform: uppercase; font-weight: 800; color: #e81cff; text-align: center; margin-bottom: 10px; }
      .neon-card p:not(.neon-heading) { font-size: 14px; line-height: 1.4; color: #ddd; }
      .neon-card:hover::after, .neon-card:active::after { filter: blur(30px); }
      .neon-card:hover::before, .neon-card:active::before { transform: rotate(-90deg) scaleX(1.34) scaleY(0.77); }

      /* Shine Text CSS for Lobby Title */
      .shine-text { color: rgba(255, 255, 255, 0.3); background: #222 -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff)) 0 0 no-repeat; background-image: -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%); -webkit-background-clip: text; -webkit-background-size: 50px; -webkit-animation: zezzz 5s infinite; }
      @-webkit-keyframes zezzz { 0%, 10% { background-position: -200px; } 20% { background-position: top left; } 100% { background-position: 200px; } }

      /* Neon Animated Input CSS */
      .poda { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; max-width: 314px; margin: 0 auto; }
      .poda-input { background-color: #010201; border: none; width: 100%; height: 56px; border-radius: 10px; color: white; padding-inline: 59px; font-size: 16px; font-weight: bold; }
      .poda-input::placeholder { color: #5a545a; font-weight: normal; }
      .poda-input:focus { outline: none; }
      .poda-main { position: relative; width: 100%; }
      .poda-main:focus-within > .poda-input-mask { display: none; }
      .poda-input-mask { pointer-events: none; width: 100px; height: 20px; position: absolute; background: linear-gradient(90deg, transparent, #010201); top: 18px; left: 70px; }
      .poda-pink-mask { pointer-events: none; width: 30px; height: 20px; position: absolute; background: #cf30aa; top: 10px; left: 5px; filter: blur(20px); opacity: 0.8; transition: all 2s; }
      .poda-main:hover > .poda-pink-mask { opacity: 0; }
      
      .poda-white, .poda-border, .poda-darkBorderBg, .poda-glow { max-height: 70px; max-width: 314px; height: 100%; width: 100%; position: absolute; overflow: hidden; z-index: -1; border-radius: 12px; filter: blur(3px); }
      .poda-white { max-height: 63px; max-width: 307px; border-radius: 10px; filter: blur(2px); }
      .poda-white::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(83deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.4); background-image: conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%); transition: all 2s; }
      .poda-border { max-height: 59px; max-width: 303px; border-radius: 11px; filter: blur(0.5px); }
      .poda-border::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(70deg); position: absolute; width: 600px; height: 600px; filter: brightness(1.3); background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%); transition: all 2s; }
      .poda-darkBorderBg { max-height: 65px; max-width: 312px; }
      .poda-darkBorderBg::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(82deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%); transition: all 2s; }
      .poda-glow { overflow: hidden; filter: blur(30px); opacity: 0.4; max-height: 130px; max-width: 354px; }
      .poda-glow::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(60deg); position: absolute; width: 999px; height: 999px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%); transition: all 2s; }
      
      .poda:hover .poda-darkBorderBg::before { transform: translate(-50%, -50%) rotate(262deg); }
      .poda:hover .poda-glow::before { transform: translate(-50%, -50%) rotate(240deg); }
      .poda:hover .poda-white::before { transform: translate(-50%, -50%) rotate(263deg); }
      .poda:hover .poda-border::before { transform: translate(-50%, -50%) rotate(250deg); }
      
      .poda:focus-within .poda-darkBorderBg::before { transform: translate(-50%, -50%) rotate(442deg); transition: all 4s; }
      .poda:focus-within .poda-glow::before { transform: translate(-50%, -50%) rotate(420deg); transition: all 4s; }
      .poda:focus-within .poda-white::before { transform: translate(-50%, -50%) rotate(443deg); transition: all 4s; }
      .poda:focus-within .poda-border::before { transform: translate(-50%, -50%) rotate(430deg); transition: all 4s; }
      
      .poda-add-btn { position: absolute; top: 8px; right: 8px; display: flex; align-items: center; justify-content: center; z-index: 2; max-height: 40px; max-width: 38px; height: 100%; width: 100%; isolation: isolate; overflow: hidden; border-radius: 10px; background: linear-gradient(180deg, #161329, black, #1d1b4b); border: 1px solid transparent; cursor: pointer; }
      .poda-add-btn:active { transform: scale(0.95); }
      .poda-filterBorder { height: 42px; width: 40px; position: absolute; overflow: hidden; top: 7px; right: 7px; border-radius: 10px; pointer-events: none; }
      .poda-filterBorder::before { content: ""; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.35); background-image: conic-gradient(rgba(0,0,0,0), #3d3a4f, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 50%, #3d3a4f, rgba(0,0,0,0) 100%); animation: p-rotate 4s linear infinite; }
      .poda-search-icon { position: absolute; left: 20px; top: 15px; pointer-events: none; }
      @keyframes p-rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }
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
            
            {/* LOBBY TITLE - SHINE EFFECT */}
            <h1 className="shine-text text-4xl font-black tracking-[0.2em] mb-8 uppercase drop-shadow-lg text-center">
              The Deck
            </h1>
            
            {/* NEON ANIMATED UIVERSE INPUT */}
            <div className="w-full mb-10 flex justify-center">
              <div className="poda">
                <div className="poda-glow"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-white"></div>
                <div className="poda-border"></div>
                <div className="poda-main">
                  <input 
                    placeholder="Enter Name..." 
                    type="text" 
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                    className="poda-input" 
                  />
                  <div className="poda-input-mask"></div>
                  <div className="poda-pink-mask"></div>
                  <div className="poda-filterBorder"></div>
                  
                  {/* Plus Icon (Act as Add Button) */}
                  <div className="poda-add-btn" onClick={handleAddPlayer}>
                    <svg preserveAspectRatio="none" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="#d6d6e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  
                  {/* User Profile Icon */}
                  <div className="poda-search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" height="24" fill="none">
                      <path stroke="url(#search)" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle stroke="url(#searchl)" cx="12" cy="7" r="4"></circle>
                      <defs>
                        <linearGradient gradientTransform="rotate(50)" id="search">
                          <stop stopColor="#f8e7f8" offset="0%"></stop>
                          <stop stopColor="#b6a9b7" offset="50%"></stop>
                        </linearGradient>
                        <linearGradient id="searchl">
                          <stop stopColor="#b6a9b7" offset="0%"></stop>
                          <stop stopColor="#837484" offset="50%"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            