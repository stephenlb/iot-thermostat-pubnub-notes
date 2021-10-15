class Device {
    constructor(settings) {
        this.settings         = settings;
        this.deviceUniqueID   = settings.deviceUniqueID;
        this.deviceSecretKey  = settings.deviceSecretKey;
        this.deviceGroupSalt  = settings.deviceGroupSalt;
        this.devicePublicKey  = settings.devicePublicKey;
        this.devicePrivateKey = settings.devicePrivateKey;
    }

    provision() {
        let result    = network.login(email, pass, pushId);
        this.channels = result.channels;
        this.auth     = result.auth;
        this.uuid     = result.uuid;
    }
}

