var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/index.html"));
});

let port = process.env.PORT || 8081;
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`App listening at http://${host}:${port}`);
});
