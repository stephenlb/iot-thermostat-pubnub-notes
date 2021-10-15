const settings = new Settings();
const network  = new Network(settings);
const device   = new Device(settings);
const user     = new User(settings);
const sound    = new Sound();

(async ()=>{
'use strict';

if (settings.isUser) {
    await user.login('user@email.com', '12345', '12345');
    let subscription = user.subscribe();
    for await (let message of subscription()) {
        console.log(message);
    }
}
else if (settings.isDevice) {
    await device.provision();
}

})();
