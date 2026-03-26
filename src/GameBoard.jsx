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
// 2. NEW MORNING SKY BACKGROUND (Same Animation Style)
// ==============================================
const MorningSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #4A90E2 0%, #FFB75E 100%)' }}>
    <style>{`
      .motes { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .motes-1 {
        background-image: radial-gradient(1.5px 1.5px at 15% 15%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 35% 25%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 55% 55%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 75% 35%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 95% 15%, rgba(255,255,255,0.7), transparent);
        background-size: 100px 100px;
        animation: twinkle 4s ease-in-out infinite;
      }
      .motes-2 {
        background-image: radial-gradient(2px 2px at 25% 45%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 65% 85%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 85% 70%, rgba(255,255,255,0.5), transparent);
        background-size: 150px 150px;
        animation: twinkle 6s ease-in-out infinite 2s;
      }
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
// 3. GLOBAL STYLES
// ==============================================
const GlobalStyles = () => (
  <style>{`
    /* FAQ Button Jello Effect */
    @keyframes jello-vertical { 0% { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(0.75, 1.25, 1); } 40% { transform: scale3d(1.25, 0.75, 1); } 50% { transform: scale3d(0.85, 1.15, 1); } 65% { transform: scale3d(1.05, 0.95, 1); } 75% { transform: scale3d(0.95, 1.05, 1); } 100% { transform: scale3d(1, 1, 1); } }
    .animate-jello-vertical { animation: jello-vertical 0.7s both; }

    /* ====================================================
       NEW: RULE CARD CSS (Blob Design with Pixel Trajectory Fix)
       ==================================================== */
    .rule-card {
      position: relative;
      width: 320px;
      height: 420px;
      border-radius: 14px;
      z-index: 1111;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 15px 50px rgba(0,0,0,0.5); 
    }

    .rule-bg {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 310px;
      height: 410px;
      z-index: 2;
      background: rgba(255, 255, 255, .95);
      backdrop-filter: blur(24px);
      border-radius: 10px;
      overflow: hidden;
      outline: 2px solid white;
    }

    .rule-blob {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background-color: #ff0000;
      opacity: 1;
      filter: blur(20px);
      animation: blob-bounce 5s infinite ease;
    }

    .rule-content {
      position: relative;
      z-index: 3;
      padding: 30px;
      color: #333; 
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-size: 14px;
      line-height: 1.5;
    }

    .rule-heading {
      font-size: 24px;
      text-transform: uppercase;
      font-weight: 900;
      color: #ff0000; 
      text-align: center;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }

    /* Fixed Pixel Trajectory to perfectly outline the 320x420 card */
    @keyframes blob-bounce {
      0%   { transform: translate(-50px, -50px); } 
      25%  { transform: translate(120px, -50px); } 
      50%  { transform: translate(120px, 220px); } 
      75%  { transform: translate(-50px, 220px); } 
      100% { transform: translate(-50px, -50px); } 
    }

    /* Shine Text CSS */
    .shine-text { color: rgba(255, 255, 255, 0.3); background: #222 -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff)) 0 0 no-repeat; background-image: -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%); -webkit-background-clip: text; -webkit-background-size: 50px; -webkit-animation: zezzz 5s infinite; }
    @-webkit-keyframes zezzz { 0%, 10% { background-position: -200px; } 20% { background-position: top left; } 100% { background-position: 200px; } }

    /* EXACT LAKSHAY-ART PODA INPUT CSS */
    .poda { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; max-width: 314px; margin: 0 auto; z-index: 10; }
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
    .theme-switch {
      --toggle-size: 8px;
      --container-width: 5.625em;
      --container-height: 2.5em;
      --container-radius: 6.25em;
      --container-light-bg: #3D7EAE;
      --container-night-bg: #1D1F2C;
      --circle-container-diameter: 3.375em;
      --sun-moon-diameter: 2.125em;
      --sun-bg: #ECCA2F;
      --moon-bg: #C4C9D1;
      --spot-color: #959DB1;
      --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
      --stars-color: #fff;
      --clouds-color: #F3FDFF;
      --back-clouds-color: #AACADF;
      --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
      --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
      box-sizing: border-box;
      font-size: var(--toggle-size);
      display: block;
      cursor: pointer;
    }
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

    /* CEVOROB BURGER MENU CSS (Scaled Down) */
    .burger {
      position: relative;
      width: 24px;
      height: 18px;
      background: transparent;
      cursor: pointer;
      display: block;
      z-index: 60;
      -webkit-tap-highlight-color: transparent;
    }
    .burger input { display: none; }
    .burger span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: white;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .25s ease-in-out;
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .burger span:nth-of-type(1) { top: 0px; transform-origin: left center; }
    .burger span:nth-of-type(2) { top: 50%; transform: translateY(-50%); transform-origin: left center; }
    .burger span:nth-of-type(3) { top: 100%; transform-origin: left center; transform: translateY(-100%); }
    .burger input:checked ~ span:nth-of-type(1) { transform: rotate(45deg); top: -2px; left: 4px; }
    .burger input:checked ~ span:nth-of-type(2) { width: 0%; opacity: 0; }
    .burger input:checked ~ span:nth-of-type(3) { transform: rotate(-45deg); top: 15px; left: 4px; }

    /* STEALTHWORM BUTTON CSS (Start Match Only) */
    .stealth-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: hidden;
      height: 4rem;
      background-size: 300% 300%;
      cursor: pointer;
      backdrop-filter: blur(1rem);
      border-radius: 5rem;
      transition: 0.5s;
      animation: stealth_gradient_301 5s ease infinite;
      border: double 4px transparent;
      background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .stealth-btn:disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }
    .stealth-container-stars { position: absolute; z-index: -1; width: 100%; height: 100%; overflow: hidden; transition: 0.5s; backdrop-filter: blur(1rem); border-radius: 5rem; }
    .stealth-strong { z-index: 2; font-size: 1.125rem; font-weight: 900; letter-spacing: 0.2em; color: #ffffff; text-shadow: 0 0 4px white; text-transform: uppercase; }
    .stealth-glow { position: absolute; display: flex; width: 12rem; }
    .stealth-circle { width: 100%; height: 30px; filter: blur(2rem); animation: stealth_pulse_3011 4s infinite; z-index: -1; }
    .stealth-circle:nth-of-type(1) { background: rgba(254, 83, 186, 0.636); }
    .stealth-circle:nth-of-type(2) { background: rgba(142, 81, 234, 0.704); }
    .stealth-btn:hover .stealth-container-stars { z-index: 1; background-color: #212121; }
    .stealth-btn:hover { transform: scale(1.05); }
    .stealth-btn:active { border: double 4px #fe53bb; background-origin: border-box; background-clip: content-box, border-box; animation: none; transform: scale(0.95); }
    .stealth-btn:active .stealth-circle { background: #fe53bb; }
    .stealth-stars { position: relative; background: transparent; width: 200rem; height: 200rem; }
    .stealth-stars::after { content: ""; position: absolute; top: -10rem; left: -100rem; width: 100%; height: 100%; animation: stealth_animStarRotate 90s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; }
    .stealth-stars::before { content: ""; position: absolute; top: 0; left: -50%; width: 170%; height: 500%; animation: stealth_animStar 60s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; opacity: 0.5; }
    @keyframes stealth_animStar { from { transform: translateY(0); } to { transform: translateY(-135rem); } }
    @keyframes stealth_animStarRotate { from { transform: rotate(360deg); } to { transform: rotate(0); } }
    @keyframes stealth_gradient_301 { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes stealth_pulse_3011 { 0% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); } 100% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); } }

    /* ====================================================
       NEW: BARISDOGANSUTCU SVG BUTTON (Hide & Proceed Only)
       ==================================================== */
    .play-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0 10px;
      color: white;
      text-shadow: 2px 2px rgb(116, 116, 116);
      text-transform: uppercase;
      cursor: pointer;
      border: solid 2px black;
      letter-spacing: 1px;
      font-weight: 600;
      font-size: 17px;
      background-color: hsl(49deg 98% 60%);
      border-radius: 50px;
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease;
      width: 100%;
      max-width: 320px;
      height: 62px;
      margin-top: 1rem;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .play-btn:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .play-btn:active {
      transform: scale(0.9);
      transition: all 100ms ease;
    }

    .play-btn svg {
      transition: all 0.5s ease;
      z-index: 2;
    }

    .play-btn-play {
      transition: all 0.5s ease;
      transition-delay: 300ms;
    }

    .play-btn:hover svg, .play-btn:active svg {
      transform: scale(3) translate(50%);
    }

    .play-btn-now {
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      transition: all 0.5s ease;
      z-index: 2;
    }

    .play-btn:hover .play-btn-now, .play-btn:active .play-btn-now {
      transform: translateX(20px); 
      transition-delay: 300ms;
    }

    .play-btn:hover .play-btn-play, .play-btn:active .play-btn-play {
      transform: translateX(200%);
      transition-delay: 300ms;
    }
  `}</style>
);

// ==============================================
// 4. GAME COMPONENTS
// ==============================================
const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-6 relative w-[190px] h-[254px] [perspective:1000px] font-sans">
      <div 
        className="relative w-full h-full text-center transition-transform duration-[800ms] [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden] border border-[coral] rounded-2xl shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
          style={{ background: 'linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%)', color: 'coral' }}
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
  
  // Rule Modal Controls & Theme Controls
  const [showRules, setShowRules] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);

  useEffect(() => {
    if (phase === 'peek') setHasPeeked(false);
  }, [phase]);

  // Original instant handler for fast UI actions (Add/Remove players, Rules)
  const handleAction = (actionCallback, soundEffect = sfx.tap) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) actionCallback();
  };

  // --- DELAYED ACTION FOR MAJOR PAGE TRANSITIONS (Customizable delay) ---
  const handleDelayedAction = (actionCallback, soundEffect = sfx.tap, delayMs = 250) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) {
      setTimeout(() => {
        actionCallback();
      }, delayMs); 
    }
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
      
      <GlobalStyles />

      {/* --- NEW: BLOB RULE CARD OVERLAY --- */}
      {showRules && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => handleAction(() => setShowRules(false))} 
        >
          <div className="rule-card" onClick={(e) => e.stopPropagation()}>
            <div className="rule-bg"></div>
            <div className="rule-blob"></div>
            <div className="rule-content">
              <p className="rule-heading">How to Play</p>
              <p><strong>1. PEEK:</strong> Secretly check your card. It's either SAFE or ELIMINATE.</p>
              <p><strong>2. FACE:</strong> Keep a straight poker face and hand the phone over.</p>
              <p><strong>3. FATE:</strong> The Challenger must read your face and choose to TAKE or PASS.</p>
              <p><strong>4. OUT:</strong> Whoever ends up holding the ELIMINATE card loses!</p>
            </div>
          </div>
          <p className="text-center text-white/50 text-xs mt-10 tracking-widest uppercase">Tap background to close</p>
        </div>
      )}

      {/* --- LOBBY BACKGROUND (DAY OR NIGHT) --- */}
      {phase === 'lobby' && (isDayMode ? <MorningSky /> : <MidnightSky />)}
      
      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <>
          {/* CEVOROB BURGER BUTTON */}
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
              {/* Checked = Night Mode, Unchecked = Day Mode */}
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
            
            {/* LOBBY TITLE - SHINE EFFECT */}
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
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 pl-2 text-center drop-shadow-md">Recent Players</p>
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

            {/* --- STEALTHWORM START MATCH BUTTON --- */}
            <button 
              onClick={() => handleDelayedAction(startGame)}
              disabled={players.length < 2}
              className="stealth-btn"
            >
              <strong className="stealth-strong">START MATCH</strong>
              <div className="stealth-container-stars">
                <div className="stealth-stars"></div>
              </div>
              <div className="stealth-glow">
                <div className="stealth-circle"></div>
                <div className="stealth-circle"></div>
              </div>
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

          {/* NEW: SVG PLAY/NOW BUTTON - REPLACES HIDE & PROCEED */}
          <button 
            onClick={() => handleDelayedAction(goToChoicePhase, sfx.tap, 850)}
            disabled={!hasPeeked || isHoldingCard}
            className={`play-btn ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
              <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
              <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"></path>
              <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"></path>
              <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"></path>
              <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"></path>
              <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"></path>
              <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"></path>
              <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"></path>
              <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"></path>
            </svg>
            <span className="play-btn-now">now!</span>
            <span className="play-btn-play">play</span>
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
            {/* Added 250ms delay to Take Button */}
            <button 
              onClick={() => handleDelayedAction(() => makeChoice('STEAL'), sfx.tap)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/15 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                TAKE
              </span>
            </button>

            {/* Added 250ms delay to Pass Button */}
            <button 
              onClick={() => handleDelayedAction(() => makeChoice('LEAVE'), sfx.tap)}
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

          {/* Added 250ms delay to Next Match Button */}
          <button 
            onClick={() => handleDelayedAction(nextRound)}
            className="w-full max-w-xs py-5 bg-slate-800 text-white rounded-2xl font-black tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="relative z-10 flex flex-col items-center animate-fade-in text-center mt-16 w-full">
          
          <button 
            onClick={() => handleDelayedAction(backToLobby)}
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
          
          {/* Added 250ms delay to Play Again Button */}
          <button 
            onClick={() => handleDelayedAction(playAgain)}
            className="px-8 py-4 bg-white border-2 border-slate-200 shadow-md rounded-2xl text-slate-800 font-bold tracking-[0.2em] active:bg-slate-50 transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}