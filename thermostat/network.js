class Network {
    constructor(settings) {
        this.channels = settings.channels;
        this.settings = settings;
        this.pubnub   = PubNub({
            origin:       this.settings.origin,
            publishKey:   this.settings.pubkey,
            subscribeKey: this.settings.subkey,
        });
    }

    // https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/login
    async login(email, password, pushId) {
        let path   = `login`;
        let url    = `https://${this.origin}/${this.subkey}/${path}`;
        let result = await fetch(uri);
        console.log(result);
        //... capture result and put it into class var
    }

    // https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/provision
    async provision(device) {
        let id      = device.deviceUniqueID;
        let message = {id: id};
        let path    = `login`;
        let url     = `https://${this.origin}/${this.subkey}/${path}`;
        let result  = await fetch(uri);
        console.log(result);
        //return await fetch(`${uri}`);
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
