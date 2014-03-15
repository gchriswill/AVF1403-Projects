
function userAccountLogin(userProperties) { 
    
    var Cloud = require('ti.cloud');
    
    Cloud.debug = true;
    
    Cloud.Users.login({
        
        login: userProperties[0],
        password: userProperties[1]
        
    }, function(e){
        
        if (e.success){
            
            alert("You have successfully logged in...");
        
        } else {
            
            alert( e.message );
            
        };
        
    });

};
exports.userAccountLoginFunction = userAccountLogin;
