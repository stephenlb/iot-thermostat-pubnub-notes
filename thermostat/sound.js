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
        g.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + duration);
    }
}
