class Network {
    constructor() {
        this.channels = [];
        this.origin = 'ps.pndsn.com';
        this.pubkey = '';
        this.subkey = '';
        this.pubnub = PubNub({
            origin: this.origin,
            pubkey: this.pubkey,
            subkey: this.subkey,
        });
    }

    login(email, password) {
        let url = `https://${this.origin}/`;
    }

    provision() {
        let url = `https://${this.origin}/`;
    }

    connect() {
        let url = `https://${this.origin}/`;
    }
}
