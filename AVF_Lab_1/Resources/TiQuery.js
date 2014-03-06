// "TiQuery" is Custom Titanium Modules by Christopher "GchrisWill" Gonzalez...
// TiQuery version 5.0 (AVF's Week 1 Lab 1)

/***
 *        .....             .            ....                                                                
 *     .H8888888h.  ~-.    @88>      .n~8888888nx                                                 ..         
 *     888888888888x  `>   %8P     :88>'8888888888:         x.    .                   .u    .    @L          
 *    X~     `?888888hx~    .     :8888 "*888888888k      .@88k  z88u        .u     .d88B :@8c  9888i   .dL  
 *    '      x8.^"*88*"   .@88u   '88888.         "8>    ~"8888 ^8888     ud8888.  ="8888f8888r `Y888k:*888. 
 *     `-:- X8888x       ''888E`   ?88888          'X      8888  888R   :888'8888.   4888>'88"    888E  888I 
 *          488888>        888E  ?  %888!           !      8888  888R   d888 '88%"   4888> '      888E  888I 
 *        .. `"88*         888E   ".:88"            !      8888  888R   8888.+"      4888>        888E  888I 
 *      x88888nX"      .   888E     xHH8Hx.        .X  :   8888 ,888B . 8888L       .d888L .+     888E  888I 
 *     !"*8888888n..  :    888&   :888888888hx....x\8..X  "8888Y 8888"  '8888c. .+  ^"8888*"     x888N><888' 
 *    '    "*88888888*     R888" :~  `"8888888888!`'8888   `Y"   'YP     "88888%       "Y"        "88"  888  
 *            ^"***"`       ""          `""*8*""`   "*"                    "YP'                         88F  
 *                                                                                                     98"   
 *                                                                                                   ./"     
 *                                                                                                  ~`       
 */

// Release Notes: 
// Lots of modification from outer space, thanks from the people of the planet Kepler-22b. 
// Every function object class has been change to methods from the main object "TiQ". Now, the call needs to start with "TiQ." + the function name...
// Now the functions accepts arrays only with the same properties's order as defined in it's class...  
// Every function object-classes are well documented and commented... 

/* UI Objects Classes Index
 * The folling list of classes are in the folloing order for fast access:
 * 
 * 1-createNavWindow
 * 2-creatingWindow
 * 3-creatingView
 * 4-creatingImageView
 * 5-creatingLabel
 * 6-creatingScrollableView
 * 7-creatingTab
 * 8-creatinCurveAnimation
 * 9-creatingWebView
 * 10-creatingTableView
 * 11-creatingSectionView
 * 12-creatingTableRows
 * 13-creatingActivityIndicator
 * 14-creatingButton
 * 15-creatingTextField
 * 
 */


// Function Class #1: createNavWindow (iOS specific function)- Accepts only argument, target window
//Important NOTE: There is no reason to use the Navigation Window system due to in this current app development I'm using the Tab Group system for main navigation.

