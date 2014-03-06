Ti.include("TiQuery.js");
/* Anomimus Application Initiatializer Function
     * 
     * Arguments Specified in the following order: 
     * 0-New JS file path to load and execute 
     * 1-counter start value number
     * 2-counter increaser value number
     * 3-counter stop value number for the stop condition
     * 4-speed value number in miliseconds
     * 5-Optinal function to execute 
     * 
     */
    //Function sets a timer for opening the app home window from the landing page. Also, sets the loading indicator animation...
(function(passedProperties){ 
    
    // Interval loop counter
    var counter = passedProperties[1];
        
    // Creating deafult activity indicator
    var loadingIndicator = TiQ.creatingActivityIndicator();
    Ti.UI.currentWindow.add(loadingIndicator);
        
    // Setting interval for timing the landing root window
    var timer = setInterval(function(){
                
    counter+=passedProperties[2];
            
        // Condition to stop the interval and executes the rest of the source code...
        if (counter == passedProperties[3]) {
                    
            clearInterval(timer);
            Ti.UI.currentWindow.remove(loadingIndicator);
            loadingIndicator = null;
                    
            // Creating a initial root window.
            var homeWindow = TiQ.creatingWindow(["Giant Bomb", "#000", null, null, null, "#fff", passedProperties[0] ]);
            var logoTitle = TiQ.creatingLabel(["10 Most recent iPhone Games Addded From:", "#fff", "center", 18, "arial", Ti.UI.SIZE, 40, 10, null, null, null]);
            var logoView = TiQ.creatingImageView(["giantBombLogo.png", null, null, (logoTitle.top + logoTitle.height) + 10, null, null, null]);
            
            if (Ti.Platform.name == "iPhone OS"){
                homeWindow.top = 20;
                homeWindow.backgroundColor = "#fff";
                logoTitle.backgroundColor = "#fff";
                homeWindow.opacity = 0;
                
            };
            
            // Creating animation for mainTabController's transition
            TiQ.creatinCurveAnimation([homeWindow, Ti.UI.ANIMATION_CURVE_EASE_IN_OUT, 1, 2500]);
            
            //calling optinal function 
            passedProperties[5](homeWindow);
            homeWindow.add(logoTitle);
            homeWindow.add(logoView);
            homeWindow.open();
        };
    }, passedProperties[4]);
    
})([null, 0, 1, 1, 1000, function(currentWindow){
    
    //Connection Object
    var connectionExecuter = Ti.Network.createHTTPClient({
         
         //On successful load function
         onload : function(e) {
            
            //Converting from JSON object to executable script
            var dataExtracted = JSON.parse(this.responseText);
            
            //Logging connection status
            Ti.API.info("-----@ API ACCESS GRANTED @-----");
            
            //Calling the app's window controller
             windowTableInit(dataExtracted, currentWindow);
         },
         
         //On unsuccessful load function
         onerror : function(e) {
             
             //Logging connection errors
             Ti.API.debug(e.error);
             
             //Logging connection status
             Ti.API.info("-----@ API ACCESS DENIED or ERROR CONNECTION @-----");
             alert("No network connection...");
         },
         
         //Setting a time disconnetion for the connectionExecuter object
         timeout : 28000
       
    });
    
    //Opening connection
    connectionExecuter.open("GET", "http://www.giantbomb.com/api/games/?api_key=3d28249079d8c10e7d5b403b3d05b4c5c7453f7d&format=json&field_list=site_detail_url,platforms,image,deck,name,date_added&limit=10&filter=platforms:96&sort=date_added:desc");
    
    //Sending request
    connectionExecuter.send();
    
    function windowTableInit(APIobjectPassed, currentWindow){
    
        //Creating search bar for table
        var searchBar = Titanium.UI.createSearchBar({
            hintText: "Search Games",
            showCancel:false,
            top:0
            
        });
        
        //Creating table 
        var tableViewReady = TiQ.creatingTableView([true, searchBar, true, 160]);
        
        if (Ti.Platform.name == "iPhone OS"){
            
            //Hidding the search feature
            tableViewReady.searchHidden = true;
        };
        
        //Array holder for sections
        var universalSections  = [];
        
        // Creating section
        var universalSectionBuilder = TiQ.creatingSectionView(["Recent Added Games On Giant Bomb", null]);
        
        //Looping through remote API's object
        for (var i = 0, j = APIobjectPassed.results.length; i < j; i++){
            
            //BUG FOUND on Titanium!
            //Had to concatinate the "loging" property with multiple spaces for indenting the username due to the "built-in" indent feature became useles when using the search feature.
            
            var universalTableRowsFucntion = TiQ.creatingTableRows(["                " + APIobjectPassed.results[i].name, false, true]);
            
            universalTableRowsFucntion.gameName = APIobjectPassed.results[i].name;
            universalTableRowsFucntion.gameImage = APIobjectPassed.results[i].image.small_url;
            universalTableRowsFucntion.briefDescription = APIobjectPassed.results[i].deck;
            universalTableRowsFucntion.dateAdded = APIobjectPassed.results[i].date_added;
            universalTableRowsFucntion.gameWebUrl = APIobjectPassed.results[i].site_detail_url;
            
            //Creating image views for adding avatars from remote API to rows 
            var universalViewForRow = TiQ.creatingImageView( [ APIobjectPassed.results[i].image.icon_url, null, null, null, 10, null, null]);
            
            if (APIobjectPassed.results[i].name == "Forma.8" ){
                universalViewForRow.backgroundColor = "#333";
            }else{
                universalViewForRow.backgroundColor = null;
            };
            
            universalTableRowsFucntion.add(universalViewForRow);
                
            universalSectionBuilder.add(universalTableRowsFucntion);
                 
        };//End of Loop
        
        //Pushing sections
        universalSections.push(universalSectionBuilder);
        
        //Setting data for table
        tableViewReady.setData(universalSections);
        currentWindow.add(tableViewReady);
        
        tableViewReady.addEventListener("click", function(e){
            
            var modalWindow = TiQ.creatingWindow([null, "#fff", null, null, null, "#fff", null]);
            modalWindow.top = 20;
            
            var closeButton = TiQ.creatingLabel(["Close", "#336699", "center", 18, "arial", 80, 40, 20, 20, null, null]);
            closeButton.borderColor = "#336699";
            closeButton.borderRadius = 6;
            
            var openLinkButton = TiQ.creatingLabel(["Open in Giant Bomb", "#336699", "center", 18, "arial", 300, 40, null, null, null, 100]);
            openLinkButton.borderColor = "#336699";
            openLinkButton.borderRadius = 6;
            
            var tableViewReady2 = TiQ.creatingTableView([true, null, true, 40]);
            tableViewReady2.separatorStyle = 0;
            tableViewReady2.allowsSelection = false;
            tableViewReady2.scrollable = false;
            
            var universalSectionBuilder2 = TiQ.creatingSectionView([null, null]);
            
            var arrayForRow = [ 
                TiQ.creatingImageView([e.source.gameImage, null, 240, null, null, null, null]),
                TiQ.creatingLabel([e.source.gameName, "#333", "center", 16, "arial", Ti.UI.SIZE, 40, null, null, null, null]),
                TiQ.creatingLabel(["Description: \n" + e.source.briefDescription, "#333", "center", 16, "arial", null, Ti.UI.SIZE, 20, 20, 20, null]),
                TiQ.creatingLabel(["Date added: \n" + e.source.dateAdded, "#333", "center", 16, "arial", null, Ti.UI.SIZE, 20, 20, 20, null]),
                TiQ.creatingLabel(["Post URL: \n" + e.source.gameWebUrl, "#333", "center", 16, "arial", null, Ti.UI.SIZE, 20, 20, 20, null]),
            ];
            
            if (e.source.gameName == "Forma.8"){
                arrayForRow[0].backgroundColor = "#333";
            }else{
                arrayForRow[0].backgroundColor = null;
            };
            
            var arrayForTable = [];
            
            for (var i = 0; i < arrayForRow.length; i++){
                var universalTableRows = TiQ.creatingTableRows(["", false, false]);
                
                universalTableRows.add(arrayForRow[i]);
                universalSectionBuilder2.add(universalTableRows);
            };
            
            arrayForTable.push(universalSectionBuilder2);
            tableViewReady2.setData(arrayForTable);
            
            closeButton.addEventListener("click", function(){
                
                closeButton.color = "#fff";
                closeButton.backgroundColor = "#336699";
                modalWindow.close({modal: true});
            
            });
            
            openLinkButton.addEventListener("click", function(){
                
                openLinkButton.color = "#fff";
                openLinkButton.backgroundColor = "#336699";
                
                var NewModalWindow = TiQ.creatingWindow([null, "#fff", null, null, null, "#fff", null]);
                NewModalWindow.top = 20;
                
                var backButton = TiQ.creatingLabel(["Close", "#336699", "center", 18, "arial", 80, 40, 20, 20, null, null]);
                backButton.borderColor = "#336699";
                backButton.borderRadius = 6;
                
                var webView = Titanium.UI.createWebView({top: 70, url:e.source.gameWebUrl});
                
                backButton.addEventListener("click", function(){
                
                    backButton.color = "#fff";
                    backButton.backgroundColor = "#336699";
                    modalWindow.close({modal: true});
                    NewModalWindow.close({modal: true});
                });
                
                NewModalWindow.add(backButton);
                NewModalWindow.add(webView);
                NewModalWindow.open({modal: true});
            
            });
            
            modalWindow.add(tableViewReady2);
            modalWindow.add(closeButton);
            modalWindow.add(openLinkButton);
            
            modalWindow.open({modal: true});
            
        });
    
    };// End Of Function windowTableInit
    
}]);// End Of Anomimus Application Initiatializer Function


