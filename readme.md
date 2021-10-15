# IoT Thermostat PubNub Design Notes

> [Try the demo!](https://stephenlb.github.io/iot-thermostat-pubnub-notes/demo.html)

![IoT Thermostat Design Demo](https://i.imgur.com/jizF15w.gif)

Home automation Internet of Things app.
Remote control of a thermostat.
These design notes represent a way to implement a secure IoT application.

![IoT Thermostat Design](https://i.imgur.com/53WzABI.png)

### Product Capabilities

 - Device provisioning
 - Device software update
 - Turn on/off thermostat
 - Online Status
 - Historical Analytics
 - Set thermostat temperature
 - Remember last state after reboot
 - End-user controllable with mobile app
 - Custom actions to enable chain of events based on household rule settings.
 - Vendor IoT fleet global administration
 - Vendor global view - see all online devices
 - Vendor product expandability while devices are online

### Software Components

 - Mobile App ( pair/add device )
 - Thermostat firmware
 - Server APIs
 - Data Streaming Provider PubNub
 - AI/ML Data Processing Stream onAfter Functions

### Server App Security Implementation

 - Cryptographic signature
 - Public/Private encryption
 - PubNub Access Manager
 - User Authentication

### Device Mobile Paring

 1. User connects to local device private WiFi for setup.
 2. Setup requests household WiFi access credentials.
 3. User must pair the device with mobile app from the same WiFi network.
 4. IoT Device and mobile app joins household WiFi network.
 5. Mobile app remembers IoT Device ID while the device provisions.
 6. The mobile app and thermostat are now linked and provisioned.

### User Device Management

 - Mobile app sends signals to control IoT device.
 - Mobile app retrieves status change records.
 - Mobile app can ping the devices to test uplink.

### Software Components Implementation

 - Functions - REST Endpoint - Mobile app authenticate
 - Functions - REST Endpoint - Device provision - list of channels, and more
 - Functions - REST Endpoint - Send signed/encrypted control signals to devices
 - Functions - onAfterPublish - AI/ML tracking anomaly detection
 - Functions - onBeforePublish - Security signatures and hey asymmetric public key encryption
 - Presence - Track online status of devices
 - Subscribe - Receive events
 - Publish - send signals to thermostat and mobile app
 - Grant Token - Add permission to Device/Mobile App to send and receive events
 - Objects V2 - Users and Device Registry Management

### Channels for Communication

These channels are used for sending/receiving events.

#### Subscribe Channels

Devices will subscribe to `.*` channels to receive events.

 - `devices.deviceUniqueID`   - device presence tracking
 - `devices.deviceUniqueID.*` - device receives events
 - `brodcast.*`               - subscribe to all broadcast signals on device

#### Events and Actions

 - `devices.deviceUniqueID-pnpres`   - device online status ( app subscribes to check device online status )

#### Publish Channels for Device Communication

Devices and servers will publish to these specific channels.

 - `devices.deviceUniqueID.off`      - turn off HVAC
 - `devices.deviceUniqueID.on`       - turn on HVAC
 - `devices.deviceUniqueID.temp`     - set thermostat temperature (overrides schedule for a time)
 - `devices.deviceUniqueID.schedule` - set schedule and temperature
 - `devices.deviceUniqueID.reboot`   - issue reboot command to the device
 - `devices.deviceUniqueID.ping`     - ping device channel, causing the LED to blink

#### Publish Channels for Functions Insights

 - `devices.deviceUniqueID.insights` - AI/ML insights channel
 - `devices.deviceUniqueID.anomaly`  - AI/ML anomaly notification

#### Publish Channels for Device Sensors and Streams

 - `sensors.deviceUniqueID.thermometer` - device emits temperature readings and HVAC efficiency
 - `sensors.deviceUniqueID.stats`       - device emits periodic stats to this channel ( used for AI/ML Function )
 - `sensors.deviceUniqueID.log`         - device emits logs on this channel ( accessible for debugging and mobile app )

#### Publish Channels for Global Device Broadcasting

Vendors may trigger a command on all devices, globally.

 - `brodcast.notification`   - displays a message on the mobile app and the IoT Thermostat UI
 - `brodcast.softwareUpdate` - issue software upgrade command to device
 - `brodcast.reboot`         - issue reboot command to all devices
 - `brodcast.ping`           - illuminate the LED on all devices globally, as well as log to `devices.deviceUniqueID.log`
 - `brodcast.saveThePlanet`  - reduces HVAC power consumption world wide

### Presence ACL

We set the presence ACL to only track presence on `devices.deviceUniqueID` channels.

### PubNub Log Search (Device Analytics)

 - Track device population segments of devices online.
 - Debugging of IoT device and mobile applications.
 - Analyze geographic distribution and device longevity.
 - Analyze end-user activity.

### Data Fields

The two entities are `users` and `devices`.

#### Users

 - `name`            - Name of the household
 - `passSignature`   - access via password authentication stored as a hash
 - `devicesIdsOwned` - list of owned and provisioned device IDs

#### Devices

 - `deviceName`       - Name of the device in the household
 - `deviceUniqueID`   - Address of the device
 - `deviceSecretKey`  - Signature verification
 - `deviceGroupSalt`  - Signature verification, appended to signature string and signed by `deviceSecretKey`.
 - `devicePublicKey`  - Encrypt message
 - `devicePrivateKey` - Decrypt message

## Functions

> See [network.js](thermostat/network.js) source.

APIs to complete a task or command.
Running via PubNub Functions.

![IoT Thermostat Design Secure Workflow](https://i.imgur.com/LOlA86R.png)

#### Mobile App Authentication / Authorization

 -  https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/login

#### IoT Thermostat Device Provision

 - https://ps.pndsn.com/v1/blocks/sub-key/sub-c-c7d8b0d0-2d1d-11ec-83d0-f27e7ede0273/provision

#### IoT Thermostat Device Connect to PubNub

 - `pubnub.subscribe()`

#### Mobile App Send Commands to Thermostat

 - `pubnub.publish()`

