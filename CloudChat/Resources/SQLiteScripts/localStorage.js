function daBa (passedObjects){

    var dbase = Ti.Database.open("locationsDB");
    dbase.execute("CREATE TABLE IF NOT EXISTS workers ( email TEXT, username TEXT, role TEXT, name TEXT, lastname TEXT, age TEXT)");
    
    switch(passedObjects[0]){
        
        case 1 :
            
            dbase.execute("DELETE FROM workers");
            Ti.API.info( "Cloud Users object size: " + passedObjects[1].length);
            
            for (var i = 0, j = passedObjects[1].length; i < j; i++){
                
                var forDBarray = [ 
                    
                    passedObjects[1][i].custom_fields.contact_email, 
                    passedObjects[1][i].username, 
                    passedObjects[1][i].role, 
                    passedObjects[1][i].first_name, 
                    passedObjects[1][i].last_name, 
                    passedObjects[1][i].custom_fields.user_age 
                
                ];
                
                dbase.execute(passedObjects[2], forDBarray);
            };
            var TableRows = dbase.execute("SELECT * FROM workers"); 
        
            // while ( TableRows.isValidRow() ){
//                     
                // Ti.API.info( "Synced on Database: rowid field--->" + TableRows.fieldByName("rowid") + " email field---> " + TableRows.fieldByName("email") + " username field---> " + TableRows.fieldByName("username") + " role field---> " + TableRows.fieldByName("role") + " name field---> " + TableRows.fieldByName("name") + " lastname field---> " + TableRows.fieldByName("lastname") + " age field---> " + TableRows.fieldByName("age") );
//             
                // TableRows.next();
            // };
            
            TableRows.close();
            break;
        
        case 2:
            var TableRows2 = dbase.execute("SELECT * FROM workers");
            
            var uniMultiObject = [];
                while (TableRows2.isValidRow()){
                    
                    uniMultiObject.push({ 
                        custom_fields: { contact_email: TableRows2.fieldByName("email") }, 
                        username: TableRows2.fieldByName("username"), 
                        role: TableRows2.fieldByName("role"), 
                        first_name: TableRows2.fieldByName("name"),  
                        last_name: TableRows2.fieldByName("lastname"), 
                        custom_fields: { user_age: TableRows2.fieldByName("age")}, 
                    });
                    
                    TableRows2.next();
                };
            return uniMultiObject;
            
            TableRows2.close();
            
            break;
    };//End Of Switch
    
    dbase.close();
};

exports.runnignDB = daBa;



