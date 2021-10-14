class User {
    constructor() {
        this.devices = [];
        this.household  = "my house";
    }

    login(email, pass, pushId) {
        let result = network.login(email, pass, pushId);
    }
}

