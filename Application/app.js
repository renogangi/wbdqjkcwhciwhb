var admin = require("firebase-admin");
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://webvotingsystem.firebaseio.com/" 
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

// Adds options do db
var optionRef = db.ref("/options"); // channel name
optionRef.on("value", function(snapshot) {   //this callback will be invoked with each new object
	console.log(snapshot.val());         // How to retrive the new added object
}, function (errorObject) {             // if error
	console.log("The read failed: " + errorObject.code);
});
// Pushes option objects to db
optionRef.set({
	'o1':{
		count:0
	},
	'o2':{
		count:0
	},
	'o3':{
		count:0
	}
});

// Adds counters to db
var counterRef = db.ref("/counters"); // channel name
counterRef.on("value", function(snapshot) {   //this callback will be invoked with each new object
	console.log(snapshot.val());         // How to retrive the new added object
}, function (errorObject) {             // if error
	console.log("The read failed: " + errorObject.code);
});
// Pushes counter objects to db
counterRef.set({
	'VCA':{
		count:0
	},
	'CCA':{
		count:0
	}
});

router.use(function (req,res,next) {
	console.log("/" + req.method);
	next();
});

router.get("/",function(req,res){
	res.sendFile(path + "index.html");
});

router.get("/vote",function(req,res){
	res.sendFile(path + "vote.html");
});

app.use("/",router);

app.listen(3000,function(){
	console.log("Live at Port 3000");
});

