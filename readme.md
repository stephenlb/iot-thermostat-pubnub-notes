# IoT PubNub Example App

Home automation app.  Remote control of a thermostat.

 - Device Provisioning
 - Device Software Update
 - Turn On/Off
 - Set Tempurature
 - Remember Last State after Reboot
 - 



 Device_Unique_ID is printed on device - externally visible
 Device_Secret_ID -  second ID that is also globally unique but is secret - that is on the firmware and is never transmitted in the clear and is not accessible via any API
 Device_Group_Salt - Code uses Salt that is known to server for that class of devices.  This salt is also on the firmware and never transmitted on the network. Its is dynamically generated for each device group and known to both server and clients of the specific type
 Each device also includes a private key/public key pair for encryption. The public keys for all devices are also sent to the server
