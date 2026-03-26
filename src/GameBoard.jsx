import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// ==============================================
// 1. NIGHT SKY BACKGROUND
// ==============================================
const MidnightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ backgroundColor: '#050505' }}>
    <style>{`
      .stars { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .stars-1 { background-image: radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(1px 1px at 30% 20%, #fff, transparent), radial-gradient(1px 1px at 50% 50%, #fff, transparent), radial-gradient(1px 1px at 70% 30%, #fff, transparent), radial-gradient(1px 1px at 90% 10%, #fff, transparent); background-size: 100px 100px; animation: twinkle 3s ease-in-out infinite; }
      .stars-2 { background-image: radial-gradient(1.5px 1.5px at 20% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 60% 85%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 65%, #fff, transparent); background-size: 150px 150px; animation: twinkle 5s ease-in-out infinite 1s; }
      .stars-3 { background-image: radial-gradient(2px 2px at 40% 70%, #fff, transparent), radial-gradient(2px 2px at 10% 80%, #fff, transparent), radial-gradient(2px 2px at 80% 40%, #fff, transparent); background-size: 200px 200px; animation: twinkle 7s ease-in-out infinite 2s; }
      .meteor { position: absolute; width: 1.5px; height: 1.5px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5); opacity: 0; pointer-events: none; }
      .meteor::after { content: ""; position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 1px; background: linear-gradient(90deg, #fff, transparent); }
      .m1 { top: 10%; left: 110%; animation: shoot 8s linear infinite; }
      .m2 { top: 30%; left: 110%; animation: shoot 12s linear infinite 4s; }
      .m3 { top: 50%; left: 110%; animation: shoot 10s linear infinite 2s; }
      .moon { position: absolute; top: 15%; right: 15%; width: 40px; height: 40px; border-radius: 50%; background: transparent; box-shadow: 7px 7px 0 0 #fdfbd3; filter: drop-shadow(0 0 7px rgba(253, 251, 211, 0.4)); z-index: 10; }
      @keyframes twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      @keyframes shoot { 0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; } 5% { opacity: 1; } 15% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } 100% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } }
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

// ==============================================
// 2. MORNING SKY BACKGROUND
// ==============================================
const MorningSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #4A90E2 0%, #FFB75E 100%)' }}>
    <style>{`
      .motes { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .motes-1 { background-image: radial-gradient(1.5px 1.5px at 15% 15%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 35% 25%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 55% 55%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 75% 35%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 95% 15%, rgba(255,255,255,0.7), transparent); background-size: 100px 100px; animation: twinkle 4s ease-in-out infinite; }
      .motes-2 { background-image: radial-gradient(2px 2px at 25% 45%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 65% 85%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 85% 70%, rgba(255,255,255,0.5), transparent); background-size: 150px 150px; animation: twinkle 6s ease-in-out infinite 2s; }
      .wind { position: absolute; width: 60px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent); border-radius: 50%; opacity: 0; pointer-events: none; }
      .w1 { top: 15%; left: 110%; animation: breeze 6s linear infinite; }
      .w2 { top: 40%; left: 110%; animation: breeze 10s linear infinite 3s; }
      .w3 { top: 60%; left: 110%; animation: breeze 8s linear infinite 1s; }
      .sun { position: absolute; top: 15%; right: 15%; width: 50px; height: 50px; border-radius: 50%; background: #FFD700; box-shadow: 0 0 40px 15px rgba(255, 215, 0, 0.5); z-index: 10; }
      @keyframes breeze { 0% { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-1500px); opacity: 0; } }
    `}</style>
    <div className="motes motes-1"></div>
    <div className="motes motes-2"></div>
    <div className="wind w1"></div>
    <div className="wind w2"></div>
    <div className="wind w3"></div>
    <div className="sun"></div>
  </div>
);

// ==============================================
// 3. GLOBAL STYLES (Burger, Rule Cards, Animations)
// ==============================================
const GlobalStyles = () => (
  <style>{`
    /* Burger Button CSS */
    .burger { position: relative; width: 30px; height: 22px; background: transparent; cursor: pointer; display: block; z-index: 60; }
    .burger input { display: none; }
    .burger span { display: block; position: absolute; height: 3px; width: 100%; background: #fff; border-radius: 9px; opacity: 1; left: 0; transform: rotate(0deg); transition: .25s ease-in-out; box-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    .burger span:nth-of-type(1) { top: 0px; transform-origin: left center; }
    .burger span:nth-of-type(2) { top: 50%; transform: translateY(-50%); transform-origin: left center; }
    .burger span:nth-of-type(3) { top: 100%; transform-origin: left center; transform: translateY(-100%); }
    .burger input:checked ~ span:nth-of-type(1) { transform: rotate(45deg); top: 0px; left: 5px; }
    .burger input:checked ~ span:nth-of-type(2) { width: 0%; opacity: 0; }
    .burger input:checked ~ span:nth-of-type(3) { transform: rotate(-45deg); top: 21px; left: 5px; }

    /* Kamehame-ha Rule Cards CSS - Updated for Mobile Tap to Reveal */
    .cards { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 280px; }
    .cards .red { background-color: #f43f5e; }
    .cards .blue { background-color: #3b82f6; }
    .cards .green { background-color: #22c55e; }
    .cards .purple { background-color: #a855f7; }
    
    .cards .card { display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; height: 80px; width: 100%; border-radius: 10px; color: white; cursor: pointer; transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 20px rgba(0,0,0,0.3); padding: 10px; outline: none; }
    .cards .card p.tip { font-size: 1.1em; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; transition: all 300ms; }
    
    /* Text Hidden by Default, Expands on Tap/Hover */
    .cards .card p.second-text { font-size: 0.8em; opacity: 0; max-height: 0; font-weight: bold; overflow: hidden; transition: all 400ms ease; margin: 0; }
    
    /* Mobile Focus & Desktop Hover states */
    .cards .card:hover, .cards .card:focus { transform: scale(1.05, 1.05); z-index: 10; height: 110px; }
    .cards .card:hover p.second-text, .cards .card:focus p.second-text { opacity: 1; max-height: 50px; margin-top: 8px; }
    .cards:hover > .card:not(:hover), .cards:focus-within > .card:not(:focus) { filter: blur(4px); transform: scale(0.95, 0.95); opacity: 0.7; }

    /* Flip Card Animations */
    @keyframes rotation_481 { 0% { transform: rotateZ(0deg); } 100% { transform: rotateZ(360deg); } }
    @keyframes floating { 0% { transform: translateY(0px); } 50% { transform: translateY(10px); } 100% { transform: translateY(0px); } }

    /* Shine Text CSS */
    .shine-text { color: rgba(255, 255, 255, 0.3); background: #222 -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff)) 0 0 no-repeat; background-image: -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%); -webkit-background-clip: text; -webkit-background-size: 50px; -webkit-animation: zezzz 5s infinite; }
    @-keyframes zezzz { 0%, 10% { background-position: -200px; } 20% { background-position: top left; } 100% { background-position: 200px; } }

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

    /* Day/Night Theme Switch CSS */
    .theme-switch { --toggle-size: 8px; --container-width: 5.625em; --container-height: 2.5em; --container-radius: 6.25em; --container-light-bg: #3D7EAE; --container-night-bg: #1D1F2C; --circle-container-diameter: 3.375em; --sun-moon-diameter: 2.125em; --sun-bg: #ECCA2F; --moon-bg: #C4C9D1; --spot-color: #959DB1; --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1); --stars-color: #fff; --clouds-color: #F3FDFF; --back-clouds-color: #AACADF; --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25); --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17); box-sizing: border-box; font-size: var(--toggle-size); display: block; cursor: pointer; }
    .theme-switch *, .theme-switch *::before, .theme-switch *::after { box-sizing: border-box; margin: 0; padding: 0; font-size: var(--toggle-size); }
    .theme-switch__container { width: var(--container-width); height: var(--container-height); background-color: var(--container-light-bg); border-radius: var(--container-radius); overflow: hidden; cursor: pointer; box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94); transition: var(--transition); position: relative; }
    .theme-switch__container::before { content: ""; position: absolute; z-index: 1; inset: 0; box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset; border-radius: var(--container-radius); }
    .theme-switch__checkbox { display: none; }
    .theme-switch__circle-container { width: var(--circle-container-diameter); height: var(--circle-container-diameter); background-color: rgba(255, 255, 255, 0.1); position: absolute; left: var(--circle-container-offset); top: var(--circle-container-offset); border-radius: var(--container-radius); box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1); display: flex; transition: var(--circle-transition); pointer-events: none; }
    .theme-switch__sun-moon-container { pointer-events: auto; position: relative; z-index: 2; width: var(--sun-moon-diameter); height: var(--sun-moon-diameter); margin: auto; border-radius: var(--container-radius); background-color: var(--sun-bg); box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset; filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25)); overflow: hidden; transition: var(--transition); }
    .theme-switch__moon { transform: translateX(100%); width: 100%; height: 100%; background-color: var(--moon-bg); border-radius: inherit; box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset; transition: var(--transition); position: relative; }
    .theme-switch__spot { position: absolute; top: 0.75em; left: 0.312em; width: 0.75em; height: 0.75em; border-radius: var(--container-radius); background-color: var(--spot-color); box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset; }
    .theme-switch__spot:nth-of-type(2) { width: 0.375em; height: 0.375em; top: 0.937em; left: 1.375em; }
    .theme-switch__spot:nth-last-of-type(3) { width: 0.25em; height: 0.25em; top: 0.312em; left: 0.812em; }
    .theme-switch__clouds { width: 1.25em; height: 1.25em; background-color: var(--clouds-color); border-radius: var(--container-radius); position: absolute; bottom: -0.625em; left: 0.312em; box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color); transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25); }
    .theme-switch__stars-container { position: absolute; color: var(--stars-color); top: -100%; left: 0.312em; width: 2.75em; height: auto; transition: var(--transition); }
    .theme-switch__checkbox:checked + .theme-switch__container { background-color: var(--container-night-bg); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container { left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter)); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover { left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em) }
    .theme-switch__circle-container:hover { left: calc(var(--circle-container-offset) + 0.187em); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon { transform: translate(0); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds { bottom: -4.062em; }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container { top: 50%; transform: translateY(-50%); }
  `}</style>
);

// ==============================================
// 4. GAME COMPONENTS
// ==============================================
const FlipCard = ({ isFlipped, status }) => {
  const isSafe = status === 'SAFE';

  return (
    <div className="my-6 relative w-[190px] h-[254px] [perspective:1000px] font-sans">
      <div 
        className="relative w-full h-full text-center transition-transform duration-[600ms] [transform-style:preserve-3d] shadow-[0_0_10px_1px_rgba(0,0,0,0.8)] rounded-[5px]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* --- BACK SIDE (Cover Side / THE DECK) --- */}
        <div className="absolute w-full h-full bg-[#151515] [backface-visibility:hidden] rounded-[5px] overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute w-[160px] h-[160%] bg-[linear-gradient(90deg,transparent,#ff9966,#ff9966,#ff9966,#ff9966,transparent)] animate-[rotation_481_5000ms_infinite_linear]"></div>
          <div className="absolute w-[98%] h-[98%] bg-[#151515] rounded-[5px] text-white flex flex-col items-center justify-center gap-6 z-10">
            <svg stroke="#ffffff" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">
              <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z M 16.46875 9.09375L0.0625 48.625C-0.09375 48.996094 -0.00390625 49.433594 0.28125 49.71875C0.472656 49.910156 0.738281 50 1 50C1.128906 50 1.253906 49.988281 1.375 49.9375L40.90625 33.59375C40.523438 32.242188 40.222656 31.449219 40.21875 31.4375C39.351563 29.089844 36.816406 23.128906 31.875 18.1875C27.035156 13.34375 21.167969 10.804688 18.875 9.9375C18.84375 9.925781 17.8125 9.5 16.46875 9.09375 Z M 17 16C19.761719 16 22 18.238281 22 21C22 23.761719 19.761719 26 17 26C15.140625 26 13.550781 24.972656 12.6875 23.46875L15.6875 16.1875C16.101563 16.074219 16.550781 16 17 16 Z M 31 22C32.65625 22 34 23.34375 34 25C34 25.917969 33.585938 26.730469 32.9375 27.28125L32.90625 27.28125C33.570313 27.996094 34 28.949219 34 30C34 32.210938 32.210938 34 30 34C27.789063 34 26 32.210938 26 30C26 28.359375 26.996094 26.960938 28.40625 26.34375L28.3125 26.3125C28.117188 25.917969 28 25.472656 28 25C28 23.34375 29.34375 22 31 22 Z M 21 32C23.210938 32 25 33.789063 25 36C25 36.855469 24.710938 37.660156 24.25 38.3125L20.3125 39.9375C18.429688 39.609375 17 37.976563 17 36C17 33.789063 18.789063 32 21 32 Z M 9 34C10.65625 34 12 35.34375 12 37C12 38.65625 10.65625 40 9 40C7.902344 40 6.960938 39.414063 6.4375 38.53125L8.25 34.09375C8.488281 34.03125 8.742188 34 9 34Z"></path>
            </svg>
            <strong className="tracking-widest uppercase">THE DECK</strong>
            <p className="text-[9px] uppercase tracking-widest text-white/50">{isFlipped ? 'Revealing...' : 'Hold to View'}</p>
          </div>
        </div>

        {/* --- FRONT SIDE (Revealed Side / SAFE or ELIMINATE) --- */}
        <div className="absolute w-full h-full bg-[#151515] [backface-visibility:hidden] rounded-[5px] overflow-hidden [transform:rotateY(180deg)] text-white">
          <div className="absolute w-full h-full object-cover">
            <div className={`absolute w-[90px] h-[90px] rounded-full blur-[15px] animate-[floating_2600ms_infinite_linear] ${isSafe ? 'bg-emerald-400' : 'bg-rose-500'}`}></div>
            <div className={`absolute w-[150px] h-[150px] rounded-full blur-[15px] animate-[floating_2600ms_infinite_linear] left-[50px] top-[0px] [animation-delay:-800ms] ${isSafe ? 'bg-emerald-600' : 'bg-rose-600'}`}></div>
            <div className={`absolute w-[30px] h-[30px] rounded-full blur-[15px] animate-[floating_2600ms_infinite_linear] left-[160px] top-[-80px] [animation-delay:-1800ms] ${isSafe ? 'bg-emerald-300' : 'bg-rose-400'}`}></div>
          </div>

          <div className="absolute w-full h-full p-3 flex flex-col justify-between z-10">
            <small className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-[2px] w-fit text-[10px] tracking-widest uppercase">{status}</small>
            
            <div className="shadow-[0_0_10px_5px_rgba(0,0,0,0.5)] w-full p-3 bg-black/60 backdrop-blur-sm rounded-[5px] text-left">
              <div className="flex justify-between items-center w-full">
                <p className={`font-black uppercase tracking-widest text-sm ${isSafe ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {isSafe ? 'SAFE' : 'ELIMINATE'}
                </p>
                {isSafe ? (
                  <svg fill="none" height="15px" width="15px" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" className="text-emerald-400"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg fill="none" height="15px" width="15px" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" className="text-rose-500"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <p className="text-white/50 mt-2 text-[8px] uppercase tracking-widest">
                {isSafe ? 'You survive this round' : 'Game Over for you'}
              </p>
            </div>
          </div>
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
  
  const [showRules, setShowRules] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);

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
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-transparent font-sans text-slate-800 select-none overflow-x-hidden w-full">
      
      <GlobalStyles />

      {/* --- KAMEHAME-HA RULE CARDS OVERLAY --- */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="cards mt-12">
            <div className="card red" tabIndex="0">
              <p className="tip">1. PEEK</p>
              <p className="second-text">Secretly tap & hold to view your card.</p>
            </div>
            <div className="card blue" tabIndex="0">
              <p className="tip">2. FACE</p>
              <p className="second-text">Keep a straight face and hand it over.</p>
            </div>
            <div className="card green" tabIndex="0">
              <p className="tip">3. FATE</p>
              <p className="second-text">Challenger chooses to TAKE or PASS.</p>
            </div>
            <div className="card purple" tabIndex="0">
              <p className="tip">4. OUT!</p>
              <p className="second-text">Holding ELIMINATE? You lose!</p>
            </div>
          </div>
        </div>
      )}

      {/* --- GLOBAL BACKGROUND (DAY OR NIGHT) --- */}
      {isDayMode ? <MorningSky /> : <MidnightSky />}
      
      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <>
          {/* --- BURGER / CROSS MENU (FIXED TOP LEFT) --- ONLY IN LOBBY */}
          <div className="fixed top-6 left-6 z-[60]">
            <label className="burger" htmlFor="burger">
              <input 
                type="checkbox" 
                id="burger" 
                checked={showRules} 
                onChange={() => handleAction(() => setShowRules(!showRules))} 
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          {/* DAY/NIGHT TOGGLE SWITCH - TOP RIGHT */}
          <div className="fixed top-6 right-6 z-40 shadow-xl rounded-full">
            <label className="theme-switch" htmlFor="theme-switch-toggle">
              <input type="checkbox" id="theme-switch-toggle" className="theme-switch__checkbox" checked={!isDayMode} onChange={() => handleAction(() => setIsDayMode(!isDayMode))} />
              <div className="theme-switch__container">
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
                  </svg>
                </div>
                <div className="theme-switch__circle-container">
                  <div className="theme-switch__sun-moon-container">
                    <div className="theme-switch__moon">
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm animate-fade-in py-8 mt-4">
            
            {/* LOBBY TITLE */}
            <h1 className="shine-text text-4xl font-black tracking-[0.2em] mb-8 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
              The Deck
            </h1>
            
            {/* NEON ANIMATED INPUT */}
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
                  
                  <div className="poda-add-btn" onClick={handleAddPlayer}>
                    <svg preserveAspectRatio="none" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="#d6d6e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  
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

            {/* Recent Players List */}
            {availableRecentNames.length > 0 && (
              <div className="w-full mb-6">
                <p className="text-[10px] text-white uppercase tracking-widest mb-3 pl-2 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Recent Players</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {availableRecentNames.slice(0, 6).map(name => (
                    <button 
                      key={name} 
                      onClick={() => handleAction(() => addPlayer(name), sfx.addPlayer)} 
                      className="px-4 py-2 bg-[#222] text-[#e81cff] border border-[#e81cff]/30 rounded-full text-xs font-bold tracking-wider active:scale-95 transition-all shadow-md"
                    >
                      + {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Added Players List */}
            <div className="w-full space-y-2 mb-10 max-h-[300px] overflow-y-auto px-2">
              {players.map((p) => (
                <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-[#010201]/80 backdrop-blur-md border border-[#40c9ff]/30 rounded-2xl shadow-sm transition-all">
                  <span className="font-bold tracking-widest text-white">{p.name}</span>
                  <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-rose-500 font-bold active:scale-90 flex items-center justify-center w-6 h-6">✕</button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleAction(startGame)}
              disabled={players.length < 2}
              className={`relative w-full py-5 rounded-[10rem] font-black text-lg tracking-[0.2em] shadow-[0_0_15px_-5px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 ${
                players.length < 2 
                  ? 'bg-[#222] text-slate-500 opacity-50 pointer-events-none' 
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
          <p className="text-white uppercase tracking-widest text-[10px] mb-2 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Current Player</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{players[0]?.name}</h2>

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
          <p className="text-white uppercase tracking-widest text-[10px] mb-2 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Challenger</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-white tracking-widest uppercase text-[10px] mt-6 mb-3 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            <button 
              onClick={() => handleAction(() => makeChoice('STEAL'), sfx.tap)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/30 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                TAKE
              </span>
            </button>

            <button 
              onClick={() => handleAction(() => makeChoice('LEAVE'), sfx.tap)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/30 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
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

          <div className="mt-4 mb-6 w-full max-w-xs bg-white/90 backdrop-blur-sm border border-slate-100 shadow-xl rounded-2xl py-5">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest mb-1">{roundResult.loser.name}</h2>
            <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px]">Eliminated</p>
            <div className="h-px w-1/3 bg-slate-200 mx-auto my-3"></div>
            <p className="text-slate-500 text-[10px] tracking-widest uppercase font-bold">
              Win Streak: {displayStreak} / {Math.max(initialRoster.length - 1, 2)}
            </p>
          </div>

          <button 
            onClick={() => handleAction(nextRound)}
            className="w-full max-w-xs py-5 bg-slate-900 text-white rounded-2xl font-black tracking-[0.2em] shadow-2xl active:scale-95 transition-transform border border-slate-700"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="relative z-10 flex flex-col items-center animate-fade-in text-center mt-16 w-full">
          
          <button 
            onClick={() => handleAction(backToLobby)}
            className="group fixed top-6 right-6 flex items-center justify-center h-10 px-3 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg rounded-lg text-slate-700 font-bold tracking-widest uppercase text-[10px] active:scale-95 active:-translate-y-1 active:shadow-md transition-all duration-200 z-50"
          >
            <svg className="h-4 w-4 mr-1 transition-transform duration-300 group-active:-translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            BACK
          </button>

          <div className="w-24 h-24 bg-white/20 backdrop-blur-md shadow-[0_10px_40px_rgba(255,255,255,0.4)] flex items-center justify-center rounded-full text-5xl mb-6 border-2 border-white/50">👑</div>
          <h2 className="text-5xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{players[0]?.name}</h2>
          <p className="text-white font-black tracking-[0.4em] mb-16 uppercase text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Game Champion</p>
          
          <button 
            onClick={() => handleAction(playAgain)}
            className="px-10 py-5 bg-white border-2 border-slate-300 shadow-xl rounded-2xl text-slate-900 font-black tracking-[0.2em] active:scale-95 transition-all"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}