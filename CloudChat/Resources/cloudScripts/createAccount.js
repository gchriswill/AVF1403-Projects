function creatingUser(userProperties) { 
    
    var Cloud = require("ti.cloud");
    
    Cloud.debug = true;
    
    Cloud.Users.create({
        
        email: userProperties[0],
        
        username: userProperties[1],
        
        role: "Please update info ASAP",
        
        first_name: "Please update name ASAP",
        
        last_name: "Please update last name ASAP",
        
        password: userProperties[2],
        
        password_confirmation: userProperties[3],
        
        custom_fields: { 
            "contact_email" : userProperties[0], 
            "user_age" : "Please update your age ASAP" }
        
    }, function(e){

        if (e.success){
            
            alert("Account created successfully!");
        
        } else alert( e.message );
        
    });
};
exports.creatingUserFunction = creatingUser;