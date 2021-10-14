class Network {
    constructor() {
        this.channels = [];
        this.origin = 'ps.pndsn.com';
        this.publishKey = '';
        this.subscribeKey = '';
        this.pubnub = PubNub({
            origin: this.origin,
            pubkey: this.pubkey,
            subkey: this.subkey,
        });
    }

    async login(email, password) {
        let path = ``;
        let url = `https://${this.origin}/${path}`;
        let result = await fetch(`${uri}`);
        //... capture result and put it into class var
    }

    async provision(device) {
        let id = device.deviceUniqueID;
        let url = `https://${this.origin}/`;
        return await fetch(`${uri}`);
    }

    async connect() {
        let url = `https://${this.origin}/`;
        this.pubnub.subscribe();
        return await fetch(`${uri}`);
    }

    async command(device, command, message) {
        let id = device.deviceUniqueID;
        return this.pubnub.publish({
            channel : `devices.${id}.${command}`,
            message : message
        });
    }
}
