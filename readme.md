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

### Device Mobile Paring

 1. User connects to local device private WiFi for setup.
 2. Setup requests household WiFi access credentials.
 3. User must pair the device with mobile app from the same WiFi network.
 4. IoT Device and mobile app joins household WiFi network.
 5. Mobile app remembers IoT Device ID while the device provisions.
 6. The mobile app and thermostat are now linked and provisioned.

### Software Components Implementation

 - Functions - REST Endpoint - Mobile app authenticate/authorize
 - Functions - REST Endpoint - Device provision endpoint - list of channels, and more.
 - Functions - REST Endpoint - Send signed/encrypted control signals to devices
 - Functions - REST Endpoint - Issue software upgrade broadcast
 - Functions - OnAfterPublish - AI/ML tracking anomaly detection
 - Presence - Track online status of devices
 - Subscribe - Receive events
 - Grant/Revoke - Add permission to Device/Mobile App to receive events
 - Publish - is only used in Functions for security signatures and command encryption

### Channels Used for Communication

 - `devices.deviceUniqueID`        - device presence tracking
 - `devices.deviceUniqueID-pnpres` - device online status ( app subscribes to check device online status )
 - `devices.deviceUniqueID.*`      - device receives events
 - `devices.deviceUniqueID.state`  - last state of the device to resume after reboot
 - `devices.deviceUniqueID.reboot` - issue reboot command to the device
 - `devices.deviceUniqueID.ping`   - ping device channel, causing the LED to blink
 - `devices.deviceUniqueID.stats`  - device emits periodic stats to this channel ( used for AI/ML Function )
 - `devices.deviceUniqueID.log`    - device emits logs on this channel ( accessible for debugging and mobile app )
 - `brodcast.*`                    - subscribe to all broadcast signals on device
 - `brodcast.softwareUpdate`       - issue software upgrade command to device
 - `brodcast.reboot`               - issue reboot command to all devices
 - `brodcast.ping`                 - illuminate the LED on all devices globally, as well as log to `devices.deviceUniqueID.log`

### Presence ACL

We set the presence ACL to only track presence on `devices.deviceUniqueID` channels.

### PubNub Log Search (Device Analytics)

 - Track device population segments of devices online.
 - Debugging of IoT device and mobile applications.
 - Analyze geographic distribution and device longevity.
 - Analyze end-user activity.

### Device Data Fields

 - `deviceUniqueID` - Address of the device
 - `deviceSecretKey` - Signature verification
 - `deviceGroupSalt` - Signature verification, appended to signature string and signed by `deviceSecretKey`.
 - `devicePublicKey` - Encrypt message
 - `devicePrivateKey` - Decrypt message

### Server App Data Fields

 - `name` - Name of the household
 - `passSignature` - access via password authentication stored as a hash
 - `devicesIdsOwned` - list of owned and provisioned device IDs

### Server App Security Implementation

 - Cryptographic signature
 - Public/Private encryption
 - PubNub Access Manager