var TiQ = {
    //Testing TiQuery module link to app.js 
    TiQueryLinkTest: function(){
        alert("Ready to rumble!");
    },
    
    creatingNavWindow: function (openNewWindow){
        var universalNavWindow = Ti.UI.iOS.createNavigationWindow({
            window: openNewWindow
        });
        
        return universalNavWindow;
    },//End of Function Class #1: creatingNavWindow
    
    
    /* Function Class #2: creatingWindow
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Navigation Window title
     * 1-Color value string
     * 2-Background Image value string path
     * 3-Background LeftCap value number 
     * 4-Background TopCap value number 
     * 5-barColor
     * 6-URL JS path
     * 
     */
    creatingWindow: function(passedProperties){
        
        var universalWindow = Ti.UI.createWindow({
            title:             passedProperties[0],
            backgroundColor:   passedProperties[1],
            backgroundImage:   passedProperties[2],
            backgroundLeftCap: passedProperties[3],
            backgroundTopCap:  passedProperties[4],
            barColor:          passedProperties[5],
            url:               passedProperties[6]
        });
        
        return universalWindow;
    
    },//End of Function Class #2: creatingWindow
    
    
    /* Function Class #3: creatingView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Background color value string path
     * 1-Width value number or number-string
     * 2-Height vaule number or number-string
     * 3-Top position value number or number-string
     * 4-Left position value number or number-string
     * 5-Right position value number or number-string
     * 6-Bottom position value number or number-string
     *  
     */
    creatingView: function(passedProperties){
        
        var universalView = Ti.UI.createView({
            backgroundColor:  passedProperties[0],
            width:            passedProperties[1],
            height:           passedProperties[2],
            top:              passedProperties[3],
            left:             passedProperties[4],
            right:            passedProperties[5],
            bottom:           passedProperties[6]
        });
        
        return universalView;
    },//End of Function Class #3: creatingView
    
    
    /* Function Class #4: creatingImageView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Image value string path
     * 1-Width value number or number-string
     * 2-Height vaule number or number-string
     * 3-Top position value number or number-string
     * 4-Left position value number or number-string
     * 5-Right position value number or number-string
     * 6-Bottom position value number or number-string
     *  
     */
    creatingImageView: function(passedProperties){
        
        var universalImageView = Ti.UI.createImageView({
            image:  passedProperties[0],
            width:  passedProperties[1],
            height: passedProperties[2],
            top:    passedProperties[3],
            left:   passedProperties[4],
            right:  passedProperties[5],
            bottom: passedProperties[6]
        });
    
        return universalImageView;
    
    },//End of Function Class #4: creatingImageView
    
    
    /* Function Class #5: creatingLabel
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Text value string
     * 1-Text's Color value string
     * 2-Text's Align value string
     * 3-Font's Size value number or number-string
     * 4-Font's family value string
     * 5-Width value number or number-string
     * 6-Height vaule number or number-string
     * 7-Top position value number or number-string
     * 8-Left position value number or number-string
     * 9-Right position value number or number-string
     * 10-Bottom position value number or number-string
     * 
     */
    creatingLabel: function(passedProperties){
        
        var universalLabel = Ti.UI.createLabel({
            text:      passedProperties[0],
            color:     passedProperties[1],
            textAlign: passedProperties[2],
            font:      {fontSize: passedProperties[3], fontFamily: passedProperties[4]},
            width:     passedProperties[5],
            height:    passedProperties[6],
            top:       passedProperties[7],
            left:      passedProperties[8],
            right:     passedProperties[9],
            bottom:    passedProperties[10],
            
        });
    
        return universalLabel;
    },//End of Function Class #5: creatingLabel
    
    
    /* Function Class #6: creatingScrollableView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Show pagination controll
     * 1-Pagination control color
     * 2-Views Array
     * 3-Width value number or number-string
     * 4-Height vaule number or number-string
     * 5-Top position value number or number-string
     * 6-Left position value number or number-string
     * 7-Right position value number or number-string
     * 8-Bottom position value number or number-string
     *  
     */
    creatingScrollableView: function(passedProperties){
        
        var universalScrollableView = Ti.UI.createScrollableView({
            showPagingControl:   passedProperties[0],
            pagingControlColor:  passedProperties[1], 
            views:               passedProperties[2],
            width:               passedProperties[3],
            height:              passedProperties[4],
            top:                 passedProperties[5],
            left:                passedProperties[6],
            right:               passedProperties[7],
            bottom:              passedProperties[8]
    
        });
        
        return universalScrollableView;
    },//End of Function Class #6: creatingScrollableView
    
    
    /* Function Class #7: creatingTab
     * 
     * Function call's arguments Specified in the following order:
     * 0-Window object
     * 1-Icon Images Path
     * 2-Title string value
     * 
     */
    creatingTab: function(passedProperties){
        
        var universalTab = Titanium.UI.createTab({
            window: passedProperties[0],
            icon:   passedProperties[1],
            title:  passedProperties[2]
        });
        if (Ti.Platform.name !== "iPhone OS"){
            universalTab.backgroundColor = "darkgray";
        };
        
        windowName.title = passedProperties[2];
        
        return universalTab;
    },
    //End of Function Class #7: creatingTab
    
    
    /* Function Class #8: creatinCurveAnimation
     * 
     * Function call's arguments Specified in the following order:
     * 0-Target UI view 
     * 1-Curve Type 
     * 2-Opacity Value decimal number
     * 3-duration value number 
     */
    creatinCurveAnimation: function(passedProperties){
        
        //iOS compatibility conditional 
        if (Ti.Platform.name == "iPhone OS"){
            passedProperties[0].animate({
                curve:    passedProperties[1], 
                opacity:  passedProperties[2], 
                duration: passedProperties[3]
            });
        }
        Ti.API.info("Alert by TiQuery ---> Curve Animation executed but not supported on Andriod");
       
           
    },//End of Function Class #8: creatinCurveAnimation
    
    
    /* Function Class #9: creatingWebView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-URL path string
     * 1-Zoom control enabler Boolean
     * 2-Scale page to fit window or view boolean
     * 3-Scroll to top of window or view boolean
     * 4-Show scroll indicator bar boolean
     * 5-Width value number or number-string
     * 6-Height vaule number or number-string
     * 7-Top position value number or number-string
     * 8-Left position value number or number-string
     * 9-Right position value number or number-string
     * 10-Bottom position value number or number-string
     *  
     */
    creatingWebView: function(passedProperties){
        
        var universalWebView = Ti.UI.createWebView({
            url:               passedProperties[0],
            enableZoomControl: passedProperties[1],
            scalesPageToFit:   passedProperties[2],
            scrollsToTop:      passedProperties[3],
            showScrollBars:    passedProperties[4],
            width:             passedProperties[5],
            height:            passedProperties[6],
            top:               passedProperties[7],
            left:              passedProperties[8],
            right:             passedProperties[9],
            bottom:            passedProperties[10]
        });
        
        return universalWebView;
    },//End of Function Class #9: creatingWebView
    
    
    /* Function Class #10: creatingTableView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Show scroll Indicator value boolean
     * 1-Search object 
     * 2-Scroll to top feature with tap on menubar value boolean
     * 3-Top value number
     * 
     *  
     */
    creatingTableView: function(passedProperties){     
        
        var universalReadyTable = Ti.UI.createTableView({
            showVerticalScrollIndicator: passedProperties[0],
            search:                      passedProperties[1],
            scrollsToTop:                passedProperties[2],
            top:                         passedProperties[3]
        
        });
        
        return universalReadyTable;
        
    },//End of Function Class #10: creatingTableView
    
    
    /* Function Class #11: creatingSectionView
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Section header title value string
     * 1-Section footer title value string 
     * 
     *  
     */
    creatingSectionView: function(passedProperties){
        
        var UniversalStableSection  = Ti.UI.createTableViewSection({
            headerTitle: passedProperties[0],
            footerTitle: passedProperties[1]
        });
        
        return UniversalStableSection;
        
    },//End of Function Class #11: creatingSectionView
    
    
    /* Function Class #12: creatingTableRows
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Row data title value string for using and passing
     * 1-Row has a child feture boolean value
     * 2-Row has a detail information feature boolean value
     * 
     *  
     */
    creatingTableRows: function(passedProperties){
        
        var UniversalTableRows = Ti.UI.createTableViewRow({
            title:     passedProperties[0],
            hasChild:  passedProperties[1],
            hasDetail: passedProperties[2],
        });
                                    
        return UniversalTableRows;
                            
    },//End of Function Class #12: creatingTableRows
    
    
    /* Function Class #13: creatingActivityIndicator
     * 
     * No arguments passed
     *  
     */
    creatingActivityIndicator: function(){
        
        var windowActivityIndicator = Ti.UI.createActivityIndicator({
                color:  "#333",
                font:   {fontFamily: "arial", fontSize:26, fontWeight:"bold"},
                message: "Loading...",
                bottom: null,
                height: "auto",
                width:  "auto"
        });
        if (Ti.Platform.name == "iPhone OS"){
            windowActivityIndicator.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
        }else{
            windowActivityIndicator.style = 2;
        };   
        
        windowActivityIndicator.show();
        
        return windowActivityIndicator;
    },//End Of Function Class #13: creatingActivityIndicator
    
    
    
    /* Function Class #14: creatingButton
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Button style module
     * 1-Scale page to fit window or view boolean
     * 2-Scroll to top of window or view boolean
     * 3-Show scroll indicator bar boolean
     * 4-Width value number or number-string
     * 5-Height vaule number or number-string
     * 6-Top value
     * 7-left value
     * 8-right value
     * 9-bottom value
     * 
     */
    creatingButton: function(passedProperties){
        
        var universalButton = Ti.UI.createButton({
            systemButton: passedProperties[0],
            title:        passedProperties[1],
            image:        passedProperties[2],
            style:        passedProperties[3],
            width:        passedProperties[4],
            height:       passedProperties[5],
            top:          passedProperties[6],
            left:         passedProperties[7],
            right:        passedProperties[8],
            bottom:       passedProperties[9]
        });
        
        return universalButton;
    },// End Of Function Class #14: creatingButton
    
    
    
    /* Function Class #15: creatingTextField
     * 
     * Function call's arguments Specified in the following order: 
     * 0-Border style value
     * 1-Enable return key suppresor boolean
     * 2-Return key type integer
     * 3-Hint text string
     * 4-Password mask value boolean
     * 5-Color value string
     * 6-Width value number or number-string
     * 7-Height vaule number or number-string
     * 8-Top position value number or number-string
     * 9-Left position value number or number-string
     * 10-Right position value number or number-string
     * 11-Bottom position value number or number-string
     *  
     */
    creatingTextField: function(passedProperties){
        
        var universalTextField = Ti.UI.createTextField({
            borderStyle:     passedProperties[0],
            enableReturnKey: passedProperties[1],
            returnKeyType:   passedProperties[2],
            hintText:        passedProperties[3],
            passwordMask:    passedProperties[4],
            color:           passedProperties[5],
            width:           passedProperties[6], 
            height:          passedProperties[7],
            top:             passedProperties[8],
            left:            passedProperties[9],
            right:           passedProperties[10], 
            bottom:          passedProperties[11]
        });
        
        return universalTextField;
    },// End Of Function Class #15: applicationInitializer
};
