var stream = require('stream')
, util = require('util')
, os = require('os')
, http = require('http')
, exec = require('child_process').exec
, child;
var cheerio = require('cheerio');

// Give our device a stream interface
util.inherits(Billion,stream);

// Export it
module.exports=Billion;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function Billion(app, opts, action) {
    var self = this;

    this.readable = true; // This device will emit data
    this.writeable = false; // This device cannot be actuated 
    this.V = 0; // 0 is Ninja Blocks' device list
	switch(action) {
		case "Received": this.D=530; break;
		case "Transmitted": this.D=540; break;
	}
	this.G = "Billion"; // G is a string a represents the channel
	this.name = "Billion Router - "+action;

    process.nextTick(function() {
        setInterval(function() {
			if (opts.username != "" && opts.password != "") { 
				console.log("Connecting to ["+opts.ip_address+":"+opts.port+opts.pages[opts.page]+"]");
				var options = {
					host: opts.ip_address,
					port: opts.port, 
					path: opts.pages[opts.page], 
					auth: opts.username+":"+opts.password				
				}
				var request = http.get(options, function(res) {
					res.on("data", function(chunk) {
						console.log("Received Data");
						var $ = cheerio.load(chunk); // Load result into a jquery style object
						console.log("Cheerio Loaded Data");
						
						var cell_index = $("td:contains('"+action+"')").eq(); // Find the table cell with the word "Received" or "Transmitted"
						var total = $("td:contains('"+action+"')").closest("tr").next().next().children().eq(cell_index); // Look for two table cells down from that cell
						if (!IsNumeric(total)) {
							console.log("Could Not Find "+action+" Count: ["+total+"]");
							self.emit('data', 0); 
						} else {
							var per_second = 0;
							if (opts.received != 0) {
								per_second = Math.ceil(((total - opts.received) / 1000) / opts.interval); 
								console.log("Network "+action+": "+per_second+" KB/s ["+opts.received+" -> "+total+" / "+opts.interval+" sec]");
							}
							opts.received = total;
							self.emit('data', per_second); 
						}
					});
				}).on('error', function(e) {
					// Cycle through to a different webpage for next interval
					console.log("Error: "+e.message+" - Cycling Page");
					opts.page++; if (opts.page >= opts.pages.length) { opts.page=0; } 
					self.emit('data', 0); 
				});
				request.setTimeout((opts.interval/2), function( ) {
					console.log("Timed out - Cycling Page");
					opts.page++; if (opts.page >= opts.pages.length) { opts.page=0; } 
					self.emit('data', 0); 
				});
			} else {
				console.log("Waiting for Username and Password");
				self.emit('data', 0); 
			}
        }, (opts.interval*1000));
	}); 
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Billion.prototype.write = function(data) {
	self._app.log.error('[ninja-billion] Was actuated but should not have been');
};
