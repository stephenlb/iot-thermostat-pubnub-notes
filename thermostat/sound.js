class Sound {
    constructor() {
        this.context = new AudioContext();
    }

    play(frequency=200.0, type='sine', duration=1) {
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
