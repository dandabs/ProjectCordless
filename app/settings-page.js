const appSettings = require("application-settings");

exports.onHome = args => {

    const button = args.object;
    const page = button.page;
    
    const view = args.object;
    
    view.closeModal();

}

exports.onLogout = async args => {

    const button = args.object;
    const page = button.page;
    const frame = page.frame;
    const view = args.object;

appSettings.remove("loginUsername");
    view.closeModal();

    const navigationEntry = {
        moduleName: "login-page",
        clearHistory: true
    };

    appSettings.remove("loginUsername");
    //await page.frame.navigate(navigationEntry);

}