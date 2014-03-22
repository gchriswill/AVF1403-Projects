function creatingUser(userProperties) { 
    
    var Cloud = require("ti.cloud");
    
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
        if (e.success) alert("Account created successfully!");
        else alert( e.message );
    });
};
exports.creatingUserFunction = creatingUser;