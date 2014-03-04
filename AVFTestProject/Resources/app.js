Titanium.UI.setBackgroundColor("#fff");

var mainWindow = Titanium.UI.createWindow({  
    title: "Main Window",
    //tabBarHidden: true,
    backgroundColor: "#cecece"
});


var MainLabel = Titanium.UI.createLabel({
	color: "#333",
	text: "Christopher Gonzalez",
	font: { fontSize:20, fontFamily:"Helvetica Neue"},
	textAlign: "center",
	width: "auto",
	top: 40
});


var myImage = Ti.UI.createView({
  backgroundImage:"Retouched5.jpg",
  width: 200,
  height: 200,
  top: 80
});


mainWindow.add(MainLabel);
mainWindow.add(myImage);


mainWindow.open();
