var configMessages = require('./config-messages');

/**
 * Called from the driver's config method when a
 * user wants to see a menu to configure the driver
 * @param  {Function} cb Callback to send a response back to the user
 */
exports.menu = function(opts,cb) {
	var returnMenu = configMessages.menu;
	returnMenu.contents[3].value = opts.ip_address;
	returnMenu.contents[4].value = opts.port;
	returnMenu.contents[5].value = opts.username;
	returnMenu.contents[6].value = opts.password;
	returnMenu.contents[8].value = opts.interval;
	cb(null,configMessages.menu);
};

/**
 * Called when a user clicks the 'Echo back to me'
 * button we sent in the menu request
 * @param  {Object}   params Parameter object
 * @param  {Function} cb     Callback to send back to the user
 */
exports.echo = function(opts,params,cb) {
	// User clicked Save - save settings
	var echoText = params.echoText;
	var payloadToSend = configMessages.echo;
	opts.ip_address = params.ip_address;
	opts.port = params.port;
	opts.username = params.username;
	opts.password = params.password;
	opts.interval = params.interval;
	this.save();
	cb(null,payloadToSend);
};
