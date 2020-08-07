const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.onNavigatingTo = args => {

    const page = args.object;

    firebase.analytics.setScreenName({
        screenName: "Login"
      }).then(
          function () {
            console.log("Screen name set");
          }
      );

    console.log("1");

    if (appSettings.hasKey("loginUsername")) {

        const navigationEntry = {
            moduleName: "main-page",
            clearHistory: true,
            context: {
                "username": appSettings.getString("loginUsername")
            }
        };
        
            page.frame.navigate(navigationEntry);

    }

}


exports.onLogin = args => {

    const button = args.object;
    const page = button.page;

    const authcode = randomString(8, '135780qwertyuiopasdfghjklzxcvbnm');
    console.log(authcode);

fetch('https://kodoresu.glitch.me/auth/fromapp/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "authcode" : authcode,
        "player": page.getViewById("username").text,
    })
});

const navigationEntry5 = {
    moduleName: "loginwait-page",
    clearHistory: true,
    context: {
        username: page.getViewById("username").text,
        authcode: authcode
    }
};

appSettings.setString("authcode", authcode);

    page.frame.navigate(navigationEntry5);

}
