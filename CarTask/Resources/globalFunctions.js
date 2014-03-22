function tableMaker(passedObjects){
    
    //Creating search bar for table
    var searchBar = Titanium.UI.createSearchBar({ hintText: "Search Employees", showCancel:false, top:0 });
        
    //Creating table 
    var tableViewReady = Ti.UI.createTableView({ showVerticalScrollIndicator: true, search: searchBar, scrollsToTop: true, top: 20, separatorStyle: 0 });
    
    if (Titanium.Platform.osname == "iphone" || Titanium.Platform.osname == "ipad"){
        tableViewReady.searchHidden = true;
    };
    
    var universalSections  = [];
    var universalSectionBuilder = Ti.UI.createTableViewSection({ headerTitle: "Employees", });
    
    if (passedObjects[1] == true){
        
        //Looping through remote API's object
        for (var i = 0, j = passedObjects[0].length; i < j; i++){
            
            var universalTableRowsFucntion = Ti.UI.createTableViewRow({ title: "Car Status: ", hasChild: true, height: 60 });
            
            universalTableRowsFucntion.userrowid             = passedObjects[0][i].custom_fields.userrowid;
            universalTableRowsFucntion.useremail             = passedObjects[0][i].custom_fields.useremail;
            universalTableRowsFucntion.userpassword          = passedObjects[0][i].custom_fields.userpassword;
            universalTableRowsFucntion.userusername          = passedObjects[0][i].custom_fields.userusername;
            universalTableRowsFucntion.usercarmake           = passedObjects[0][i].custom_fields.usercarmake;
            universalTableRowsFucntion.usercarmodel          = passedObjects[0][i].custom_fields.usercarmodel;
            universalTableRowsFucntion.usercaryear           = passedObjects[0][i].custom_fields.usercaryear;
            universalTableRowsFucntion.useroildateset        = passedObjects[0][i].custom_fields.useroildateset;
            universalTableRowsFucntion.usertiredateset       = passedObjects[0][i].custom_fields.usertiredateset;
            universalTableRowsFucntion.userenginedateset     = passedObjects[0][i].custom_fields.userenginedateset;
            universalTableRowsFucntion.userfueldateset       = passedObjects[0][i].custom_fields.userfueldateset;
            universalTableRowsFucntion.userfulltuneupdateset = passedObjects[0][i].custom_fields.userfulltuneupdateset;
            
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


