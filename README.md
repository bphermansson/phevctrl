# phevctrl

The Mitsubishi Outlander Plugin hybrid uses it's own network and an app to control certain functions. 
This means you have to connect your phone to the car's network before you can control it, for example to activate the AC.
The car's network also has a really short range, so you have to get near the car.
To make this easier there's a project called phevctl (https://github.com/phev-remote), which consists of command line commands to 
control the car. The commands are supposed to be run on a computer with a second network card, a wireless one.
This card is configured and connected to the car's Wifi, so you can control the car easily by just issuing a command.

To make this more available (connect to this computer via SSH exery time is not smooth), I have created a webserver that translates commands (https://gist.github.com/bphermansson/d8137ed1587fb4aa4d5c899b0d7b287f). 
This acts as a form of Rest gateway, different requests to the server runs different phevctl commands. This way you can 
use a browser on another computer instead of connecting via SSH.

But to type different url:s in a browser aint to smooth either. It is the year 2022, so there should be an app for that. And 
that just what this projects is all about, developing an app to control the car in a more convenient way than with the original app.


Dependencies:
https://www.npmjs.com/package/radio-buttons-react-native

npm install @ridenui/react-native-riden-ssh --save
 import RadioForm from 'react-native-simple-radio-button';

 Test drive with; 'npm start'