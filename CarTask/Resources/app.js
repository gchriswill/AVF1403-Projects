Titanium.UI.setBackgroundColor("#cecece");
Ti.include("UIobjects.js");
Ti.include("appBehavior.js");

function cloudNetworkCheck (e){
    
    if (Ti.Network.getOnline() == false) { 
        
        alert("No network conection! Offline mode enabled... \n " + e.message);  
        
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
landingWindow.orientationModes = [ Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.PORTRAIT ];

var menubarView          = Ti.UI.createView({top: 0, height: 315, backgroundColor: "#fff" });
var logoTextBranding     = Ti.UI.createLabel({left: 90, top: 235, color: "#333", text: "Welcome to CarTask", font: { fontSize: 62, fontFamily: "Helvetica Neue" }, textAlign: "center"});

var logoPic              = Ti.UI.createImageView(UI.loPi);
var keysview             = Ti.UI.createImageView({ image: "keys.png", bottom: 0});
var logText              = Ti.UI.createLabel(UI.loTe);
var logView              = Ti.UI.createView({ right: 50, width: 150, height: 175});

var creatingAccountLabel = Ti.UI.createLabel(UI.creAccLa);
var addView              = Ti.UI.createImageView({ image: "users.png", height: 100, bottom: 0});
var accView              = Ti.UI.createView({ right: 50, bottom: 200, width: 150, height: 200});

landingWindow.add(logView);
landingWindow.add(accView);

landingWindow.add(menubarView);

if ( Ti.Platform.osname !== "ipad"){
    
    landingWindow.orientationModes = [ Ti.UI.PORTRAIT ];
    
    logView.setRight("200px");
    accView.setRight("200px");
    accView.setBottom("50px");
    
    menubarView.setBackgroundColor("transparent");

} else{ 
     
    var twitterText  = Ti.UI.createLabel({ left: 60, top: 335, color: "#333", text: "Check #carTask statuses!", font: { fontSize: 36, fontFamily: "Helvetica Neue" }, textAlign: "center"});
    var backText     = Ti.UI.createLabel({ left: 360, bottom: 30, color: "#333", text: "Back to #carTask", font: { fontSize: 16, fontFamily: "Helvetica Neue" }, textAlign: "center"});
    var browseBack   = Ti.UI.createLabel({ left: 20, bottom: 30, color: "#333", text: "☜ Back", font: { fontSize: 16, fontFamily: "Helvetica Neue" }, textAlign: "center"});
    var browseFoward = Ti.UI.createLabel({ left: 100, bottom: 30, color: "#333", text: "Forward ☞", font: { fontSize: 16, fontFamily: "Helvetica Neue" }, textAlign: "center"});
    var twitterView  = Ti.UI.createWebView({ url: "twitterFile.html", height: 550, width: 500, left: 10, top: 420, backgroundColor: "transparent", opacity: 0.0 });
    
    if (Ti.Network.getOnline() == false) {
        twitterView.url  = "null";
        var offlineLabel = Ti.UI.createLabel({color: "#333", text: "Sorry, there's no network!", font: { fontSize: 24, fontFamily: "Helvetica Neue" }, textAlign: "center"});
        twitterView.add(offlineLabel);
    };    
    
    browseBack.addEventListener("click", function(e){
        
        if(twitterView.canGoBack()){
            twitterView.goBack();
        };
        
    });
    
    browseFoward.addEventListener("click", function(e){
        
        if(twitterView.canGoForward()){
            twitterView.goForward();
        };
        
    });
    
    backText.addEventListener("click", function(e){
        backText.color = "#fff";
        twitterView.setUrl("twitterFile.html");
        
        backText.animate({
            color: "#333",
            delay: 2000,
            duration: 1000
        });
    });
    
    landingWindow.add(twitterText);
    landingWindow.add(twitterView);
    landingWindow.add(browseBack);
    landingWindow.add(browseFoward);
    landingWindow.add(backText);
    
    twitterView.animate({
            curve:    Ti.UI.ANIMATION_CURVE_EASE_IN_OUT, 
            opacity:  1, 
            duration: 2000
    });

    Ti.Gesture.addEventListener("orientationchange", function(e){
        
        if ( e.source.orientation == 3 ||  e.source.orientation == 4){
            logoTextBranding.setLeft(null);
            browseBack.setLeft(285);
            browseFoward.setLeft(375);
            backText.setLeft(630);
            twitterText.setLeft(null);
            twitterView.setLeft(null);
            //twitterView.setOpacity(0.0);
            twitterView.setHeight(300);
            twitterView.setTop(375);
            
            logView.setRight(null);
            logView.setLeft(50);
            
            logView.setBottom(100);
            accView.setBottom(100);
            
            
        }else if (e.source.orientation == 5 ){
            
            return false;
        }else {
            
            logoTextBranding.setLeft(90);
            browseBack.setLeft(20);
            browseFoward.setLeft(100);
            backText.setLeft(360);
            twitterText.setLeft(60);
            //twitterView.setOpacity(0.0);
            twitterView.setLeft(10);
            twitterView.setHeight(550);
            twitterView.setTop(420);
            
            
            logView.setLeft(null);
            logView.setRight(50);
            
            accView.setBottom(200);
            logView.setBottom(null);
            
        };
    });
};

accView.add(creatingAccountLabel);
accView.add(addView);

logView.add(logText);
logView.add(keysview);

menubarView.add(logoPic);
menubarView.add(logoTextBranding);

logView.addEventListener("click", function(){
    
    logText.setColor("#333");
    
    var loginWindow     = Ti.UI.createWindow(UI.logWin);
    loginWindow.setTitle("Login");
    
    var userFancyIcon   =  Ti.UI.createImageView(UI.uPi);
    var closeButton     = Ti.UI.createLabel(UI.close);
    var loginUserButton = Ti.UI.createLabel(UI.loginUser);
    var scrollWrapper1  = Ti.UI.createScrollView(UI.scrolw1);
    var userNameLabel   = Ti.UI.createLabel(UI.UNL);
    var usernameField   = Ti.UI.createTextField(UI.UNF);
    var passwordLabel   = Ti.UI.createLabel(UI.passL);
    var passwordField   = Ti.UI.createTextField(UI.passF);
    
    
    if ( Ti.Platform.osname == "android") { loginWindow.setHeight("auto"); loginWindow.setWidth("auto"); }
    
    function closingModal(){
        
        closeButton.setBorderColor("#333");
        logText.color = "#fff";
        loginWindow.close({modal: true});
    };
    
    function closingModalWithSwipe(e){
        if (e.direction == "down") { loginWindow.close({modal: true});  logText.setColor("#fff"); loginUserButton.setBorderColor("transparent"); };
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
            
            loginUserButton.setBorderColor("#333");
            gettingCloudLogin.userAccountLoginFunction([userNameValue, passwordValue]);
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
    loginWindow.add(userFancyIcon);
    scrollWrapper1.add(userNameLabel);
    scrollWrapper1.add(usernameField);
    scrollWrapper1.add(passwordLabel);
    scrollWrapper1.add(passwordField);
    loginWindow.add(scrollWrapper1);
    loginWindow.open({modal: true});
});

accView.addEventListener("click", function(){
    
    creatingAccountLabel.setColor("#333");
    
    var creatingAccountWindow = Ti.UI.createWindow(UI.logWin);
    var userFancyIcon         =  Ti.UI.createImageView(UI.uPi);
    var closeButton           = Ti.UI.createLabel(UI.close);
    var createLabel           = Ti.UI.createLabel(UI.loginUser);
    var scrollWrapper2        = Ti.UI.createScrollView(UI.scrolw1);
    var emailLabel            = Ti.UI.createLabel(UI.emailName);
    var emailField            = Ti.UI.createTextField(UI.UNF);
    var userNameLabel         = Ti.UI.createLabel(UI.userNamelable);
    var usernameField         = Ti.UI.createTextField(UI.passF);
    var passwordLabel         = Ti.UI.createLabel(UI.passWlabel);
    var passwordField         = Ti.UI.createTextField(UI.passF);
    var confirmField          = Ti.UI.createTextField(UI.passF);
    
    userFancyIcon.setImage("userPic2.png");
    passwordField.setTop("290");
    createLabel.setText("Create");
    confirmField.setTop("350");
     
    function closingModalWithSwipe(e){
        if (e.direction == "down") { creatingAccountWindow.close({modal: true}); creatingAccountLabel.setColor("#fff"); };
        
    };
    
    function closingModal2(){
        
        closeButton.setBorderColor("#333");
        creatingAccountLabel.setColor("#fff");
        creatingAccountWindow.close({modal: true});
    };
    
    creatingAccountWindow.addEventListener("swipe", closingModalWithSwipe);
    
    closeButton.addEventListener("click", closingModal2);
    
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
    creatingAccountWindow.add(userFancyIcon);
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

landingWindow.open();


