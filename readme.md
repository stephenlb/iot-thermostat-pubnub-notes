# IoT Thermostat PubNub Notes

Home automation Internet of Things app.
Remote control of a thermostat.
These design notes represent a way to implement a secure IoT application.

### Product Capabilities

 - Device provisioning
 - Device software update
 - Turn on/off thermostat
 - Set thermostat temperature
 - Remember last state after reboot
 - End-user controllable with mobile app
 - Vendor IoT fleet administration
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

### Channels for Communication

 - `devices.deviceUniqueID`          - device presence tracking
 - `devices.deviceUniqueID-pnpres`   - device online status ( app subscribes to check device online status )
 - `devices.deviceUniqueID.*`        - device receives events
 - `devices.deviceUniqueID.off`      - turn off HVAC
 - `devices.deviceUniqueID.on`       - turn on HVAC
 - `devices.deviceUniqueID.temp`     - set thermostat temperature (overrides schedule for a time)
 - `devices.deviceUniqueID.schedule` - set schedule and temperature
 - `devices.deviceUniqueID.reboot`   - issue reboot command to the device
 - `devices.deviceUniqueID.ping`     - ping device channel, causing the LED to blink
 - `devices.deviceUniqueID.stats`    - device emits periodic stats to this channel ( used for AI/ML Function )
 - `devices.deviceUniqueID.log`      - device emits logs on this channel ( accessible for debugging and mobile app )
 - `devices.deviceUniqueID.state`    - last state of the device to resume after reboot
 - `devices.deviceUniqueID.insights` - AI/ML insights channel
 - `devices.deviceUniqueID.anomaly`  - AI/ML anomaly notification
 - `brodcast.*`                      - subscribe to all broadcast signals on device
 - `brodcast.notification`           - displays a message on the mobile app and the IoT Thermostat UI
 - `brodcast.softwareUpdate`         - issue software upgrade command to device
 - `brodcast.reboot`                 - issue reboot command to all devices
 - `brodcast.ping`                   - illuminate the LED on all devices globally, as well as log to `devices.deviceUniqueID.log`
 - `brodcast.saveThePlanet`          - reduces HVAC power consumption world wide

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

 - `name` - Name of the household
 - `passSignature` - access via password authentication stored as a hash
 - `devicesIdsOwned` - list of owned and provisioned device IDs

#### Devices

 - `deviceName` - Name of the device in the household
 - `deviceUniqueID` - Address of the device
 - `deviceSecretKey` - Signature verification
 - `deviceGroupSalt` - Signature verification, appended to signature string and signed by `deviceSecretKey`.
 - `devicePublicKey` - Encrypt message
 - `devicePrivateKey` - Decrypt message

## Workflows

The following are representation of the PubNub APIs used.
Each section represents a workflow of API calls to complete a task or command.

#### IoT Thermostat Device Provision

 - https://ps.pndsn.com/kj rest api

#### IoT Thermostat Device Connect to PubNub

 - https://ps.pndsn.com/kj rest api
 - pubnub.subscribe

#### Mobile App Authentication / Authorization

 - https://ps.pndsn.com/kj rest api
 - pubnub.subscribe

#### Mobile App Send Commands to Thermostat

 - publish/devices.deviceUniqueID.temp/
 - publish/devices.deviceUniqueID.on/
 - publish/devices.deviceUniqueID.off/

