/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

const application = require("tns-core-modules/application");
var firebase = require("nativescript-plugin-firebase");
const appSettings = require("application-settings");
const messaging = require("nativescript-plugin-firebase/messaging");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.

  showNotifications: true,
  showNotificationsWhenInForeground: true,

  onPushTokenReceivedCallback: (token) => {
    console.log('[Firebase] onPushTokenReceivedCallback:', { token });
    applicationSettings.setString('device_token', token);
  },

  onMessageReceivedCallback: (message) => {
    console.log('[Firebase] onMessageReceivedCallback:', { message });

  }

}).then(
  function () {
    console.log("firebase.init done");

    firebase.getCurrentPushToken().then(token => {
      // may be null if not known yet
      console.log(`Current push token: ${token}`);
    });

  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
