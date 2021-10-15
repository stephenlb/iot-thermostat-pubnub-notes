const settings = new Settings();
const network  = new Network(settings);
const device   = new Device(settings);
const user     = new User(settings);
const sound    = new Sound();
const ui       = new UI();

(async ()=>{
'use strict';

if (settings.isUser) {
    await user.login('user@email.com', '12345', '12345');
    let subscription = user.subscribe();
    for await (let event of subscription()) {
        if (event.command == 'temp')
            ui.updateTemperature(event.message);
    }
}
else if (settings.isDevice) {
    await device.provision();
}

})();
