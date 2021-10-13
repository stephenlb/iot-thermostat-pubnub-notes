# IoT Thermostat Sample App

Home automation app.
Remote control of a thermostat.

 - Device Provisioning
 - Device Software Update
 - Turn On/Off
 - Set Tempurature
 - Remember Last State after Reboot
 - 

### Data fields

 - `deviceUniqueID` - address of the device
 - `deviceSecretKey` - request/response signature validation
 - `deviceGroupSalt` - request/response signature validation appended to `deviceSecretKey`.
 - `devicePublicKey` - ??????????

 Device_Unique_ID is printed on device - externally visible
 Device_Secret_ID -  second ID that is also globally unique but is secret - that is on the firmware and is never transmitted in the clear and is not accessible via any API
 Device_Group_Salt - Code uses Salt that is known to server for that class of devices.  This salt is also on the firmware and never transmitted on the network. Its is dynamically generated for each device group and known to both server and clients of the specific type
 Each device also includes a private key/public key pair for encryption. The public keys for all devices are also sent to the server

### Software Components

  - Mobile App
  - Thermostat firmware
  - Server APIs
  - Data Streaming Provider PubNub
  - AI/ML Data Processing Stream onAfter Functions

### PubNub Components

 - Functions - REST Endpoint - Mobile app authenticate
 - Functions - REST Endpoint - Device provision
 - Functions - REST Endpoint - Send control signals


### Channels used for communication

Global_announce_channel  - common channel used by all devices to indicate that they have come online. 
Global_announce_channel-pnpres - common channel for presence detection, only server has access 
Private_<device_unique_id>_channel  - both device and server have read access (pre-granted at time of manufacturing)
Private_<device_unique_id>_channel-pnpres - only server has read access (used to get state information)
<Random_ch_ID> - Private channels used for secure communication during a session
