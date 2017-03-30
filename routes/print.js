var printer = require("printer");

var print = {

	sendToPrinter : function(req, res) {
		console.log("Sending object to printer for printing");
		res.send(req.body);
	}
}

module.exports = print;
