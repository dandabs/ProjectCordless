const Observable = require("tns-core-modules/data/observable").Observable;
const appSettings = require("application-settings");
const viewModel = new Observable();

exports.onNavigatingTo = args => {

    const page = args.object;

    viewModel.set("vis", "collapsed");
    page.bindingContext = viewModel;

}

exports.onCancel = args => {

    const view = args.object;
    
    view.closeModal();

}

exports.onAdd = args => {

    const view = args.object;
    const page = args.object.page;

    const query = fetch('https://kodoresu.glitch.me/auth/fromapp/addserver', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "serverid" : page.getViewById("server").text,
        "playerid": appSettings.getString("loginUsername")
    })
}).then(response => {

    console.log("1");

    if (response.ok) { 
        console.log("2");

        let jsonstring = response.json().then(data => {

            console.log("3");
            
            //console.log(data.servers);
            //page.bindingContext = createViewModel();

            //viewModel.set("servers", data);

            //page.bindingContext = viewModel;

            console.log(data);

            if (data.success == "1") {
                view.closeModal();
            } else if (data.success == "3") {

                viewModel.set("vis", "visible");
                viewModel.set("label", "You already have this server in your list.");

            } else {

                viewModel.set("vis", "visible");
                viewModel.set("label", "This server does not exist.");

            }
        
        });
        
      } else {
    
        alert(response.status);
    
      }

});

    //view.closeModal();

}