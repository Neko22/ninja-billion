var stream = require('stream')
, util = require('util')
, os = require('os')
, http = require('http')
, exec = require('child_process').exec
, child;

// Give our device a stream interface
util.inherits(TransmitDevice,stream);

// Export it
module.exports=TransmitDevice;

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
function TransmitDevice(app, opts) {
    var self = this;

    this.readable = true; // This device will emit data    
    this.writeable = false; // This device cannot be actuated
    this.V = 0; // 0 is Ninja Blocks' device list
    this.D = 540; // Network Transmitted
	this.G = "TransmitDevice"; // G is a string a represents the channel
	this.name = "Billion Router - Transmitted KB/s";

    opts.transmitted = "0"; // last total of bytes transmitted, so we can calculate the kb/s

    process.nextTick(function() {
        setInterval(function() {
			http.get({ host:opts.ip_address, port:80, path:'/getWanTransmit.sh' }, function(res) {
				res.on("data", function(chunk) {
					var response = chunk.toString().split("|");
					var total = response[0];
					var per_second = 0;
					if (opts.transmitted != 0) {
						per_second = Math.ceil(((total - opts.transmitted) / 1000) / opts.interval); 
						//console.log('Network Transmitted: '+per_second+' KB/s ['+opts.transmitted+' -> '+total+' / '+opts.interval+' sec]');
					}
					opts.transmitted = total;
					self.emit('data', per_second); 
				});
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
				self.emit('data', 0); 
			});
        }, (opts.interval*1000));
	}); 
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
TransmitDevice.prototype.write = function(data) {
	self._app.log.error('[ninja-billion] Was actuated but should not have been');
};
