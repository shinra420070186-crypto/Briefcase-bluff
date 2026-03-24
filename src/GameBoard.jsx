import React, { useEffect, useState, useRef } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

const Briefcase3D = ({ lidAngle, status }) => {
  return (
    <div className="relative w-72 h-48 my-10 perspective-1000">
      {/* Base of the Briefcase */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 to-neutral-500 rounded-lg shadow-2xl border-b-8 border-neutral-600 flex items-center justify-center transform-style-3d">
        
        {/* The Glow Screen (Hidden under lid) */}
        <div className="w-5/6 h-3/4 bg-neutral-900 rounded-md border-4 border-neutral-800 flex items-center justify-center shadow-inner overflow-hidden">
           {status === 'SAFE' && (
            <div className={`w-full h-full flex items-center justify-center bg-green-500/20 shadow-[0_0_50px_rgba(74,222,128,0.8)_inset] transition-opacity duration-300 ${lidAngle > 0 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-5xl font-extrabold tracking-widest text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,1)]">SAFE</span>
            </div>
          )}
          {status === 'ELIMINATE' && (
            <div className={`w-full h-full flex items-center justify-center bg-red-600/20 shadow-[0_0_50px_rgba(220,38,38,0.8)_inset] transition-opacity duration-300 ${lidAngle > 0 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-4xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,1)] animate-pulse">ELIMINATE</span>
            </div>
          )}
        </div>
      </div>

      {/* The 3D Lid */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-400 rounded-lg border-t-2 border-white shadow-lg origin-top transition-transform duration-200 ease-out z-10 flex flex-col justify-end"
        style={{ transform: `rotateX(${lidAngle}deg)` }}
      >
        {/* Silver Texture */}
        <div className="absolute inset-2 border border-neutral-300/50 rounded pointer-events-none"></div>
        {/* Locks */}
        <div className="flex justify-between px-8 pb-1">
          <div className="w-8 h-4 bg-neutral-600 rounded-sm border-b-2 border-neutral-800"></div>
          <div className="w-8 h-4 bg-neutral-600 rounded-sm border-b-2 border-neutral-800"></div>
        </div>
      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, timer, timerRunning, 
    startGame, startInterrogation, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, briefcaseStatus, eliminationResult
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [latch1, setLatch1] = useState(false);
  const [latch2, setLatch2] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  const isPeeking = latch1 && latch2;
  const isMobile = 'ontouchstart' in window;

  // Audio and Haptic Synchronization
  useEffect(() => {
    if (phase === 'interrogation') {
      sfx.startHeartbeat();
    } else {
      sfx.stopHeartbeat();
    }
    if (phase === 'gameover') sfx.gameOver();
    if (phase === 'resolution') sfx.slam(); // Case flies open
  }, [phase]);

  useEffect(() => {
    if (!timerRunning || timer === 0) {
      if (timer === 0 && phase === 'interrogation') goToChoicePhase();
      return;
    }
    
    // Increase heartbeat tempo and trigger haptics based on time remaining
    if (timer <= 15) {
      sfx.setHeartbeatSpeed(2.0);
      if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    } else if (timer <= 30) {
      sfx.setHeartbeatSpeed(1.5);
      if (navigator.vibrate) navigator.vibrate([50]);
    } else {
      sfx.setHeartbeatSpeed(1.0);
    }
  }, [timer, timerRunning, phase, goToChoicePhase]);

  // Peek Mechanics Audio
  useEffect(() => {
    if (isPeeking && phase === 'peek') {
      sfx.hiss();
      setHasPeeked(true);
    } else if (!isPeeking && hasPeeked && phase === 'peek') {
      sfx.slam();
    }
  }, [isPeeking, phase, hasPeeked]);

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

  // Determine Lid Angle based on phase
  let currentLidAngle = 0;
  if (phase === 'peek' && isPeeking) currentLidAngle = 15; // Cracks open
  if (phase === 'resolution' || phase === 'gameover') currentLidAngle = 105; // Flies completely open

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-neutral-950 font-sans text-white select-none overflow-hidden touch-none">
      
      {/* Header */}
      <div className="absolute top-6 text-center opacity-80">
        <h1 className="text-xl font-black tracking-widest text-neutral-300 uppercase">The Gauntlet</h1>
        <p className="text-xs text-neutral-500 tracking-widest mt-1 uppercase">Phase: {phase}</p>
      </div>

      {/* --- 1. THE LOBBY --- */}
      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm mt-12 animate-fade-in">
          <div className="w-full flex gap-2 mb-6">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter Name..."
              className="flex-1 p-4 rounded-xl bg-neutral-900 border border-neutral-700 outline-none"
            />
            <button onClick={handleAddPlayer} className="px-6 py-4 bg-blue-600 rounded-xl font-bold text-xl">+</button>
          </div>
          
          <div className="w-full text-left mb-2 text-xs text-neutral-500 font-bold tracking-widest uppercase">The Queue</div>
          <div className="w-full max-h-64 overflow-y-auto space-y-2 mb-6">
            {players.map((p, index) => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                <span className="font-bold">
                  {index === 0 ? <span className="text-blue-400 mr-2">[DEALER]</span> : ''}
                  {index === 1 ? <span className="text-red-400 mr-2">[CHALLENGER]</span> : ''}
                  {p.name}
                </span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-neutral-600 font-bold">✕</button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full py-5 bg-white text-black rounded-xl font-black text-xl tracking-widest disabled:opacity-20"
          >
            ENTER THE GAUNTLET
          </button>
        </div>
      )}

      {/* --- 2. THE PEEK --- */}
      {phase === 'peek' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-center mb-8">
            <span className="text-blue-400 font-black text-2xl">{players[0]?.name}</span><br/>
            <span className="text-neutral-400">Hold both latches to peek.</span>
          </p>

          <Briefcase3D lidAngle={currentLidAngle} status={briefcaseStatus} />

          <div className="flex w-full justify-between px-4 mt-8">
            <button 
              onMouseDown={() => setLatch1(true)} onMouseUp={() => setLatch1(false)} onMouseLeave={() => setLatch1(false)}
              onTouchStart={() => setLatch1(true)} onTouchEnd={() => setLatch1(false)}
              className={`w-24 h-24 rounded-full border-4 flex items-center justify-center font-bold transition-colors ${latch1 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}
            >LATCH</button>
            <button 
              onMouseDown={() => setLatch2(true)} onMouseUp={() => setLatch2(false)} onMouseLeave={() => setLatch2(false)}
              onTouchStart={() => setLatch2(true)} onTouchEnd={() => setLatch2(false)}
              className={`w-24 h-24 rounded-full border-4 flex items-center justify-center font-bold transition-colors ${latch2 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-500'}`}
            >LATCH</button>
          </div>

          <button 
            onClick={() => handleAction(startInterrogation)}
            disabled={!hasPeeked}
            className="w-full mt-12 py-4 border border-neutral-600 text-white rounded-xl font-bold tracking-widest disabled:opacity-20"
          >
            BEGIN INTERROGATION
          </button>
        </div>
      )}

      {/* --- 3. THE INTERROGATION --- */}
      {phase === 'interrogation' && (
        <div className="flex flex-col items-center w-full animate-fade-in">
          <p className="text-center text-neutral-400 mb-8 uppercase tracking-widest">
            Place phone between<br/>
            <span className="text-blue-400 font-bold">{players[0]?.name}</span> & <span className="text-red-400 font-bold">{players[1]?.name}</span>
          </p>
          
          <Briefcase3D lidAngle={0} status={briefcaseStatus} />

          <div className={`text-9xl font-mono mt-8 transition-colors ${timer <= 15 ? 'text-red-500 scale-105 animate-pulse' : 'text-white'}`}>
            {timer}
          </div>
        </div>
      )}

      {/* --- 4. THE CHOICE --- */}
      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
          <p className="text-center mb-12">
            <span className="text-red-400 font-black text-3xl">{players[1]?.name}</span><br/>
            <span className="text-neutral-400 text-lg">It is time. Make your choice.</span>
          </p>

          <Briefcase3D lidAngle={0} status={briefcaseStatus} />

          <div className="flex w-full gap-4 mt-8">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="flex-1 py-8 bg-red-700 border-b-8 border-red-900 rounded-xl font-black text-2xl tracking-widest shadow-2xl active:translate-y-2 active:border-b-0"
            >
              STEAL
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="flex-1 py-8 bg-neutral-700 border-b-8 border-neutral-900 rounded-xl font-black text-2xl tracking-widest shadow-2xl active:translate-y-2 active:border-b-0"
            >
              LEAVE
            </button>
          </div>
        </div>
      )}

      {/* --- 5. THE RESOLUTION --- */}
      {phase === 'resolution' && eliminationResult && (
        <div className="flex flex-col items-center w-full max-w-sm animate-fade-in text-center">
          
          <Briefcase3D lidAngle={currentLidAngle} status={briefcaseStatus} />

          <div className="mt-8 mb-12">
            <p className="text-neutral-400 mb-2">Challenger chose to <span className="font-bold text-white">{eliminationResult.choice}</span>.</p>
            <h2 className="text-5xl font-black text-red-500 uppercase tracking-wider">{eliminationResult.loser.name}</h2>
            <p className="text-xl font-bold tracking-widest text-neutral-500 mt-1">ELIMINATED</p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full py-5 bg-white text-black rounded-xl font-black text-xl tracking-widest"
          >
            NEXT ROUND
          </button>
        </div>
      )}

      {/* --- 6. GAMEOVER --- */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center animate-fade-in text-center mt-12">
          <h2 className="text-6xl font-black text-blue-400 mb-2 uppercase">{players[0]?.name}</h2>
          <p className="text-xl font-bold tracking-[0.3em] text-neutral-500 mb-12">THE ULTIMATE BLUFFER</p>
          
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-10 py-5 border-2 border-white rounded-full font-bold text-xl tracking-widest"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}