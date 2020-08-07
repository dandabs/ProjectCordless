const Observable = require("tns-core-modules/data/observable").Observable;
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");

exports.onPageLoaded = args => {

    const page = args.object;
    const context = page.navigationContext;

    firebase.analytics.setScreenName({
        screenName: "Login wait"
      }).then(
          function () {
            console.log("Screen name set");
          }
      );

    //page.getViewById("username").text = context.username;
    console.log(context.username);

    const viewModel = new Observable();
    viewModel.set("usernametext", context.username);
    viewModel.set("authcode", context.authcode);

    page.bindingContext = viewModel;

}

exports.onLogin = args => {

    const button = args.object;
    const page = button.page;
    const context = page.navigationContext;

const response = fetch('https://kodoresu.glitch.me/auth/fromapp/recieve', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "authcode" : context.authcode
    })
}).then(response => {

    if (response.ok) {

        let jsonstring = response.json().then(data => {
            
            console.log(data);

            if (data.activated == "1") {

                // TODO: navigate
                firebase.analytics.setUserId({
                    userId: context.username
                  }).then(
                      function () {
                        console.log("Analytics userId set");
                      }
                  );

                  const navigationEntry = {
                    moduleName: "main-page",
                    clearHistory: true,
                    context: {
                        "username": context.username
                    }
                };
                
                console.log("loginwait-page context.username: " + context.username);
                                  
                    page.frame.navigate(navigationEntry);
                    appSettings.setString("loginUsername", context.username);

            } else {

                // TODO: set text box and say unactivated

            }
        
        });

    } else alert(response.status);

});

}
