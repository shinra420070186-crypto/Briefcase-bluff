class ProceduralAudioEngine {
  constructor() { this.ctx = null; }

  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  _playTone(freq, type, duration, vol = 0.5, slideFreq = null) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    if (slideFreq) osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Refined, premium soft click
  tap() { this._playTone(700, 'sine', 0.04, 0.15); }
  
  // The satisfying name entry sounds - Untouched
  addPlayer() { this._playTone(440, 'sine', 0.15, 0.4); setTimeout(() => this._playTone(660, 'sine', 0.2, 0.4), 100); }
  removePlayer() { this._playTone(660, 'triangle', 0.15, 0.4); setTimeout(() => this._playTone(440, 'triangle', 0.2, 0.4), 100); }
  
  begin() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 1.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  }

  // Heavy mechanical double-click for the briefcase latch
  latchOpen() { 
    this._playTone(60, 'square', 0.05, 0.7); 
    setTimeout(() => this._playTone(180, 'sawtooth', 0.03, 0.4), 30); 
  }
  latchClose() { 
    this._playTone(180, 'sawtooth', 0.03, 0.4); 
    setTimeout(() => this._playTone(60, 'square', 0.05, 0.7), 20); 
  }
  
  timerTick() { this._playTone(1000, 'triangle', 0.1, 0.2); }
  timerUrgent() { this._playTone(1200, 'square', 0.1, 0.3); }
  steal() { this._playTone(300, 'sawtooth', 0.5, 0.4, 800); }
  leave() { this._playTone(800, 'sine', 0.5, 0.4, 300); }
  
  gameOver() {
    if (!this.ctx) return;
    [300, 380, 450].forEach(freq => this._playTone(freq, 'sawtooth', 2.0, 0.3, freq / 2));
  }
}

export const sfx = new ProceduralAudioEngine();