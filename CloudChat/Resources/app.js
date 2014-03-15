Titanium.UI.setBackgroundColor("#2ab1e0");

function cloudRequest (){
    var Cloud = require("ti.cloud");
    
    Cloud.Users.query({ 
        page: 1,
        per_page: 10,
        
        }, function(e){
        
        if (e.success){
            
            var requiringDB = require("SQLiteScripts/localStorage");
            requiringDB.runnignDB([ 1, e.users, "INSERT INTO workers ( email, username, role, name, lastname, age) VALUES (?, ?, ?, ?, ?, ?)" ]);
            
        }else alert(e.message);  
        
    });
    
};

var landingWindow = Ti.UI.createWindow({  
    title: "Login",
    backgroundColor: "#2ab1e0"
});

var logoImage = Ti.UI.createImageView({
    image: "iPad/UsersLogo.png",
    width: "auto",
    height: "auto"
});

var logingLabel = Ti.UI.createLabel({
    bottom: 150,
	color: "#fff",
	text: "Login",
	font: { fontSize: 20, fontFamily: "Helvetica Neue" },
	textAlign: "center",
	width: "100",
	height: "50",
	borderColor: "#fff",
	borderRadius: "25",
	borderWidth: "2"
});

var creatingLabel = Ti.UI.createLabel({
    bottom: 75,
	color: "#fff",
	text: "Create an account",
	font: { fontSize: 20, fontFamily: "Helvetica Neue" },
	textAlign: "center",
	width: "200",
    height: "50",
    borderColor: "#fff",
    borderRadius: "25",
    borderWidth: "2"
});

var aboutLabel = Ti.UI.createLabel({
    bottom: 35,
    left: 35,
    color: "#fff",
    text: "i",
    font: { fontSize: 14, fontFamily: "Helvetica Neue" },
    textAlign: "center",
    width: "25",
    height: "25",
    borderColor: "#fff",
    borderRadius: "12.5",
    borderWidth: "2"
});

var iconSettings = Ti.UI.createImageView({
    image: "iconSettings.png",
    bottom: 35,
    right: 35,
    width: "25",
    height: "25"
    
});

if ( Ti.Platform.osname == "android"){
    
    logoImage.setTop(50);
    
    logingLabel.setBottom(100);
    creatingLabel.setBottom(25);
    
    aboutLabel.setBottom(null);
    aboutLabel.setTop(20);
    aboutLabel.setLeft(20);
    iconSettings.setBottom(null);
    iconSettings.setTop(20);
    iconSettings.setRight(20);
    
};

