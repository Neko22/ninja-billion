var Billion = require('./lib/billion');
var util = require('util');
var stream = require('stream');
var configHandlers = require('./lib/config-handlers');
var cheerio = require('cheerio');

// Give our driver a stream interface
util.inherits(billionDriver,stream);

// Enable/disable
var enabled = true;

// Our greeting to the user.
var HELLO_WORLD_ANNOUNCEMENT = {
  "contents": [
    { "type": "heading",   "text": "Ninja Billion Router Monitor Loaded" },
    { "type": "paragraph", "text": "The Ninja Billion Router Monitor has been loaded." },
	{ "type": "paragraph", "text": "Please go to the Driver Settings to enter your Router username and password." }
  ]
};

/**
 * Called when our client starts up
 * @constructor
 *
 * @param  {Object} opts Saved/default driver configuration
 * @param  {Object} app  The app event emitter
 * @param  {String} app.id The client serial number
 *
 * @property  {Function} save When called will save the contents of `opts`
 * @property  {Function} config Will be called when config data is received from the Ninja Platform
 *
 * @fires register - Emit this when you wish to register a device (see Device)
 * @fires config - Emit this when you wish to send config data back to the Ninja Platform
 */
function billionDriver(opts,app) {

	var self = this;
	this.opts = opts;

	app.on('client::up',function(){
		if (enabled) {
			// The client is now connected to the Ninja Platform

			// Check if we have sent an announcement before.
			// If not, send one and save the fact that we have.
			if (!opts.hasSentAnnouncement) {
				self.emit('announcement', HELLO_WORLD_ANNOUNCEMENT);
				opts.hasSentAnnouncement = true;
				self.save();
			}
			
			// Set Default Settings
			if (opts.ip_address == undefined) { opts.ip_address="192.168.0.1"; } // IP Address of Router
			if (opts.port == undefined) { opts.port="80"; } // Port of Router
			if (opts.username == undefined) { opts.username=""; }
			if (opts.password == undefined) { opts.password=""; }
			if (opts.pages == undefined) { opts.pages=["/status/adslstatics.html","/statswan.cmd"]; } // List of hard-coded pages to check through, in order to find the byte count
			if (opts.page == undefined) { opts.page=0; } // pointer to the array of pages. When we find one that works, we stick with it unless it is not available.
			if (opts.interval == undefined) { opts.interval=10; } // interval in seconds
			if (opts.transmitted == undefined) { opts.transmitted=0; } // total amount of bytes transmitted
			if (opts.received == undefined) { opts.received=0; } // total amount of bytes received		
			this.opts = opts;
			
			// Register a device
			self.emit('register', new Billion(app, opts, "Transmitted"));
			self.emit('register', new Billion(app, opts, "Received"));
		}
	});
};


/**
 * Called when a user prompts a configuration.
 * If `rpc` is null, the user is asking for a menu of actions
 * This menu should have rpc_methods attached to them
 *
 * @param  {Object}   rpc     RPC Object
 * @param  {String}   rpc.method The method from the last payload
 * @param  {Object}   rpc.params Any input data the user provided
 * @param  {Function} cb      Used to match up requests.
 */
billionDriver.prototype.config = function(rpc,cb) {
	var self = this;

	// If rpc is null, we should send the user a menu of what he/she
	// can do.
	// Otherwise, we will try action the rpc method
	if (!rpc) {
		return configHandlers.menu.call(this, this.opts, cb);
	} else if (typeof configHandlers[rpc.method] === "function") {
		return configHandlers[rpc.method].call(this, this.opts, rpc.params, cb);
	} else {
		return cb(true);
	}
};

// Export it
module.exports = billionDriver;
