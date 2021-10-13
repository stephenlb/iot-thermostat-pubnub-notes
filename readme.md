# IoT Thermostat Sample App

Home automation app.
Remote control of a thermostat.

 - Device provisioning
 - Device software update
 - Turn on/off
 - Set tempurature
 - Remember last state after reboot

### Software Components

 - Mobile App ( pair/add device )
 - Thermostat firmware
 - Server APIs
 - Data Streaming Provider PubNub
 - AI/ML Data Processing Stream onAfter Functions

### Device Mobile Paring

 1. User connects to local device private WiFi for setup.
 2. Setup requests home WiFi access credentials.
 3. User must pair the device with mobile app from the same wifi network.
 4. IoT Device and mobile app joins wifi network

### Software Components Implementation

 - Functions - REST Endpoint - Mobile app authenticate/authorize
 - Functions - REST Endpoint - Device provision endpoint
 - Functions - REST Endpoint - Send signed/encrypted control signals to devices
 - Functions - REST Endpoint - Issue software upgrade broadcast
 - Functions - OnAfterPublish - AI/ML tracking anomaly detection
 - Presence - Track online status of devices
 - Subscribe - Receive events
 - Grant/Revoke - Add permission to Device/Mobile App to receive events
 - Publish - is only used in Functions for security signatures and command encryption


### Channels used for communication

 - `devices.deviceUniqueID`        - device presence channel
 - `devices.deviceUniqueID-pnpres` - device online status ( app subscribes to check device online status )
 - `devices.deviceUniqueID.*`      - device receives events
 - `devices.deviceUniqueID.state`  - last state of the device to resume after reboot
 - `devices.deviceUniqueID.ping`   - ping device channel
 - `devices.deviceUniqueID.stats`  - device emits periodic stats to this channel ( used for AI/ML Function )
 - `devices.deviceUniqueID.log`    - device emits logs on this channel ( accessible for debugging and mobile app )
 - `brodcast.*`                    - subscribe to all broadcast signals on device
 - `brodcast.softwareUpdate`       - issue software upgrade command to device
 - `brodcast.reboot`               - issue reboot command to all devices

Global_announce_channel  - common channel used by all devices to indicate that they have come online. 
Global_announce_channel-pnpres - common channel for presence detection, only server has access 
Private_<device_unique_id>_channel  - both device and server have read access (pre-granted at time of manufacturing)
Private_<device_unique_id>_channel-pnpres - only server has read access (used to get state information)
<Random_ch_ID> - Private channels used for secure communication during a session

### Device data fields

 - `deviceUniqueID` - Address of the device
 - `deviceSecretKey` - Signature verification
 - `deviceGroupSalt` - Signature verification, appended to signature string and signed by `deviceSecretKey`.
 - `devicePublicKey` - Decrypt message
 - `devicePrivateKey` - Encrypt message

### App data fields

 - `email` - 
 - `passSignature` - 
 - `devicesIdsOwned` - 

 Device_Unique_ID is printed on device - externally visible
 Device_Secret_ID - second ID that is also globally unique but is secret - that is on the firmware and is never transmitted in the clear and is not accessible via any API
 Device_Group_Salt - Code uses Salt that is known to server for that class of devices.  This salt is also on the firmware and never transmitted on the network. Its is dynamically generated for each device group and known to both server and clients of the specific type
 Each device also includes a private key/public key pair for encryption. The public keys for all devices are also sent to the server