logingLabel.addEventListener("click", function(){
    
    logingLabel.backgroundColor = "#084049";
    
    var loginWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Create Account",
        bottom: 75,
        width: 400,
        height: 600,
        borderRadius: 50,
        scrollable: true
    });
    
    var closeLabel = Ti.UI.createLabel({
        top: 20,
        left: 20,
        color: "#2ab1e0",
        text: "Cancel",
        font: { fontSize: 14, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "60",
        height: "60",
        borderColor: "#2ab1e0",
        borderRadius: "30",
        borderWidth: "2"
    });
    
    var loginAccountLabel = Ti.UI.createLabel({
        top: 20,
        right: 20,
        color: "#2ab1e0",
        text: "Login",
        font: { fontSize: 14, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "60",
        height: "60",
        borderColor: "#2ab1e0",
        borderRadius: "30",
        borderWidth: "2"
    });
    
    var scrollWrapper1 = Ti.UI.createScrollView({
        top:0,
        width: 200
    });
    
    var userNameLabel = Ti.UI.createLabel({
        top: 50,
        color: "#2ab1e0",
        text: "Username",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "150",
        height: "40"
        
    });
    
    var usernameField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 90,
        width: 200, 
        height: 40
        
    });
    
    var passwordLabel = Ti.UI.createLabel({
        top: 150,
        color: "#2ab1e0",
        text: "Password",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "150",
        height: "40"
        
    });
    
    var passwordField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 190,
        width: 200, 
        height: 40,
        passwordMask: true
        
    });
    
    if ( Ti.Platform.osname == "android"){
        loginWindow.setHeight("auto");
        loginWindow.setWidth("auto");
        loginWindow.setBorderRadius(null);
    };
    
    loginWindow.addEventListener("swipe", function(e){
        if (e.direction == "down") loginWindow.close({modal: true}); logingLabel.setBackgroundColor("transparent");
    });
    
    closeLabel.addEventListener("click", function(){
        
        closeLabel.setBackgroundColor("#2ab1e0");
        closeLabel.setColor("#fff");
        closeLabel.setBorderColor("#fff");
        
        logingLabel.setBackgroundColor("transparent");
        loginWindow.close({modal: true});
    });
    
    loginAccountLabel.addEventListener("click", function(){
        
        var userNameValue = usernameField.getValue();
        var passwordValue = passwordField.getValue();
        
        if ( ( userNameValue == null || userNameValue == "" || userNameValue == " ") || ( passwordValue == null || passwordValue == "" || passwordValue == " ") ){
            
            alert("All fields are requiered! \n Please try again with the appropiate data on all fields");
            
        }else if ( userNameValue.length <= 3){
            
            alert( "Please provide a username with 4 caracters or more...");
        
        }else if ( passwordValue.length <= 5){
            
            alert("Please, try again with a password length of 6 charaters or more...");
        
        }else{           
        
            var requiringCloudLogin = require("cloudScripts/userLogin");
            
            loginAccountLabel.setBackgroundColor("#2ab1e0");
            loginAccountLabel.setColor("#fff");
            loginAccountLabel.setBorderColor("#fff");
            
            requiringCloudLogin.userAccountLoginFunction([userNameValue, passwordValue]);
            
            logingLabel.setBackgroundColor("transparent");
            loginWindow.close({modal: true});
            
            var chatWindow = Ti.UI.createWindow({
                backgroundColor: "#2ab1e0",
                title: null,
            });
            
            var chatTableWindow = Ti.UI.createWindow({
                backgroundColor: "#fff",
                title: null,
            });
            
            var requiringTable = require("globalFunctions");
            var requiringDBextraction = require("SQLiteScripts/localStorage");
            
            var objectExtractect = requiringDBextraction.runnignDB([ 2, ["dummy" ] ]);
            
            var extractingTableReady = requiringTable.tableFactory([objectExtractect, true]);
            
            if (Ti.Platform.osname == "ipad"){
                
                extractingTableReady.addEventListener("click", function(e){
                    
                    var userView = Ti.UI.createWindow({
                        backgroundColor: "#fff",
                        width: 300,
                        height: 300,
                        borderRadius: 50
                    });
                    
                    var userNameLabel = Ti.UI.createLabel({
                        text: e.source.userUsername
                    });
                    userView.add(userNameLabel);
                    userView.open({modal: true});
                    userView.addEventListener("swipe", function(e){
                        if (e.direction == "down") {
                            userView.close({modal: true});
                        };
                    });
                });
            
                chatTableWindow.add(extractingTableReady);
                
                var chatSplitWindow = Ti.UI.iPad.createSplitWindow({
                    detailView: chatWindow,
                    masterView: chatTableWindow,
                    showMasterInPortrait: true
                });
                
                chatWindow.addEventListener("swipe", function(e){
                    if (e.direction == "right") {
                         chatSplitWindow.showMasterInPortrait = true;
                    }else if (e.direction == "left"){
                        chatSplitWindow.showMasterInPortrait = false;
                    };
                    
                });
                
                chatSplitWindow.open({ animated: true });
                
             }else{
                
                extractingTableReady.addEventListener("click", function(e){
                    
                    var userView = Ti.UI.createWindow({
                        backgroundColor: "#fff",
                        width: 200,
                        height: 200,
                        borderRadius: 50
                    });
                    
                    var userNameLabel = Ti.UI.createLabel({
                        text: e.source.userUsername +"\n"+ e.source.userEmail
                    });
                    userView.add(userNameLabel);
                    userView.open({modal: true});
                    
                    userView.addEventListener("swipe", function(e){
                        if (e.direction == "down") {
                            userView.close({modal: true});
                        };
                    });
                });
                
                chatTableWindow.open({animated: true});
            
            };
                 
           
        };
        
    });
    
    loginWindow.add(closeLabel);
    loginWindow.add(loginAccountLabel);
    
    scrollWrapper1.add(userNameLabel);
    scrollWrapper1.add(usernameField);
    
    scrollWrapper1.add(passwordLabel);
    scrollWrapper1.add(passwordField);
    
    loginWindow.add(scrollWrapper1);
    loginWindow.open({modal: true});

});

