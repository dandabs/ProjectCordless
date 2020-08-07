const Observable = require("tns-core-modules/data/observable").Observable;
const appSettings = require("application-settings");

const webViewModule = require("tns-core-modules/ui/web-view");

exports.onLoad = args => {

    const page = args.object;
    const context = page.navigationContext;
    const viewModel = new Observable();

    const response = fetch('https://kodoresu.glitch.me/servers/' + context.server + '/connections/', {
        method: 'GET'
    }).then(response => {

        if (response.ok) {

            let jsonstring = response.json().then(data => {

                const stringjson = JSON.stringify(data);
                const substrjson = stringjson.substr(0, stringjson.length - 1);
                const substrjson2 = substrjson.substr(1, substrjson.length - 1);
                const datajson = JSON.parse(substrjson2);

                var url = "";

                console.log(context.hyperlink);

                if (context.hyperlink == "Dynmap") viewModel.set("webViewSrc", datajson.Dynmap);
                if (context.hyperlink == "Discord") viewModel.set("webViewSrc", datajson.Discord);
                if (context.hyperlink == "Forum") viewModel.set("webViewSrc", datajson.Forum);

                console.log(viewModel.get("webViewSrc"));

                viewModel.set("name", context.hyperlink);

                page.bindingContext = viewModel;

            });

        } else { }

    });

}