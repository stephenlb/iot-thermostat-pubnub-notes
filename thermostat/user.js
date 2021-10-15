class User {
    constructor() {
        this.devices = [];
        this.household  = "my house";
    }

    async login(email, pass, pushId) {
        let config    = await network.login(email, pass, pushId);
        this.devices  = config.devices;
        this.channels = config.channels;
        this.auth     = config.auth;
        this.uuid     = config.uuid;
        return config;
    }

    subscribe() {
         this.subscription = network.subscribe(this);
         return this.subscription;
    }
}

