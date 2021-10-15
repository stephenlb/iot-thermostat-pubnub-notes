class Device {
    constructor() {
        this.deviceUniqueID   = "12345";
        this.deviceSecretKey  = "12345";
        this.deviceGroupSalt  = "12345";
        this.devicePublicKey  = "12345";
        this.devicePrivateKey = "12345";
    }

    provision() {
        let result    = network.login(email, pass, pushId);
        this.channels = result.channels;
        this.auth     = result.auth;
        this.uuid     = result.uuid;
    }
}

