var printer = require("printer");

var info = {

	formats : function(req, res){
		console.log("Retrieving supported print formats.");
		res.send(printer.getSupportedPrintFormats());
	},

	jobCommands : function(req, res){
		console.log("Retrieving supported job commands.");
		res.send(printer.getSupportedJobCommands()); 
	}

}

module.exports = info;