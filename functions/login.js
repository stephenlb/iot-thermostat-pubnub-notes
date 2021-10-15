const pubnub  = require('pubnub');
const kvstore = require('kvstore');
const xhr     = require('xhr');

export default (request, response) => {
    const channels = ['devices.12345.*', 'broadcast.*'];
    const uuid     = 'user-12345';

    return request.json().then((user) => {
        let authToken = authenticate(user);
        response.status = 200;
        return response.send({
            uuid:     uuid, 
            channels: channels,
            auth:     authToken,
            devices: ['12345'],
        });
    }).catch((err) => {
        response.status = 400;
        return response.send("Malformed JSON body.");
    });
};

function authenticate(user) {
    console.log(user);
    //pubnub.grantToken();
    return '12345';
}
