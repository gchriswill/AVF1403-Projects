Titanium.UI.setBackgroundColor("#333");
Ti.include("UIobjects.js");
Ti.include("appBehavior.js");



function cloudNetworkCheck (e){
    
    if (Ti.Network.getOnline() == false) { 
        
        alert("No network conection! Offline mode enabled...");  
        alert(e.message);
        
    }else{
        
        if (e.success){
            var gettingDBfile = require("SQLiteScripts/localStorage");
            gettingDBfile.runnignDB([ 1, e.users, "INSERT INTO carprofile ( rowid, email, password, username, carmake, carmodel, caryear, oildateset, tiredateset, enginedateset, fueldateset, fulltuneupdateset) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ]);
        } else alert(e.message);  
    };
};

(function cloudRequest (){
    var Cloud = require("ti.cloud");
    Cloud.Users.query({ page: 1, per_page: 100 }, cloudNetworkCheck);
})();

var landingWindow        = Ti.UI.createWindow(UI.lanWin);

var menubarView          = Ti.UI.createView({top: 0, height: 315, backgroundColor: "#fff" });

var logoPic              = Ti.UI.createImageView(UI.loPi);
var keysview             = Ti.UI.createImageView({ image: "keys.png", bottom: 0});
var logView              = Ti.UI.createView({width: "200", height: "200"});

var logText              = Ti.UI.createLabel(UI.loTe);
var creatingAccountLabel = Ti.UI.createLabel(UI.creAccLa);
var aboutLabel           = Ti.UI.createLabel(UI.aboLa);

logoPic.setTop(0);
logView.add(logText);
logView.add(keysview);
menubarView.add(logoPic);

if ( Ti.Platform.osname == "android"){
    logoPic.setBottom(140);
    logText.setTop(50);
    logText.setRight(null);
    creatingAccountLabel.setTop(150);
    creatingAccountLabel.setLeft(null);
    menubarView.setBackgroundColor("transparent");
};

logText.addEventListener("click", function(){
    
    logText.setColor("#fff");
    logText.setBackgroundColor("#333");
    logText.setBorderColor("#fff");
    
    var loginWindow     = Ti.UI.createWindow(UI.logWin);
    loginWindow.setTitle("Login");
    
    var closeButton     = Ti.UI.createLabel(UI.close);
    var loginUserButton = Ti.UI.createLabel(UI.loginUser);
    var scrollWrapper1  = Ti.UI.createScrollView(UI.scrolw1);
    var userNameLabel   = Ti.UI.createLabel(UI.UNL);
    var usernameField   = Ti.UI.createTextField(UI.UNF);
    var passwordLabel   = Ti.UI.createLabel(UI.passL);
    var passwordField   = Ti.UI.createTextField(UI.passF);
    var userFancyIcon   =  Ti.UI.createImageView(UI.uPi);
    
    if ( Ti.Platform.osname == "android") { loginWindow.setHeight("auto"); loginWindow.setWidth("auto"); }
    
    function closingModal(){
        closeButton.setBackgroundColor("#333");
        closeButton.setColor("#fff");
        closeButton.setBorderColor("#fff");
        logText.setBackgroundColor("#fff");
        logText.color = "#333";
        logText.setBorderColor("transparent");
        loginWindow.close({modal: true});
    };
    
    function closingModalWithSwipe(e){
        if (e.direction == "down") { loginWindow.close({modal: true}); logText.setBackgroundColor("#fff"); logText.setColor("#333"); loginUserButton.setBorderColor("transparent"); };
    };
    
    function loginSuccess(){
        
        var userNameValue = usernameField.getValue();
        var passwordValue = passwordField.getValue();
        
        if ( ( userNameValue == null || userNameValue == "" || userNameValue == " ") || ( passwordValue == null || passwordValue == "" || passwordValue == " ") ){
            
            alert("All fields are requiered! \n Please try again with the appropiate data on all fields");
            
        }else if ( userNameValue.length <= 3){
            
            alert( "Please provide a username with 4 caracters or more...");
        
        }else if ( passwordValue.length <= 5){
            
            alert("Please, try again with a password length of 6 charaters or more...");
        
        }else{           
        
            var gettingCloudLogin = require("cloudScripts/userLogin");
            
            loginUserButton.setBackgroundColor("#fff");
            loginUserButton.setColor("#333");
            loginUserButton.setBorderColor("transparent");
            
            gettingCloudLogin.userAccountLoginFunction([userNameValue, passwordValue]);
            
            logText.setBackgroundColor("transparent");
            loginWindow.close({modal: true});
            
            var carStatusWindow = Ti.UI.createWindow({
                backgroundColor: "#fff",
                title: null
            });
            
            var requiringTable        = require("globalFunctions");
            var requiringDBextraction = require("SQLiteScripts/localStorage");
            
            var objectExtractect      = requiringDBextraction.runnignDB([ 2, ["dummy"] ]);
            var extractingTableReady  = requiringTable.tableFactory([objectExtractect, true]);
            
            // if (Ti.Platform.osname == "ipad"){
//                 
                // extractingTableReady.addEventListener("click", function(e){
//                     
                    // var userView = Ti.UI.createWindow({
                        // backgroundColor: "#fff",
                        // width: 300,
                        // height: 300,
                        // borderRadius: 50
                    // });
//                     
                    // var userNameLabel = Ti.UI.createLabel({
                        // text: e.source.userUsername
                    // });
                    // userView.add(userNameLabel);
                    // userView.open({modal: true});
//                     
                    // userView.addEventListener("swipe", function(e){
                        // if (e.direction == "down") {
                            // userView.close({modal: true});
                        // };
                    // });
                // });
//             
                // carStatusWindow.add(extractingTableReady);
//                 
                // var chatSplitWindow = Ti.UI.iPad.createSplitWindow({
                    // detailView: testWindow,
                    // masterView: carStatusWindow,
                    // showMasterInPortrait: true
                // });
//                 
                // testWindow.addEventListener("swipe", function(e){
                    // if (e.direction == "right") {
                         // chatSplitWindow.showMasterInPortrait = true;
                    // }else if (e.direction == "left"){
                        // chatSplitWindow.showMasterInPortrait = false;
                    // };
//                     
                // });
//                 
                // chatSplitWindow.open({ animated: true });
//                 
             // }else{
//                 
                // extractingTableReady.addEventListener("click", function(e){
//                     
                    // var userView = Ti.UI.createWindow({
                        // backgroundColor: "#fff",
                        // width: 200,
                        // height: 200,
                        // borderRadius: 50
                    // });
//                     
                    // var userNameLabel = Ti.UI.createLabel({
                        // text: "Employee: " + e.source.userUsername
                    // });
                    // userView.add(userNameLabel);
                    // userView.open({modal: true});
//                     
                    // userView.addEventListener("swipe", function(e){
                        // if (e.direction == "down") {
                            // userView.close({modal: true});
                        // };
                    // });
                // });
                // carStatusWindow.add(extractingTableReady);
                // carStatusWindow.open({animated: true});
            // };
        };
    };
    
    loginWindow.addEventListener("swipe", closingModalWithSwipe);
    closeButton.addEventListener("click", closingModal);
    loginUserButton.addEventListener("click", loginSuccess);
    loginWindow.add(closeButton);
    loginWindow.add(loginUserButton);
    scrollWrapper1.add(userNameLabel);
    scrollWrapper1.add(usernameField);
    scrollWrapper1.add(passwordLabel);
    scrollWrapper1.add(passwordField);
    scrollWrapper1.add(userFancyIcon);
    loginWindow.add(scrollWrapper1);
    loginWindow.open({modal: true});
});

creatingAccountLabel.addEventListener("click", function(){
    
    creatingAccountLabel.setBackgroundColor("#gray");
    creatingAccountLabel.setColor("#fff");
    
   
    var creatingAccountWindow = Ti.UI.createWindow(UI.logWin);
    var closeButton           = Ti.UI.createLabel(UI.close);
    var createLabel           = Ti.UI.createLabel(UI.loginUser);
    createLabel.setText("Create");
    var scrollWrapper2        = Ti.UI.createScrollView(UI.scrolw1);
    var emailLabel            = Ti.UI.createLabel(UI.emailName);
    var emailField            = Ti.UI.createTextField(UI.UNF);
    var userNameLabel         = Ti.UI.createLabel(UI.userNamelable);
    var usernameField         = Ti.UI.createTextField(UI.passF);
    var passwordLabel         = Ti.UI.createLabel(UI.passWlabel);
    var passwordField         = Ti.UI.createTextField(UI.passF);
    passwordField.setTop("290");
    var confirmField          = Ti.UI.createTextField(UI.passF);
    confirmField.setTop("350");
    
    if ( Ti.Platform.osname == "android"){
        creatingAccountWindow.setHeight("auto");
        creatingAccountWindow.setWidth("auto");
        creatingAccountWindow.setBorderRadius(null);
    };
    
    creatingAccountWindow.addEventListener("swipe", function(e){
        if (e.direction == "down") { creatingAccountWindow.close({modal: true}); creatingAccountLabel.setBackgroundColor("#fff"); creatingAccountLabel.setColor("#333"); };
        
    });
    
    closeButton.addEventListener("click", function(){
        
        closeButton.setBackgroundColor("#333");
        closeButton.setColor("#fff");
        closeButton.setBorderColor("#fff");
        
        creatingAccountLabel.setBackgroundColor("#fff");
        creatingAccountLabel.setColor("#333");
        creatingAccountWindow.close({modal: true});
    });
    
    createLabel.addEventListener("click", function(){
        
        var emailValue = emailField.getValue();
        var userNameValue = usernameField.getValue();
        var passwordValue = passwordField.getValue();
        var confirmValue = confirmField.getValue();
        
        if ( ( emailValue    == null || emailValue    == "" || emailValue    == " ") || 
             ( userNameValue == null || userNameValue == "" || userNameValue == " ") || 
             ( passwordValue == null || passwordValue == "" || passwordValue == " ") || 
             ( confirmValue  == null || confirmValue  == "" || confirmValue  == " ") ){
            
            alert("All fields are requiered! \n Please try again with the appropiate data on all fields");
            
        } else if ( ( emailValue.search("@") == -1 )  || 
                    ( emailValue.indexOf("@") !== emailValue.lastIndexOf("@") ) || 
                    emailValue.indexOf("@") < 4 || 
                    emailValue.lastIndexOf(".") < emailValue.indexOf("@") + 3 || 
                    emailValue.lastIndexOf(".") + 2 >= emailValue.length ){
            
            alert( "Please, eneter a valid format of an email. \n There is no way to fool GchrisWill's string email validation method condition... LOL");
            
        } else if ( userNameValue.length <= 3){
            
            alert( "Please provide a username with 4 caracters or more...");
        
        }else if ( passwordValue.length <= 5){
            
            alert("Please, try again with a password length of 6 charaters or more...");
        
        }else if ( confirmValue !== passwordValue){ 
            
            alert("The passwords provided do not mathc with each other...");
        
        }else{           
        
            var requiringCloudCreate = require("cloudScripts/createAccount");
            
            createLabel.setBackgroundColor("#333");
            createLabel.setColor("#fff");
            createLabel.setBorderColor("#fff");
            
            requiringCloudCreate.creatingUserFunction([ emailValue, userNameValue, passwordValue, confirmValue]);
            
            creatingAccountLabel.setBackgroundColor("#fff");
            creatingAccountWindow.close({modal: true});
            
            var testWindow = Ti.UI.createWindow({ backgroundColor: "#333", title: null });
            
            var carStatusWindow = Ti.UI.createWindow({ backgroundColor: "#fff", title: null });
            
            var requiringTable = require("globalFunctions");
            var requiringDBextraction = require("SQLiteScripts/localStorage");
            var objectExtractect = requiringDBextraction.runnignDB([ 2, ["dummy" ] ]);
            var extractingTableReady = requiringTable.tableFactory([objectExtractect, true]);
            
            extractingTableReady.addEventListener("click", function(e){
                
                var userView = Ti.UI.createWindow({ backgroundColor: "#fff", width: 200, height: 200, borderRadius: 50 });
                
                if (Ti.Platform.osname == "ipad") userView.setWidth("300"); userView.setHeight("300");
                
                var userNameLabel = Ti.UI.createLabel({
                    text: e.source.userUsername
                });
                userView.add(userNameLabel);
                userView.open({modal: true});
                
                userView.addEventListener("swipe", function(e){
                    if (e.direction == "down") userView.close({modal: true});
                    
                });
            });
            carStatusWindow.add(extractingTableReady);
            carStatusWindow.open({animated: true});
        };//End of condition
        
    });
    
    creatingAccountWindow.add(closeButton);
    creatingAccountWindow.add(createLabel);
    
    scrollWrapper2.add(emailLabel);
    scrollWrapper2.add(emailField);
    
    scrollWrapper2.add(userNameLabel);
    scrollWrapper2.add(usernameField);
    
    scrollWrapper2.add(passwordLabel);
    scrollWrapper2.add(passwordField);
    scrollWrapper2.add(confirmField);
    
    creatingAccountWindow.add(scrollWrapper2);
    creatingAccountWindow.open({modal: true});
});

aboutLabel.addEventListener("click", function(){
    
    var aboutWindow = Ti.UI.createWindow({
        backgroundColor: "#333",
        title: "Hello, I'm Chris",
        bottom: 75,
        width: 400,
        height: 600
        
    });
    
    var testLabel = Ti.UI.createLabel({
        top: 0,
        color: "#fff",
        text: "testestestestestestest \n testestestestestestestest",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        
    });
    
    var profileImage = Ti.UI.createImageView({
        image: "MeSignature.png",
        width: 300,
        height: 300,
        borderRadius: 150
    });
    
    if ( Ti.Platform.osname == "android"){
        aboutWindow.setHeight("auto");
        aboutWindow.setWidth("auto");
        profileImage.setHeight(200);
        profileImage.setWidth(200);
        profileImage.setBorderRadius(100);
        
    };
    
    aboutWindow.addEventListener("swipe", function(e){
        if (e.direction == "down") aboutWindow.close({modal: true});
    });
    
    aboutWindow.add(testLabel);
    aboutWindow.add(profileImage);
    aboutWindow.open({modal: true});
});

//landingWindow.add(logoPic);
landingWindow.add(logView);
landingWindow.add(creatingAccountLabel);
landingWindow.add(menubarView);

landingWindow.open();


