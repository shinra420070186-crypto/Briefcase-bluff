import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// ==============================================
// 1. NIGHT SKY BACKGROUND
// ==============================================
const MidnightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ backgroundColor: '#050505' }}>
    <style>{`
      .stars { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; will-change: opacity; transform: translateZ(0); }
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
      .meteor { position: absolute; width: 1.5px; height: 1.5px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5); opacity: 0; pointer-events: none; will-change: transform, opacity; transform: translateZ(0); }
      .meteor::after { content: ""; position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 1px; background: linear-gradient(90deg, #fff, transparent); }
      .m1 { top: 10%; left: 110%; animation: shoot 8s linear infinite; }
      .m2 { top: 30%; left: 110%; animation: shoot 12s linear infinite 4s; }
      .m3 { top: 50%; left: 110%; animation: shoot 10s linear infinite 2s; }
      .moon { position: absolute; top: 15%; right: 15%; width: 40px; height: 40px; border-radius: 50%; background: transparent; box-shadow: 7px 7px 0 0 #fdfbd3; filter: drop-shadow(0 0 7px rgba(253, 251, 211, 0.4)); z-index: 10; transform: translateZ(0); }
      
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
      .motes { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; will-change: opacity; transform: translateZ(0); }
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
      .wind { position: absolute; width: 60px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent); border-radius: 50%; opacity: 0; pointer-events: none; will-change: transform, opacity; transform: translateZ(0); }
      .w1 { top: 15%; left: 110%; animation: breeze 6s linear infinite; }
      .w2 { top: 40%; left: 110%; animation: breeze 10s linear infinite 3s; }
      .w3 { top: 60%; left: 110%; animation: breeze 8s linear infinite 1s; }
      .sun { position: absolute; top: 15%; right: 15%; width: 50px; height: 50px; border-radius: 50%; background: #FFD700; box-shadow: 0 0 40px 15px rgba(255, 215, 0, 0.5); z-index: 10; transform: translateZ(0); }
      
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
// 3. ACTIVE GAME SKY (TWILIGHT)
// ==============================================
const TwilightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #2B1055 0%, #7597DE 100%)' }}>
    <style>{`
      .twinkle-stars { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; will-change: opacity; transform: translateZ(0); }
      .tw-1 {
        background-image: radial-gradient(1px 1px at 15% 15%, #fff, transparent), radial-gradient(1px 1px at 35% 25%, #fff, transparent), radial-gradient(1px 1px at 55% 55%, #fff, transparent), radial-gradient(1px 1px at 75% 35%, #fff, transparent), radial-gradient(1px 1px at 95% 15%, #fff, transparent);
        background-size: 100px 100px;
        animation: twilight-twinkle 4s ease-in-out infinite;
      }
      .tw-2 {
        background-image: radial-gradient(1.5px 1.5px at 25% 45%, #fff, transparent), radial-gradient(1.5px 1.5px at 65% 85%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 70%, #fff, transparent);
        background-size: 150px 150px;
        animation: twilight-twinkle 6s ease-in-out infinite 2s;
      }
      .tw-3 {
        background-image: radial-gradient(2px 2px at 40% 70%, #fff, transparent), radial-gradient(2px 2px at 10% 80%, #fff, transparent), radial-gradient(2px 2px at 80% 40%, #fff, transparent);
        background-size: 200px 200px;
        animation: twilight-twinkle 7s ease-in-out infinite 3s;
      }
      .tw-meteor { position: absolute; width: 1.5px; height: 1.5px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5); opacity: 0; pointer-events: none; will-change: transform, opacity; transform: translateZ(0); }
      .tw-meteor::after { content: ""; position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 1px; background: linear-gradient(90deg, #fff, transparent); }
      .tw-m1 { top: 15%; left: 110%; animation: twilight-shoot 6s linear infinite; }
      .tw-m2 { top: 45%; left: 110%; animation: twilight-shoot 10s linear infinite 3s; }
      .tw-m3 { top: 65%; left: 110%; animation: twilight-shoot 8s linear infinite 1s; }
      .tw-body { position: absolute; top: 15%; right: 15%; width: 45px; height: 45px; border-radius: 50%; background: #FF9A9E; box-shadow: 0 0 50px 15px rgba(255, 154, 158, 0.6); z-index: 10; transform: translateZ(0); }

      @keyframes twilight-twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      @keyframes twilight-shoot { 0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; } 5% { opacity: 1; } 15% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } 100% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } }
    `}</style>
    <div className="twinkle-stars tw-1"></div>
    <div className="twinkle-stars tw-2"></div>
    <div className="twinkle-stars tw-3"></div>
    <div className="tw-meteor tw-m1"></div>
    <div className="tw-meteor tw-m2"></div>
    <div className="tw-meteor tw-m3"></div>
    <div className="tw-body"></div>
  </div>
);

// ==============================================
// 4. GLOBAL STYLES
// ==============================================
const GlobalStyles = () => (
  <style>{`
    /* FAQ Button Jello Effect */
    @keyframes jello-vertical { 0% { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(0.75, 1.25, 1); } 40% { transform: scale3d(1.25, 0.75, 1); } 50% { transform: scale3d(0.85, 1.15, 1); } 65% { transform: scale3d(1.05, 0.95, 1); } 75% { transform: scale3d(0.95, 1.05, 1); } 100% { transform: scale3d(1, 1, 1); } }
    .animate-jello-vertical { animation: jello-vertical 0.7s both; }

    /* RULE CARD CSS (Blob Design with Pixel Trajectory Fix) */
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
      -webkit-backdrop-filter: blur(24px);
      border-radius: 10px;
      overflow: hidden;
      outline: 2px solid white;
      transform: translateZ(0);
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
      will-change: transform;
      transform: translateZ(0);
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
    .poda-white, .poda-border, .poda-darkBorderBg, .poda-glow { max-height: 70px; max-width: 314px; height: 100%; width: 100%; position: absolute; overflow: hidden; z-index: -1; border-radius: 12px; transform: translateZ(0); }
    .poda-white { max-height: 63px; max-width: 307px; border-radius: 10px; filter: blur(2px); }
    .poda-white::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(83deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.4); background-image: conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%); transition: all 2s; will-change: transform; }
    .poda-border { max-height: 59px; max-width: 303px; border-radius: 11px; filter: blur(0.5px); }
    .poda-border::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(70deg); position: absolute; width: 600px; height: 600px; filter: brightness(1.3); background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%); transition: all 2s; will-change: transform; }
    .poda-darkBorderBg { max-height: 65px; max-width: 312px; }
    .poda-darkBorderBg::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(82deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%); transition: all 2s; will-change: transform; }
    .poda-glow { overflow: hidden; filter: blur(30px); opacity: 0.4; max-height: 130px; max-width: 354px; }
    .poda-glow::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(60deg); position: absolute; width: 999px; height: 999px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%); transition: all 2s; will-change: transform; }
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
    .theme-switch__container { width: var(--container-width); height: var(--container-height); background-color: var(--container-light-bg); border-radius: var(--container-radius); overflow: hidden; cursor: pointer; box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94); transition: var(--transition); position: relative; transform: translateZ(0); }
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

    /* CEVOROB BURGER MENU CSS */
    .burger {
      position: relative;
      width: 40px;
      height: 30px;
      background: transparent;
      cursor: pointer;
      display: block;
      z-index: 60;
      -webkit-tap-highlight-color: transparent;
      transform: scale(0.5); 
      transform-origin: top left;
    }
    .burger input { display: none; }
    .burger span {
      display: block;
      position: absolute;
      height: 4px;
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
    .burger input:checked ~ span:nth-of-type(1) { transform: rotate(45deg); top: 0px; left: 5px; }
    .burger input:checked ~ span:nth-of-type(2) { width: 0%; opacity: 0; }
    .burger input:checked ~ span:nth-of-type(3) { transform: rotate(-45deg); top: 28px; left: 5px; }

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
    .stealth-container-stars { position: absolute; z-index: -1; width: 100%; height: 100%; overflow: hidden; transition: 0.5s; backdrop-filter: blur(1rem); border-radius: 5rem; transform: translateZ(0); }
    .stealth-strong { z-index: 2; font-size: 1.125rem; font-weight: 900; letter-spacing: 0.2em; color: #ffffff; text-shadow: 0 0 4px white; text-transform: uppercase; }
    .stealth-glow { position: absolute; display: flex; width: 12rem; }
    .stealth-circle { width: 100%; height: 30px; filter: blur(2rem); animation: stealth_pulse_3011 4s infinite; z-index: -1; will-change: transform, box-shadow; transform: translateZ(0); }
    .stealth-circle:nth-of-type(1) { background: rgba(254, 83, 186, 0.636); }
    .stealth-circle:nth-of-type(2) { background: rgba(142, 81, 234, 0.704); }
    .stealth-btn:hover .stealth-container-stars { z-index: 1; background-color: #212121; }
    .stealth-btn:hover { transform: scale(1.05); }
    .stealth-btn:active { border: double 4px #fe53bb; background-origin: border-box; background-clip: content-box, border-box; animation: none; transform: scale(0.95); }
    .stealth-btn:active .stealth-circle { background: #fe53bb; }
    .stealth-stars { position: relative; background: transparent; width: 200rem; height: 200rem; }
    .stealth-stars::after { content: ""; position: absolute; top: -10rem; left: -100rem; width: 100%; height: 100%; animation: stealth_animStarRotate 90s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; will-change: transform; }
    .stealth-stars::before { content: ""; position: absolute; top: 0; left: -50%; width: 170%; height: 500%; animation: stealth_animStar 60s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; opacity: 0.5; will-change: transform; }
    @keyframes stealth_animStar { from { transform: translateY(0); } to { transform: translateY(-135rem); } }
    @keyframes stealth_animStarRotate { from { transform: rotate(360deg); } to { transform: rotate(0); } }
    @keyframes stealth_gradient_301 { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes stealth_pulse_3011 { 0% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); } 100% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); } }

    /* BARISDOGANSUTCU SVG BUTTON (Hide & Proceed Only) */
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
      margin-top: 1rem;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      transform: translateZ(0);
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
      transform: translateX(10px); 
      transition-delay: 300ms;
    }

    .play-btn:hover .play-btn-play, .play-btn:active .play-btn-play {
      transform: translateX(200%);
      transition-delay: 300ms;
    }

    /* TIAGOADAG GLOWING FLIP CARD CSS */
    .tiago-card {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateZ(0);
    }

    .tiago-card2 {
      width: 100%;
      height: 100%;
      background-color: #1a1a1a;
      border-radius: 20px;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* The "active" class acts as our programmatic hover */
    .tiago-card2.active {
      transform: scale(0.98);
    }
  `}</style>
);

// ==============================================
// 5. GAME COMPONENTS
// ==============================================
const FlipCard = ({ isFlipped, status }) => {
  const isSafe = status === 'SAFE';
  
  return (
    <div className="my-6 relative w-[190px] h-[254px] [perspective:1000px] font-sans">
      <div 
        className="relative w-full h-full text-center transition-transform duration-[800ms] [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* FRONT OF CARD (Dormant State) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden]">
          <div className="tiago-card" style={{ background: 'linear-gradient(163deg, #444 0%, #222 100%)' }}>
            <div className="tiago-card2">
              <p className="text-2xl font-black tracking-widest m-0 uppercase text-slate-500">THE DECK</p>
              <p className="mt-2 font-bold tracking-[0.2em] text-[10px] uppercase text-slate-600">
                {isFlipped ? 'Revealing...' : 'Hold to View'}
              </p>
            </div>
          </div>
        </div>

        {/* BACK OF CARD (Glowing Active State) */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div 
            className="tiago-card"
            style={{ 
              backgroundImage: isSafe 
                ? 'linear-gradient(163deg, #00ff75 0%, #3700ff 100%)' 
                : 'linear-gradient(163deg, #ff003c 0%, #c70039 100%)',
              boxShadow: isFlipped 
                ? (isSafe ? '0px 0px 30px 1px rgba(0, 255, 117, 0.4)' : '0px 0px 30px 1px rgba(255, 0, 60, 0.4)') 
                : 'none'
            }}
          >
            <div className={`tiago-card2 ${isFlipped ? 'active' : ''}`}>
              <p 
                className="text-3xl font-black tracking-widest m-0 drop-shadow-md" 
                style={{ color: isSafe ? '#00ff75' : '#ff003c' }}
              >
                {isSafe ? 'SAFE' : 'ELIMINATE'}
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

  // --- EXACTLY 250MS DELAY FOR MAJOR PAGE TRANSITIONS ---
  const handleDelayedAction = (actionCallback, soundEffect = sfx.tap, delayMs = 250) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) {
      setTimeout(() => {
        actionCallback();
      }, delayMs); // Uses 250ms normally, 850ms for the Play button
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

      {/* --- BLOB RULE CARD OVERLAY --- */}
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

      {/* --- DYNAMIC BACKGROUND HANDLING --- */}
      {phase === 'lobby' ? (
        (isDayMode ? <MorningSky /> : <MidnightSky />)
      ) : (
        <TwilightSky /> /* Twilight Sky for Active Game */
      )}
      
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
              <input type="checkbox" id="theme-switch-toggle" className="theme-switch__checkbox" checked={!isDayMode} onChange={() => handleAction(() =>