function tableMaker(passedObjects){
    
    var galleryFolder = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "iconsForTable");
    var myGalleryImagesCount = galleryFolder.getDirectoryListing();
    
    var calculationPlatformWidth = Ti.Platform.displayCaps.platformWidth;
    var imagesMargin = 75;
    
    if (Ti.Platform.osname == "android") {
        imagesMargin = 125;
    };
    var imagesPerRow = 4;
    var imagesTotalSpace = imagesMargin * (imagesPerRow + 1);    
    var lengthCounter = myGalleryImagesCount.length - 1;
    var imagesHolderArray = [];
    
    var scrollViewContainer = Ti.UI.createScrollView({
        backgroundColor: "#fff",
        layout: "horizontal",
        contentWidth: "100%",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        top: 20,
        height: 200,
        width: "100%",
        horizontalWrap: true,
        
    });
    
    var rowHolder = [];
    
    var viewTableContainer = Ti.UI.createTableView({ top: scrollViewContainer.top + scrollViewContainer.height, separatorStyle: 0 });
    
    var viewRow = Ti.UI.createTableViewRow({ title: " ", height: 200 });
    
    var carInfoView = Ti.UI.createLabel({ top: 0, color: "#333", text: "Click the icons to see your reminders", font: { fontSize: 24, fontFamily: "Helvetica Neue" }, textAlign: "center"});

    viewRow.add(carInfoView);
    
    if (Ti.Platform.osname == "android"){
        scrollViewContainer.top = 0;
        scrollViewContainer.height = 100;
        
    };
    
    for (var i = 0, j = myGalleryImagesCount.length; i < j; i++){
        
        var myImagesContainers = Ti.UI.createView({
            backgroundImage: "iconsForTable/" + myGalleryImagesCount[i],
            width: (calculationPlatformWidth / imagesPerRow) - (imagesTotalSpace / imagesPerRow),
            height: 100,
            top: 50,
            left: 50,
            verificator: true,
            zIndex: 15,
            identifierDex: i,
            userrowid: passedObjects[0][0].custom_fields.user_rowid,
            useremail: passedObjects[0][0].custom_fields.user_email,
            userpassword: passedObjects[0][0].custom_fields.user_password,
            userusername: passedObjects[0][0].custom_fields.user_username,
            
            usercarmake: passedObjects[0][0].custom_fields.user_carmake,
            usercarmodel: passedObjects[0][0].custom_fields.user_carmodel,
            usercaryear: passedObjects[0][0].custom_fields.user_caryear,
            useroildateset: passedObjects[0][0].custom_fields.user_oildateset,
            usertiredateset: passedObjects[0][0].custom_fields.user_tiredateset,
            userenginedateset: passedObjects[0][0].custom_fields.user_enginedateset,
            userfueldateset: passedObjects[0][0].custom_fields.user_fueldateset,
            userfulltuneupdateset: passedObjects[0][0].custom_fields.user_fulltuneupdateset
        });
        
        if (Ti.Platform.osname == "android") {
            myImagesContainers.top = 20; 
            myImagesContainers.height = 20;
        };
        imagesHolderArray.push(myImagesContainers);
        scrollViewContainer.add(myImagesContainers);
        
    };
    
    scrollViewContainer.addEventListener("click", function(e){
        
        var carData1 = Ti.UI.createTextField({
            top: 0,
            height: 40,
            editable: false,
            value: e.source.usercarmake,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: '#336699'
        });
    
        var carData2 = Ti.UI.createTextField({
            top: 50,
            height: 40,
            editable: false,
            value: e.source.usercarmodel,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: '#336699'
        });
        
        var carData3 = Ti.UI.createTextField({
            top: 100,
            height: 40,
            editable: false,
            value: e.source.usercaryear,
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: '#336699'
        });
        
        var carData4 = Ti.UI.createTextField({
            top: 150,
            height: 40,
            editable: false,
            value: "Tour scheduled time is: ",
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            color: '#336699'
        });
        
        rowHolder = [];
        
        switch(e.source.identifierDex){
            
            case 0: 
                
                carData4.setValue("Your scheduled reminder is: " + e.source.userenginedateset);
                break;
                 
            case 1: 
                
                carData4.setValue("Your scheduled reminder is: " + e.source.userfueldateset);
                break;
            
            case 2: 
                
                carData4.setValue("Your scheduled reminder is: " + e.source.useroildateset);
                break;
            
            case 3: 
                
                carData4.setValue("Your scheduled reminder is: " + e.source.usertiredateset);
                break;
            
            case 4: 
                
                carData4.setValue("Your scheduled reminder is: " + e.source.userfulltuneupdateset);
                break;
        };
        
        rowHolder.push(viewRow);
        viewTableContainer.setData(rowHolder);
        viewRow.add(carData1);
        viewRow.add(carData2);
        viewRow.add(carData3);
        viewRow.add(carData4);
        carInfoView.setText(" ");
    });         
    
    rowHolder.push(viewRow);
    viewTableContainer.setData(rowHolder);
    
    
    return [scrollViewContainer, viewTableContainer];
};

exports.tableFactory = tableMaker;


