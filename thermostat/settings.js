class Settings {
    constructor() {
        this.channels         = [];
        this.origin           = 'ps.pndsn.com';
        this.pubkey           = 'pub-c-cb800fba-8fc7-46e4-838c-5e5c6809d367';
        this.subkey           = 'sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273';
        this.deviceUniqueID   = "12345";
        this.deviceSecretKey  = "12345";
        this.deviceGroupSalt  = "12345";
        this.devicePublicKey  = "12345";
        this.devicePrivateKey = "12345";
        this.isDevice         = location.href.indexOf('isDevice=1') > 0;
        this.isUser           = !this.isDevice;
    }
}
