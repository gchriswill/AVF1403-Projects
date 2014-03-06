/*
 * Student: Christopher Gonzalez
 * Student number: 3302426
 * Current Class: Advance Virtual Frameworks
 * Current Term: 1403
 * Current Instructor: Jennifer McCarrick
 * Degree: Mobile Development
 * Institution: Full Sail University
 * Signature: 
 *
 *          ....        .                                         .       .x+=:.        ...    .     ...         .          ..       .. 
 *       .x88" `^x~  xH(`               .uef^"                   @88>    z`    ^%    .~`"888x.!**h.-``888h.     @88>  x .d88"  x .d88"  
 *      X888   x8 ` 8888h             :d88E          .u    .     %8P        .   <k  dX   `8888   :X   48888>    %8P    5888R    5888R   
 *     88888  888.  %8888         .   `888E        .d88B :@8c     .       .@8Ned8" '888x  8888  X88.  '8888>     .     '888R    '888R   
 *    <8888X X8888   X8?     .udR88N   888E .z8k  ="8888f8888r  .@88u   .@^%8888"  '88888 8888X:8888:   )?""`  .@88u    888R     888R   
 *    X8888> 488888>"8888x  <888'888k  888E~?888L   4888>'88"  ''888E` x88:  `)8b.  `8888>8888 '88888>.88h.   ''888E`   888R     888R   
 *    X8888>  888888 '8888L 9888 'Y"   888E  888E   4888> '      888E  8888N=*8888    `8" 888f  `8888>X88888.   888E    888R     888R   
 *    ?8888X   ?8888>'8888X 9888       888E  888E   4888>        888E   %8"    R88   -~` '8%"     88" `88888X   888E    888R     888R   
 *     8888X h  8888 '8888~ 9888       888E  888E  .d888L .+     888E    @8Wou 9%    .H888n.      XHn.  `*88!   888E    888R     888R   
 *      ?888  -:8*"  <888"  ?8888u../  888E  888E  ^"8888*"      888&  .888888P`    :88888888x..x88888X.  `!    888&   .888B .  .888B . 
 *       `*88.      :88%     "8888P'  m888N= 888>     "Y"        R888" `   ^"F      f  ^%888888% `*88888nx"     R888"  ^*888%   ^*888%  
 *          ^"~====""`         "P'     `Y"   888                  ""                     `"**"`    `"**""        ""      "%       "%    
 *                                          J88"                                                                                        
 *                                          @%                                                                                          
 *                                        :"                                                                                            
 */
//Note: The Giant Bomb image logo is property of CBS Interactive Inc. Extracted from http://www.giantbomb.com on Tuesday March 4, 2014. 

//Including TiQuery Library
Ti.include("TiQuery.js");

//Setting Default background color
Titanium.UI.setBackgroundColor("#000");

//Creating initialization for landing window
var landingWin = TiQ.creatingWindow([null, "#000", null, null, null, "#fff", "TiQ_AppInit.js"]);
if (Ti.Platform.name == "iPhone OS"){
    landingWin.backgroundColor = "fff";
    Titanium.UI.setBackgroundColor("#fff");
};
//Opening landing window
landingWin.open();
