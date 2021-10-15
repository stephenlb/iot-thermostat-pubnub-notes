// Thermostat temperature
let temperature = 72;

class UI {
    constructor() {
        this.temperature = document.querySelector('#temperature');
    }
    updateTemperature(degrees) {
        temperature = degrees;
        this.temperature.innerHTML = degrees;
    }
}

(()=>{
'use strict';

// UI Temperature Values
let dragOffset = 0;

// UI Elements
const body     = document.querySelector('body');
const tempDisp = document.querySelector('#temperature');
const hot      = document.querySelector('#set div.hot');
const cold     = document.querySelector('#set div.cold');

// UI Event Listeners
body.addEventListener('click', readySoundAndScreen, {passive: false});
body.addEventListener('touchend', readySoundAndScreen, {passive: false});
body.addEventListener('mousedown', dragStart, {passive: false});
body.addEventListener('touchstart', dragStart, {passive: false});
body.addEventListener('mousemove', drag, {passive: false});
body.addEventListener('touchmove', drag, {passive: false});

// UI Control Methods
function clientY(event) {
    return (event.touches && event.touches[0] || event).clientY;
}

function dragStart(event) {
    event.preventDefault(); 
    dragOffset = clientY(event);
}

function drag(event) {
    event.preventDefault(); 
    if (event.buttons == 0) return;
    let offset = clientY(event);
    let diff   = dragOffset - offset;
    let change = Math.round(diff / 100);

    hot.style.backgroundPositionY  = -diff + 'px';
    cold.style.backgroundPositionY = -diff + 'px';

    if (change == 0) return;
    setTemperature(temperature + change);
    dragOffset = clientY(event);

    sound.play(240.0, 'sine', 0.2);
}

function readySoundAndScreen() {
    event.preventDefault(); 
    sound.ready();
    if (/iPad|iPhone|Android/.test(navigator.userAgent)) {
        document.documentElement.requestFullscreen();
    }
}

// Update Temperature Display Value
function setTemperature(degrees) {
    if (user.uuid && user.devices) {
        let metadata = {uuid: user.uuid, instanceId: user.instanceId};
        network.commandSend(user.devices[0], 'temp', degrees, metadata);
    }
    temperature = degrees;
    tempDisp.innerHTML = degrees;
}

})();
