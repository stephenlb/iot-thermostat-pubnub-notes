class Network {
    constructor(settings) {
        this.channels = settings.channels;
        this.settings = settings;
        this.origin   = settings.origin;
        this.pubkey   = settings.pubkey;
        this.subkey   = settings.subkey;
        this.pubnub   = PubNub;

        PubNub({
            origin:       this.settings.origin,
            publishKey:   this.settings.pubkey,
            subscribeKey: this.settings.subkey,
        });
    }

    // https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/login
    async login(email, password, pushId) {
        let path   = `login`;
        let url    = `https://${this.origin}/v1/blocks/sub-key/${this.subkey}/${path}`;
        let body   = JSON.stringify({email: email, password: password, pushId: pushId});
        let result = await fetch(url, {method: 'POST', body: body});
        let json   = await result.json();

        this.channels = json.channels;
        this.userId   = json.uuid;
        this.auth     = json.auth;

        return json;
    }

    // https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/provision
    async provision(device) {
        let id      = device.deviceUniqueID;
        let message = {id: id};
        let path    = `login`;
        let url     = `https://${this.origin}/v1/blocks/sub-key/${this.subkey}/${path}`;
        let result  = await fetch(uri);
        return result;
    }

    subscribe(config) {
        const subscription = this.pubnub.subscribe({
            channel: config.channels.join(','),
            auth:    config.auth,
            uuid:    config.uuid,
        });

        return subscription;
    }

    async commandSend(deviceId, command, message, metadata) {
        let transmit = {message: message, command: command, metadata: metadata};
        return this.pubnub.publish({
            channel:  `devices.${deviceId}.${command}`,
            message:  transmit,
            metadata: metadata,
        });
    }
}
