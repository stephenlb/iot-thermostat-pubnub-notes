(()=>{
'use strict';

const network = new Network();
let sound = null;

// Connect to cloud sending deviceUniqueID
// Receive channels, permissions and saved configuration

// UI Temperature Change
let temperature = 72;
let dragOffset = 0;

const body = document.querySelector('body');
const hot  = document.querySelector('#set div.hot');
const cold = document.querySelector('#set div.cold');

body.addEventListener('click', startSound, {passive: false});
body.addEventListener('touchend', startSound, {passive: false});
body.addEventListener('mousedown', dragStart, {passive: false});
body.addEventListener('touchstart', dragStart, {passive: false});
body.addEventListener('mousemove', drag, {passive: false});
body.addEventListener('touchmove', drag, {passive: false});

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

    if (sound) sound.play(240.0, 'sine', 0.2);
}
function startSound() {
    event.preventDefault(); 
    if (!sound) sound = new Sound(); 
}

const temperatureDisplay = document.querySelector('#temperature');
function setTemperature(degrees) {
    temperature = degrees;
    temperatureDisplay.innerHTML = degrees;
}

})();
