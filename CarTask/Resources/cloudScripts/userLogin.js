
function userAccountLogin(userProperties) { 
    
    if (Ti.Network.getOnline() == true) {
        
        var Cloud = require("ti.cloud");
        Cloud.debug = true;
        Cloud.Users.login({
            login: userProperties[0],
            password: userProperties[1]
        }, function(e){
            
            if (e.success){ 
                
                if (userProperties[2] == true) alert("You have successfully logged in...");  
                else alert("Account created successfully! \n Also, you are now legged in...");
                
                var requiringDBextraction = require("SQLiteScripts/localStorage");
                var objectExtractect      = requiringDBextraction.runnignDB([ 2, ["dummy"], userProperties[0], userProperties[1] ]);
                
                Ti.API.info( "ONLINE Mode! Table \"carprofile\" from database initializing, executing and extracting the following data: ");
                
                for (var n in objectExtractect[0].custom_fields){
                    
                    Ti.API.info("@--- Item: " + n + " ---> \"" + objectExtractect[0].custom_fields[n] + "\" = $_Extracted item successfull" );
                
                };
                Ti.API.info("Data extracted from: " + objectExtractect[0].username);
                
                var carStatusWindow = Ti.UI.createWindow({
                    backgroundColor: "#cecece",
                });
                
                var requiringTable        = require("globalFunctions");
                var extractingTableReady  = requiringTable.tableFactory([objectExtractect, true]);
                carStatusWindow.add(extractingTableReady[0]);
                carStatusWindow.add(extractingTableReady[1]);
                carStatusWindow.open();
                
            } else {
                
                alert( e.message );
                
            };
        });
        
    }else{
        
         var requiringDBextraction = require("SQLiteScripts/localStorage");
         var objectExtractect      = requiringDBextraction.runnignDB([ 2, ["dummy"], userProperties[0],  userProperties[1] ]);
          
         if(objectExtractect[0] !== null){
            
            Ti.API.info("OFFLINE Mode! Table \"carprofile\" from database initializing, executing and extracting the following data: ");
              
            for (var n in objectExtractect[0].custom_fields){
                    
                Ti.API.info("@--- Item: " + n + " ---> " + objectExtractect[0].custom_fields[n] + " = $_Extracted item successfull");
                    
            };
                
            Ti.API.info("Data extracted from: " + objectExtractect[0].username);
            Ti.API.info("Take that SQLite, BOOM!!!!! >:-P");
            

         } else {
               
            Ti.API.info("Do somthing!");
           
         };
    };
};

exports.userAccountLoginFunction = userAccountLogin;
