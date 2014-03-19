function tableMaker(passedObjects){
    
    //Creating search bar for table
    var searchBar = Titanium.UI.createSearchBar({
        hintText: "Search Employees",
        showCancel:false,
        top:0
            
    });
        
    //Creating table 
    var tableViewReady = Ti.UI.createTableView({
        showVerticalScrollIndicator: true,
        search:                      searchBar,
        scrollsToTop:                true,
        top:                         20
    
    });
    
    if (Titanium.Platform.osname == "iphone" || Titanium.Platform.osname == "ipad"){
        //tableViewReady.searchHidden = true;
    };
    
    var universalSections  = [];
    
    var universalSectionBuilder = Ti.UI.createTableViewSection({
        headerTitle: "Employees",
    });
    
    if (passedObjects[1] == true){
        
        //Looping through remote API's object
        for (var i = 0, j = passedObjects[0].length; i < j; i++){
            
            var universalTableRowsFucntion    = Ti.UI.createTableViewRow({
                title: passedObjects[0][i].username, 
                hasChild: true,
                height: 60 
            });
            
            universalTableRowsFucntion.userEmail     = passedObjects[0][i].custom_fields.contact_email;
            universalTableRowsFucntion.userUsername  = passedObjects[0][i].username;
            universalTableRowsFucntion.userRole      = passedObjects[0][i].role;
            universalTableRowsFucntion.userFirstName = passedObjects[0][i].first_name;
            universalTableRowsFucntion.userLastName  = passedObjects[0][i].last_name;
            universalTableRowsFucntion.userAge       = passedObjects[0][i].custom_fields.user_age;
            
            universalSectionBuilder.add(universalTableRowsFucntion);
                   
        };//End of Loop
        
    }else{
        
        var universalTableRowsFucntion    = TiQ.creatingTableRows({
                title: "passedObjects[1][i].username", 
                hasChild: true,
                height: 60 
        });
        
        universalSectionBuilder.add(universalTableRowsFucntion);
    };
    
    //Pushing sections
    universalSections.push(universalSectionBuilder);
        
    //Setting data for table
    tableViewReady.setData(universalSections);
    
    return tableViewReady;
};


exports.tableFactory = tableMaker;


