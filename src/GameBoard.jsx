import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

export default function GameBoard() {
  const { 
    phase, players, timer, timerRunning, 
    startGame, startInterrogation, goToChoicePhase, makeChoice, addPlayer, removePlayer
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    if (phase === 'peek') sfx.begin();
    if (phase === 'gameover') sfx.gameOver();
  }, [phase]);

  useEffect(() => {
    if (!timerRunning || timer === 0) {
      if (timer === 0 && phase === 'interrogation') goToChoicePhase();
      return;
    }
    if (timer <= 5) sfx.timerUrgent();
    else if (timer % 5 === 0) sfx.timerTick();
  }, [timer, timerRunning, phase, goToChoicePhase]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-2">Briefcase Bluff</h1>
      <p className="mb-8 text-gray-400">Phase: <span className="uppercase text-yellow-400 font-bold">{phase}</span></p>

      {phase === 'lobby' && (
        <div className="flex flex-col items-center w-full max-w-sm gap-4">
          <div className="flex w-full gap-2">
            <input 
              type="text" 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Player Name"
              className="flex-1 p-3 rounded-lg bg-neutral-800 text-white outline-none"
            />
            <button onClick={handleAddPlayer} className="px-4 py-3 bg-blue-600 rounded-lg font-bold">+</button>
          </div>
          <div className="w-full">
            {players.map(p => (
              <div key={p.id} className="flex justify-between items-center p-3 mb-2 bg-neutral-800 rounded-lg">
                <span>{p.name}</span>
                <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-red-400 font-bold">X</button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handleAction(startGame)}
            disabled={players.length < 2}
            className="w-full mt-4 px-6 py-4 bg-green-600 rounded-lg font-bold disabled:opacity-50 disabled:bg-gray-600"
          >
            Start Game ({players.length} Players)
          </button>
        </div>
      )}

      {phase === 'peek' && (
        <div className="flex flex-col items-center text-center">
          <p className="text-xl mb-6"><span className="font-bold text-blue-400">{players[0]?.name}</span>, pass the case to <span className="font-bold text-red-400">{players[1]?.name}</span>.</p>
          <button 
            onClick={() => handleAction(startInterrogation, sfx.latchOpen)}
            className="px-8 py-4 bg-yellow-600 text-black rounded-lg font-bold text-xl"
          >
            Open Case & Start Interrogation
          </button>
        </div>
      )}

      {phase === 'interrogation' && (
        <div className="flex flex-col items-center">
          <div className={`text-8xl font-mono mb-8 transition-colors ${timer <= 5 ? 'text-red-500' : 'text-white'}`}>
            0:{timer.toString().padStart(2, '0')}
          </div>
          <button 
            onClick={() => handleAction(goToChoicePhase)}
            className="px-6 py-3 bg-neutral-700 rounded-lg font-bold"
          >
            Skip Timer
          </button>
        </div>
      )}

      {phase === 'choice' && (
        <div className="flex flex-col items-center w-full max-w-sm">
          <p className="text-xl mb-8 text-center"><span className="font-bold text-red-400">{players[1]?.name}</span>, what is your choice?</p>
          <div className="flex w-full gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.steal)}
              className="flex-1 py-6 bg-red-600 rounded-lg font-bold text-xl"
            >
              STEAL
            </button>
            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.leave)}
              className="flex-1 py-6 bg-gray-600 rounded-lg font-bold text-xl"
            >
              LEAVE
            </button>
          </div>
        </div>
      )}

      {phase === 'gameover' && (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-green-400 mb-4">{players[0]?.name} WINS!</h2>
          <p className="mb-8">Total surviving players: 1</p>
          <button 
            onClick={() => handleAction(() => window.location.reload())}
            className="px-8 py-4 bg-blue-600 rounded-lg font-bold text-xl"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
