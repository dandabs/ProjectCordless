/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/
const createViewModel = require("./main-view-model").createViewModel;
const Observable = require("tns-core-modules/data/observable").Observable;
const appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");

const servers = { id: string, name: string, players: number, imageSrc: string } = [
    { id: "cc", name: "CloudCraft", players: 123, imageSrc: "https://placem.at/places?random=1&w=500&txt=0" },
    { id: "ep", name: "Enderpix", players: 456, imageSrc: "https://placem.at/places?random=2&w=500&txt=0" },
    { id: "sq", name: "Spacequests", players: 789, imageSrc: "https://placem.at/places?random=3&w=500&txt=0" },
    { id: "sc", name: "SoulCraft", players: 987, imageSrc: "https://placem.at/places?random=4&w=500&txt=0" },
    { id: "gg", name: "Weridos", players: 654, imageSrc: "https://placem.at/places?random=5&w=500&txt=0" }
];

function onNavigatingTo(args) {

    firebase.analytics.setScreenName({
        screenName: "Home"
      }).then(
          function () {
            console.log("Screen name set");
          }
      );

    const page = args.object;
    const context = page.navigationContext;

    const response = fetch('https://kodoresu.glitch.me/listuser/servers/' + appSettings.getString("loginUsername") + "/", {
    method: 'GET'
}).then(response => {

    if (response.ok) { 

        let jsonstring = response.json().then(data => {
            
            //console.log(data.servers);
            page.bindingContext = createViewModel();
    
            const viewModel = new Observable();
            viewModel.set("servers", data);//servers);

            page.bindingContext = viewModel;
        
        });
        
      } else {
    
        alert(response.status);
    
      }

});

}

exports.onTap = args => {

    const button = args.object;
    const page = button.page;

    page.frame.navigate('page2-page'); 

}

exports.onSettings = args => {

    const button = args.object;
    const page = button.page;
    const context = page.navigationContext;

    const navigationEntry = {
        moduleName: "settings-page",
        clearHistory: true
    };
    
        //page.frame.navigate(navigationEntry);

    const view = args.object;
    const contextnull = null;
    const closeCallback = null;
    const fullscreen = true;
    view.showModal("settings-root", contextnull, closeCallback, fullscreen);

}

exports.onServerSelect = args => {

    const object = args.object;
    const page = object.page;
    const server = object.id;
    
    console.log(server);

    const navigationEntryServer = {
        moduleName: "servermain-page",
        context: {
            "serverid": server
        }
    };

    page.frame.navigate(navigationEntryServer);

}

exports.onAddServer = args => {

    const object = args.object;
    const page = object.page;

    const view = args.object;
    const contextnull = null;
    const closeCallback = null;
    const fullscreen = true;
    view.showModal("addserver-root", contextnull, closeCallback, fullscreen);

}

exports.onNavigatingTo = onNavigatingTo;
