var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.post("/submit", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(username, password);

	res.sendStatus(200);
});

let port = process.env.PORT || 8081;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`App listening at http://${host}:${port}`);
});
