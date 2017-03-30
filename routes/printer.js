var printLibrary = require("printer");

var printer = {

	getDefaultPrinterName: function(req, res) {
		console.log("Retrieving default printer")
		var defaultPrinterName = printer.getDefaultPrinterName();
		res.send(printLibrary.getPrinter(defaultPrinterName));
	},

	getAll: function(req, res) {
		console.log("Retrieving collection of all printers")
        res.send(printLibrary.getPrinters());
	},

	getPrinterPaperSize : function(req,res) {
		console.log("Retreiving print %s paper size", req.params.name);
        res.send(printLibrary.getSelectedPaperSize(req.params.name));
    },

    getPrinterDriverOptions : function(req,res) {
        console.log("Retreiving print %s driver options", req.params.name);     
		res.send(printLibrary.getPrinterDriverOptions(req.params.name));
    },

	getPrinterByName : function(req,res) {       
		console.log("Retreiving printer called %s", req.params.name);
		res.send(printLibrary.getPrinter(req.params.name));
	},

	getJob : function(req, res) {
		console.log("Retrieving job.")
	},

	setJob :  function(req, res) {
		console.log("Updating job")
	}

}

module.exports = printer;
