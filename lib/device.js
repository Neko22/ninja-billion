var stream = require('stream')
, util = require('util')
, os = require('os')
, exec = require('child_process').exec
, child;

// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

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
function Device(app, opts) {
    
    var self = this;
    
    // This device will emit data
    this.readable = true;
    // This device can be actuated
    this.writeable = false;
    
    this.G = "billion"; // G is a string a represents the channel
    this.V = 0; // 0 is Ninja Blocks' device list
    this.D = 530; // 2000 is a generic Ninja Blocks sandbox device
    
    // 530 = incoming network activity
    // 540 = outgoing network activity
    
    opts.interval = 10; // number of seconds between checks
	
	/*
	// Work out what the router IP Address is by looking up the DHCP Server
	if (opts.router_ip_address == "") {
		var ifaces=os.networkInterfaces();
		for (var dev in ifaces) {
			var alias=0;
			ifaces[dev].forEach(function(details){
				if (details.family=='IPv4') {
					console.log(dev+(alias?':'+alias:''),details.address);
					++alias;
				}
			});
		}  
	}
	*/
	opts.router_ip_address = "192.168.0.1";
	if (opts.interval == "") { opts.interval = 5; }
	
    opts.sent = "0"; // last number of bytes sent
    opts.received = "0"; // last number of bytes received
    
    // https://github.com/bacall213/ninja-netmon/blob/master/index.js - look at this for send/receive example
    process.nextTick(function() {
        setInterval(function() {
            get_network('WanTransmit');
			get_network('WanReceive');
        }, (opts.interval*1000));
	});
  
	function get_network(type) {
        // The Billion router returns a json array of the total number of bytes sent/received.
        // We need to grab this, and subtract the previous sent value from this to determine how many bytes have been transferred since the last tick.
		http = require('http')

		options =
			host: this.ip_address
			path: '/get'+type+'.sh'

		request = http.get options, (response) ->
			// "TOTAL_BYTES|<NULL>"
			var response = response.split("|");
			var sent_total = response[0];
			
			// Determine number of bytes/second, emit the data back to the Ninja Block and store for the next tick
			var sent_per_second = Math.floor((sent - opts.sent) / interval); 
			console.log('Network Sent: '+sent_per_second+' k/s');
			opts.sent = sent_total;
			self.G = "billion"+type;
			self.V = 0; // 0 is Ninja Blocks' device list
			switch(type) {
				case "WanTransmit": self.D = 540; break;
				case "WanReceive": self.D = 530; break;
			}
			self.emit('data', sent_per_second);                        

		request.on 'error', (error) ->
			console.log("Got error: " + error.message)
	}
};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Device.prototype.write = function(data) {
	self._app.log.error('[ninja-billion] Was actuated but should not have been');
};
