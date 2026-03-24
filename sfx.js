class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
  }

  // Must be called on the first user interaction (e.g., a button click)
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Helper to create a standard oscillator + gain envelope
  _playTone(freq, type, duration, vol = 0.5, slideFreq = null) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, this.ctx.currentTime + duration);
    }

    // Attack / Decay envelope to prevent audio popping clicks
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // --- UI SOUNDS ---
  tap() {
    this._playTone(800, 'sine', 0.1, 0.3);
  }

  addPlayer() {
    this._playTone(440, 'sine', 0.15, 0.4);
    setTimeout(() => this._playTone(660, 'sine', 0.2, 0.4), 100);
  }

  removePlayer() {
    this._playTone(660, 'triangle', 0.15, 0.4);
    setTimeout(() => this._playTone(440, 'triangle', 0.2, 0.4), 100);
  }

  // --- GAMEPLAY SOUNDS ---
  begin() {
    // Deep cinematic low-pass sweep
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

  latchOpen() {
    this._playTone(100, 'square', 0.05, 0.5);
    setTimeout(() => this._playTone(150, 'square', 0.05, 0.5), 30);
  }

  latchClose() {
    this._playTone(150, 'square', 0.05, 0.5);
    setTimeout(() => this._playTone(100, 'square', 0.05, 0.5), 40);
  }

  timerTick() {
    this._playTone(1000, 'triangle', 0.1, 0.2);
  }

  timerUrgent() {
    this._playTone(1200, 'square', 0.1, 0.3);
  }

  // --- ACTION SOUNDS ---
  steal() {
    // Aggressive sweeping up tone
    this._playTone(300, 'sawtooth', 0.5, 0.4, 800);
  }

  leave() {
    // Passive sweeping down tone
    this._playTone(800, 'sine', 0.5, 0.4, 300);
  }

  gameOver() {
    if (!this.ctx) return;
    // Dramatic multi-oscillator descent
    const freqs = [300, 380, 450];
    freqs.forEach(freq => {
      this._playTone(freq, 'sawtooth', 2.0, 0.3, freq / 2);
    });
  }
}

export const sfx = new ProceduralAudioEngine();
