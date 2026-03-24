class ProceduralAudioEngine {
  constructor() { this.ctx = null; this.heartbeatInterval = null; }

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

  _playNoise(duration, vol, type = 'highpass') {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = 1000;
    const gain = this.ctx.createGain();

    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  tap() { this._playTone(700, 'sine', 0.04, 0.15); }
  addPlayer() { this._playTone(440, 'sine', 0.15, 0.4); setTimeout(() => this._playTone(660, 'sine', 0.2, 0.4), 100); }
  removePlayer() { this._playTone(660, 'triangle', 0.15, 0.4); setTimeout(() => this._playTone(440, 'triangle', 0.2, 0.4), 100); }
  
  // Pneumatic Hiss
  hiss() { this._playNoise(0.5, 0.3, 'highpass'); }
  
  // Metallic Slam
  slam() { 
    this._playTone(60, 'square', 0.1, 0.8); 
    this._playTone(120, 'sawtooth', 0.1, 0.5);
    this._playNoise(0.2, 0.4, 'lowpass'); 
  }

  startHeartbeat() {
    this.stopHeartbeat();
    const playBeat = () => {
      this._playTone(50, 'sine', 0.2, 0.8);
      setTimeout(() => this._playTone(55, 'sine', 0.2, 0.6), 200);
    };
    playBeat();
    this.heartbeatInterval = setInterval(playBeat, 1000);
  }

  setHeartbeatSpeed(speedMultiplier) {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      const playBeat = () => {
        this._playTone(50, 'sine', 0.15, 0.8);
        setTimeout(() => this._playTone(55, 'sine', 0.15, 0.6), 150);
      };
      this.heartbeatInterval = setInterval(playBeat, 1000 / speedMultiplier);
    }
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
  }

  gameOver() { [300, 380, 450].forEach(freq => this._playTone(freq, 'sawtooth', 2.0, 0.3, freq / 2)); }
}

export const sfx = new ProceduralAudioEngine();