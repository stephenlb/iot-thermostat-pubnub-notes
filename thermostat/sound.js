class Sound {
    constructor() {
        this.isReady = false;
    }

    ready() {
        if (this.context) return;
        this.context = new AudioContext();
        this.isReady = true;
    }

    play(frequency=200.0, type='sine', duration=1) {
        if (!this.isReady) return;

        let o = this.context.createOscillator()
        let g = this.context.createGain()

        o.type = type;
        o.connect(g);
        o.frequency.value = frequency;
        g.connect(this.context.destination);
        o.start(0);

        g.gain.setValueAtTime(g.gain.value, this.context.currentTime); 
        g.gain.exponentialRampToValueAtTime(1e-10, this.context.currentTime + duration);

        setTimeout(() => {
            o.stop(0);
            g.disconnect(this.context.destination);
            o.disconnect(g);
        }, duration * 1000);
    }
}
