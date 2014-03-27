function creatingUser(userProperties) { 
    
    if (Ti.Network.getOnline() == true) {
        
        var Cloud   = require("ti.cloud");
        Cloud.debug = true;
        Cloud.Users.create({
            email: userProperties[0],
            username: userProperties[1],
            password: userProperties[2],
            password_confirmation: userProperties[3],
            
            custom_fields: {
                "user_email": userProperties[0],
                "user_password": userProperties[2],
                "user_carmake": "\"update ASAP\"", 
                "user_carmodel": "\"update ASAP\"",  
                "user_caryear": "\"update ASAP\"", 
                "user_oildateset": "\"update ASAP\"", 
                "user_tiredateset": "\"update ASAP\"", 
                "user_enginedateset": "\"update ASAP\"", 
                "user_fueldateset": "\"update ASAP\"", 
                "user_fulltuneupdateset": "\"update ASAP\""
            }
            
        }, function(e){
            if (e.success){ 
                
                if(userProperties[4] == true) alert("Account created successfully!");
                
                var gettingDBfileAndExtraction = require("SQLiteScripts/localStorage");
                gettingDBfileAndExtraction.runnignDB([ 1, e.users, "INSERT INTO carprofile ( rowid, email, password, username, carmake, carmodel, caryear, oildateset, tiredateset, enginedateset, fueldateset, fulltuneupdateset) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ]);
                
                var gettingCloudLogin          = require("cloudScripts/userLogin");
                var testclose                  = gettingCloudLogin.userAccountLoginFunction([ userProperties[1], userProperties[2], false ]);
                
                var objectExtractect           = gettingDBfileAndExtraction.runnignDB([ 2, ["dummy" ], userProperties[1], userProperties[2] ]);
            
            } else { 
                
                alert( e.message );
            
            };
        
        });
        
    }else{
        alert("Can't create an account while on Offlina Mode");
    };
};
exports.creatingUserFunction = creatingUser;