const Observable = require("tns-core-modules/data/observable").Observable;
const appSettings = require("application-settings");
const tabViewModule = require("tns-core-modules/ui/tab-view");
const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

var frameModule = require("tns-core-modules/ui/frame");
//var ServerMainViewModel = require("./servermain-view-model");

//var serverMainViewModel = new ServerMainViewModel;

exports.onLoad = args => {

  var page;

  if (args.object.getClass() == "page") {page = args.object;} else {page = args.object.page;}

  //const page = args.object;
  const context = page.navigationContext;

  const response = fetch('https://kodoresu.glitch.me/servers/' + context.serverid + "/", {
    method: 'GET'
  }).then(response => {

    if (response.ok) {

      let jsonstring = response.json().then(data => {



        //const dataslice = data.substr(0,4);

        //console.log(JSON.parse(JSON.stringify(data).slice(0, JSON.stringify(data).length - 1)));

        const stringjson = JSON.stringify(data);
        const substrjson = stringjson.substr(0, stringjson.length - 1);
        const substrjson2 = substrjson.substr(1, substrjson.length - 1);
        const datajson = JSON.parse(substrjson2);

        const response2 = fetch('https://kodoresu.glitch.me/servers/' + context.serverid + '/connections/', {
          method: 'GET'
        }).then(response2 => {

          if (response2.ok) {



            let jsonstring2 = response2.json().then(data2 => {

              console.log("OK 2");
              console.log(data2);

              const stringjson2 = JSON.stringify(data2);
              console.log(stringjson2);
              //const substrjson3 = stringjson2.substr(0, stringjson2.length - 1);
              //const substrjson4 = substrjson3.substr(1, substrjson2.length - 1);
              //console.log("substrjson4: " + substrjson4);
              const toparse = stringjson2.split("[")[1].split("]")[0];
              console.log(toparse);
              const datajson2 = JSON.parse(toparse);
              console.log("datajson2: " + JSON.stringify(datajson2));



              console.log(datajson);
              console.log(datajson2);

              const viewModel = new Observable();

              viewModel.set("serverid", context.serverid);

              if (datajson2.Discord.length == 0) {
                viewModel.set("discordvisible", "collapse");
              } else { viewModel.set("discordvisible", "visible"); viewModel.set("discordurl", datajson2.Discord); }
              if (datajson2.Dynmap.length == 0) {
                viewModel.set("dynmapvisible", "collapse");
              } else { viewModel.set("dynmapvisible", "visible"); viewModel.set("discordurl", datajson2.Dynmap); }
              if (datajson2.Forum.length == 0) {
                viewModel.set("forumvisible", "collapse");
              } else { viewModel.set("forumvisible", "visible"); viewModel.set("discordurl", datajson2.Forum); }

              if (datajson2.Buycraft.length == 0) {
                viewModel.set("storevisible", "collapse");
              } else {

                const response3 = fetch('https://plugin.tebex.io/packages', {
                  method: "GET",
                  headers: {
                    'X-Buycraft-Secret': datajson2.Buycraft
                  }
                }).then(response3 => {

                  if (response3.ok) {

                    //console.log(response3.json()[0]);

                    let jsonstring = response3.json().then(string => {

                      //var js1 = JSON.parse(string);

                      var js2 = string;
                      var key;

                      var full = "";

                      for (key in js2) {
                        if (js2.hasOwnProperty(key)) {

                          var image = "https://i2-prod.gloucestershirelive.co.uk/news/gloucester-news/article2144870.ece/ALTERNATES/s1200b/2_Lidl.jpg";

                          if (String(js2[key].image) == "false") {} else image = String(js2[key].image);

                          var data = {
                            name: String(js2[key].name),
                            image: String(image),
                            price: String(js2[key].price)
                          };

                          console.log(js2[key]);
                          full = full + "," + JSON.stringify(data) + "";

                        }
                      }

                      var oof = "[" + full.substr(1) + "]";

                      //alert(oof);

                      console.log(oof);

                      viewModel.set("ranks", JSON.parse(oof));

                      //var util = require('util');
                      //util.inspect("[" + full + "]");

                      //console.log(full);

                      //console.log(js2);//.then(() => {viewModel.set("ranks", string);});



                    });

                  } else { }

                });

              }

              console.log("OK");

              viewModel.set("name", datajson.Displayname);
              viewModel.set("home", String.fromCharCode(0xe800));
              viewModel.set("map", String.fromCharCode(0xe834));
              viewModel.set("chat", String.fromCharCode(0xe83f));
              viewModel.set("store", String.fromCharCode(0xe844));
              viewModel.set("about", String.fromCharCode(0xe822));
              viewModel.set("announcements", new ObservableArray([
                { name: "New app!", desc: "19 October 2019" },
                { name: "Server reset!", desc: "1 May 2019" },
                { name: "Factions winner!", desc: "2 December 2018" },
                { name: "Competition?", desc: "23 July 2016" },
                { name: "Poll.", desc: "13 November 2014" }
              ]));
              viewModel.set("links", new ObservableArray([
                { name: "Dynmap", desc: "View the server and its players from a birds-eye view.", visible: viewModel.get("dynmapvisible") },
                { name: "Discord", desc: "Connect with other server members to chat and discuss server topics.", visible: viewModel.get("discordvisible") },
                { name: "Forum", desc: "Give and receive help on server Q and As.", visible: viewModel.get("forumvisible") }
              ]));
              /*viewModel.set("ranks", new ObservableArray([
                { name: "Coal Rank", price: "£5.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=9" },
                { name: "Iron Rank", price: "£9.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=6" },
                { name: "Gold Rank", price: "£15.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=1" },
                { name: "Diamond Rank", price: "£19.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=2" },
                { name: "Faction Power Boost (x10)", price: "£59.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=4" },
                { name: "Faction Power Boost (x20)", price: "£129.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=7" },
                { name: "$10 in-game", price: "£5.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=8" },
                { name: "Alve's Kit", price: "£29.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=10" },
                { name: "Operator Status?!?!", price: "£2999.99", imageSrc: "https://placem.at/things?w=500&txt=0&random=11" }
              ]));*/
              viewModel.set("username", appSettings.getString("loginUsername"));

              page.bindingContext = viewModel;

            });


          } else alert("2: " + response.status);

        });

      });

    } else {

      alert(response.status);

    }

    page.bindingContext = serverMainViewModel

    if (isIOS) {
      var newcolor = new Color("#e6e6e6");
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }

  });

}

exports.onHyperlink = args => {

  const button = args.object;
  const page = button.page;

  const navigationEntryServer = {
    moduleName: "serverbrowser-page",
    context: {
      "hyperlink": button.id,
      "server": page.id
    }
  };

  page.frame.navigate(navigationEntryServer);

}

exports.reloadPage = (page) => {

}