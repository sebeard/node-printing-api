var express = require('express');
var passport = require('passport');

var router = express.Router();

var authController = require('./auth');
var printerController = require('./printer');
var printController = require('./print');
var infoController = require('./info'); 
var userController = require('./user');
var clientController = require('./client');
var oauth2Controller = require('./oauth2')

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/printers', authController.isAuthenticated, printerController.getAll);
router.get('/printers/:name', authController.isAuthenticated, printerController.getPrinterByName);
router.get('printers?default', authController.isAuthenticated, printerController.getDefaultPrinterName);
router.get('/printers/:name?driverOptions', authController.isAuthenticated, printerController.getPrinterDriverOptions);
router.get('/printers/:name?paperSize', authController.isAuthenticated, printerController.getPrinterPaperSize);
router.get('/printers/:name/jobs/:jobId', authController.isAuthenticated, printerController.getJob);
router.put('/printers/:name/jobs/:jobId', authController.isAuthenticated, printerController.setJob);

router.route('/users')
	.post(userController.create)

//router.route('/users/:user_id')
//	.get(authController.isAuthenticated, userController.retrieve)
//	.put(authController.isAuthenticated, userController.update)
//	.delete(authController.isAuthenticated, userController.delete);
	
// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);
  
// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

router.get('info/jobCommands', authController.isAuthenticated, infoController.jobCommands);
router.get('/info/formats', authController.isAuthenticated, infoController.formats);

router.post('/print', authController.isAuthenticated, printController.sendToPrinter);

module.exports = router;
