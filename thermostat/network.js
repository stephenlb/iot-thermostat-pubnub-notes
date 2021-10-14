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

    async login(email, password, pushId) {
        let path = ``;
        let url = `https://${this.origin}/${path}`;
        let result = await fetch(`${uri}`);
        //... capture result and put it into class var
    }

    // https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/provision
    async provision(device) {
        let id = device.deviceUniqueID;
        let url = `https://${this.origin}/`;
        return await fetch(`${uri}`);
    }

    async commandReceiverStart() {
        let url = `https://${this.origin}/`;
        this.pubnub.subscribe();
        return await fetch(`${uri}`);
    }

    async commandSend(device, command, message) {
        let id = device.deviceUniqueID;
        return this.pubnub.publish({
            channel : `devices.${id}.${command}`,
            message : message
        });
    }
}
