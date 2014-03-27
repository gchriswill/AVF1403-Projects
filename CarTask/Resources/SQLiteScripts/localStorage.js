function daBa (passedObjects){

    var dbase = Ti.Database.open("locationsDB");
    dbase.execute( "CREATE TABLE IF NOT EXISTS carprofile ( rowid TEXT, email TEXT, password TEXT, username TEXT, carmake TEXT, carmodel TEXT, caryear TEXT, oildateset TEXT, tiredateset TEXT, enginedateset TEXT, fueldateset TEXT, fulltuneupdateset TEXT )" );
    
    switch(passedObjects[0]){
        
        case 1 :
            
            dbase.execute("DELETE FROM carprofile");
            
            Ti.API.info( "Cloud Users's cars object size: " + passedObjects[1].length);
            
            for (var i = 0, j = passedObjects[1].length; i < j; i++){
                
                var forDBarray = [ 
                    
                    passedObjects[1][i].id,
                    passedObjects[1][i].custom_fields.user_email,
                    passedObjects[1][i].custom_fields.user_password,
                    passedObjects[1][i].username,
                    passedObjects[1][i].custom_fields.user_carmake, 
                    passedObjects[1][i].custom_fields.user_carmodel,
                    passedObjects[1][i].custom_fields.user_caryear,
                    passedObjects[1][i].custom_fields.user_oildateset,
                    passedObjects[1][i].custom_fields.user_tiredateset,
                    passedObjects[1][i].custom_fields.user_enginedateset,
                    passedObjects[1][i].custom_fields.user_fueldateset,
                    passedObjects[1][i].custom_fields.user_fulltuneupdateset,
                    
                ];
                
                dbase.execute(passedObjects[2], forDBarray);
            };
            var TableRows = dbase.execute("SELECT * FROM carprofile"); 
        
            while ( TableRows.isValidRow() ){
                    
                Ti.API.info( "Synced Cloud Database to Local Storage: @--- rowid field---> \"" + TableRows.fieldByName("rowid") + "\" @--- email field ---> \"" + TableRows.fieldByName("email") + "\" @--- username field---> \"" +TableRows.fieldByName("username") +"\"" );
            
                TableRows.next();
            };
            
            TableRows.close();
            break;
        
        case 2:
            
            var TableRows2 = dbase.execute("SELECT * FROM carprofile WHERE username=\"" + passedObjects[2] + "\"");
            var uniMultiObject = [];
            
            if(TableRows2.fieldByName("username") == passedObjects[2] && TableRows2.fieldByName("password") == passedObjects[3]){
                
                uniMultiObject.push({ 
                    
                    custom_fields: { 
                        
                        "user_rowid" : TableRows2.fieldByName("rowid"),
                        "user_email": TableRows2.fieldByName("email"),
                        "user_password": TableRows2.fieldByName("password"),
                        "user_carmake": TableRows2.fieldByName("carmake"), 
                        "user_carmodel": TableRows2.fieldByName("carmodel"),  
                        "user_caryear": TableRows2.fieldByName("caryear"), 
                        "user_oildateset": TableRows2.fieldByName("oildateset"), 
                        "user_tiredateset": TableRows2.fieldByName("tiredateset"), 
                        "user_enginedateset": TableRows2.fieldByName("enginedateset"), 
                        "user_fueldateset": TableRows2.fieldByName("fueldateset"), 
                        "user_fulltuneupdateset": TableRows2.fieldByName("fulltuneupdateset") 
                    }, 
                    
                    username: TableRows2.fieldByName("username")
                
                });

            }else{
                uniMultiObject.push(null);
                alert("Incorrect User or Password");
            };
            return uniMultiObject;
            TableRows2.close();
            
            break;
    };//End Of Switch
    
    dbase.close();
};

exports.runnignDB = daBa;