creatingLabel.addEventListener("click", function(){
    
    creatingLabel.backgroundColor = "#084049";
   
    var creatingWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Create Account",
        bottom: 75,
        width: 400,
        height: 600,
        borderRadius: 50,
        scrollable: true
    });
    
    var closeLabel = Ti.UI.createLabel({
        top: 20,
        left: 20,
        color: "#2ab1e0",
        text: "Cancel",
        font: { fontSize: 14, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "60",
        height: "60",
        borderColor: "#2ab1e0",
        borderRadius: "30",
        borderWidth: "2"
    });
    
    var createLabel = Ti.UI.createLabel({
        top: 20,
        right: 20,
        color: "#2ab1e0",
        text: "Create",
        font: { fontSize: 14, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "60",
        height: "60",
        borderColor: "#2ab1e0",
        borderRadius: "30",
        borderWidth: "2"
    });
    
    var scrollWrapper2 = Ti.UI.createScrollView({
        top:0,
        width: 200
    });
    
    var emailLabel = Ti.UI.createLabel({
        top: 50,
        color: "#2ab1e0",
        text: "Email",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "150",
        height: "40"
        
    });
    
    var emailField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 90,
        width: 200, 
        height: 40
        
    });
    
    var userNameLabel = Ti.UI.createLabel({
        top: 150,
        color: "#2ab1e0",
        text: "Username",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "150",
        height: "40"
        
    });
    
    var usernameField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 190,
        width: 200, 
        height: 40
        
    });
    
    var passwordLabel = Ti.UI.createLabel({
        top: 250,
        color: "#2ab1e0",
        text: "Password",
        font: { fontSize: 24, fontFamily: "Helvetica Neue" },
        textAlign: "center",
        width: "150",
        height: "40"
        
    });
    
    var passwordField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 290,
        width: 200, 
        height: 40,
        passwordMask: true
        
    });
    
    var confirmField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: "#2ab1e0",
        top: 350,
        width: 200, 
        height: 40,
        hintText: "Confirm Password",
        passwordMask: true
        
    });
    
    
    if ( Ti.Platform.osname == "android"){
        creatingWindow.setHeight("auto");
        creatingWindow.setWidth("auto");
        creatingWindow.setBorderRadius(null);
    };
    
    creatingWindow.addEventListener("swipe", function(e){
        if (e.direction == "down") creatingWindow.close({modal: true}); creatingLabel.setBackgroundColor("transparent");
        
    });
    
    closeLabel.addEventListener("click", function(){
        
        closeLabel.setBackgroundColor("#2ab1e0");
        closeLabel.setColor("#fff");
        closeLabel.setBorderColor("#fff");
        
        creatingLabel.setBackgroundColor("transparent");
        creatingWindow.close({modal: true});
    });
    
    createLabel.addEventListener("click", function(){
        
        var emailValue = emailField.getValue();
        var userNameValue = usernameField.getValue();
        var passwordValue = passwordField.getValue();
        var confirmValue = confirmField.getValue();
        
        if ( ( emailValue == null || emailValue == "" || emailValue == " ") || 
             ( userNameValue == null || userNameValue == "" || userNameValue == " ") || 
             ( passwordValue == null || passwordValue == "" || passwordValue == " ") || 
             ( confirmValue == null || confirmValue == "" || confirmValue == " ") ){
            
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
            
            createLabel.setBackgroundColor("#2ab1e0");
            createLabel.setColor("#fff");
            createLabel.setBorderColor("#fff");
            
            requiringCloudCreate.creatingUserFunction([ emailValue, userNameValue, passwordValue, confirmValue]);
            
            creatingLabel.setBackgroundColor("transparent");
            creatingWindow.close({modal: true});
            
            var chatWindow = Ti.UI.createWindow({
                backgroundColor: "#2ab1e0",
                title: null,
            });
            
            var chatTableWindow = Ti.UI.createWindow({
                backgroundColor: "#fff",
                title: null,
            });
            
            var requiringTable = require("globalFunctions");
            var requiringDBextraction = require("SQLiteScripts/localStorage");
            
            var objectExtractect = requiringDBextraction.runnignDB([ 2, ["dummy" ] ]);
            
            var extractingTableReady = requiringTable.tableFactory([objectExtractect, true]);
            
            if (Ti.Platform.osname == "ipad"){
                
                extractingTableReady.addEventListener("click", function(e){
                    
                    var userView = Ti.UI.createWindow({
                        backgroundColor: "#fff",
                        width: 300,
                        height: 300,
                        borderRadius: 50
                    });
                    
                    var userNameLabel = Ti.UI.createLabel({
                        text: e.source.userUsername
                    });
                    userView.add(userNameLabel);
                    userView.open({modal: true});
                    
                    userView.addEventListener("swipe", function(e){
                        if (e.direction == "down") {
                            userView.close({modal: true});
                        };
                    });
                });
            
                chatTableWindow.add(extractingTableReady);
                
                var chatSplitWindow = Ti.UI.iPad.createSplitWindow({
                    detailView: chatWindow,
                    masterView: chatTableWindow,
                    showMasterInPortrait: true
                    
                });
                
                chatWindow.addEventListener("swipe", function(e){
                    
                    if (e.direction == "right") {
                        chatSplitWindow.showMasterInPortrait = true;
                    
                    }else if (e.direction == "left") {
                        chatSplitWindow.showMasterInPortrait = false;
                    
                    };
                    
                });
                
                chatSplitWindow.open({ animated: true });
                
            }else{
                
                extractingTableReady.addEventListener("click", function(e){
                    
                    var userView = Ti.UI.createWindow({
                        backgroundColor: "#fff",
                        width: 200,
                        height: 200,
                        borderRadius: 50
                    });
                    
                    var userNameLabel = Ti.UI.createLabel({
                        text: e.source.userUsername +"\n"+ e.source.userEmail
                    });
                    userView.add(userNameLabel);
                    userView.open({modal: true});
                    
                    userView.addEventListener("swipe", function(e){
                        if (e.direction == "down") {
                            userView.close({modal: true});
                        };
                    });
                });
                
                chatTableWindow.open({animated: true});
            
            };
            
        };//End of condition
        
    });
    
    creatingWindow.add(closeLabel);
    creatingWindow.add(createLabel);
    
    scrollWrapper2.add(emailLabel);
    scrollWrapper2.add(emailField);
    
    scrollWrapper2.add(userNameLabel);
    scrollWrapper2.add(usernameField);
    
    scrollWrapper2.add(passwordLabel);
    scrollWrapper2.add(passwordField);
    scrollWrapper2.add(confirmField);
    
    creatingWindow.add(scrollWrapper2);
    creatingWindow.open({modal: true});
});

aboutLabel.addEventListener("click", function(){
    
    var aboutWindow = Ti.UI.createWindow({
        backgroundColor: "#2ab1e0",
        title: "Hello, I'm Chris",
        bottom: 75,
        width: 400,
        height: 600
        
    });
    
    var helloLable = Ti.UI.createLabel({
        top: 0,
        color: "#fff",
        text: "Hello Hello \n I\'m Chris, nice to meet you... \n Tap my image to check out my ePortfolio, Twitter or GitBub profiles",
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
    
    aboutWindow.add(helloLable);
    aboutWindow.add(profileImage);
    aboutWindow.open({modal: true});
});

landingWindow.add(logoImage);
landingWindow.add(logingLabel);
landingWindow.add(creatingLabel);
landingWindow.add(aboutLabel);
//landingWindow.add(iconSettings);

cloudRequest();
landingWindow.open();


