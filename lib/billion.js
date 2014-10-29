var stream = require('stream')
, util = require('util')
, os = require('os')
, http = require('http')
, exec = require('child_process').exec
, child;
var cheerio = require('../node_modules/cheerio');

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
				var options = {
					host: opts.ip_address,
					port: opts.port, 
					path: opts.pages[opts.page], 
					auth: opts.username+":"+opts.password				
				}
				var body = "";
				var request = http.get(options, function(res) {
					res.on("data", function(chunk) {
						console.log("Received Chunk");
						body += chunk;
					});
					res.on('end', function () {
						clearTimeout(timeout);
						if (body == "" || body == undefined) {
							console.log("No Data"); 
							cycle_page();					
						} else {						
							console.log("Received Data");
							var $ = cheerio.load(body); // Load result into a jquery style object
							
							// Attempt to locate the byte count
							var total = "";
							var column_index = 1;
							var column = -1;
							$("tr").each(function(tr_idx, tr_elem) {
								column_index = 1;
								$("td", tr_elem).each(function(td_idx, td_elem) {
									//console.log("  TD ["+column_index+"] = ["+$(td_elem).text()+"] ("+$(td_elem).data('colspan')+")");
									if ($(td_elem).text()==action) {
										console.log("Found Action: "+action);
										column = column_index;
									} else if (column_index == column) {
										var tmp = $(td_elem).text();
										console.log("Found Possible Byte Count: "+tmp);
										if (!isNaN(tmp)) { 
											total=tmp;
											
											// Report result											
											var per_second = 0;
											switch(action) {
												case "Received":
													if (opts.received != 0) {
														per_second = Math.round(((total - opts.received) / 1000) / opts.interval); 
														console.log("Network "+action+": "+per_second+" KB/s ["+opts.received+" -> "+total+" / "+opts.interval+" sec]");
													}
													opts.received = total;
													break;
												case "Transmitted":
													if (opts.transmitted != 0) {
														per_second = Math.round(((total - opts.transmitted) / 1000) / opts.interval); 
														console.log("Network "+action+": "+per_second+" KB/s ["+opts.transmitted+" -> "+total+" / "+opts.interval+" sec]");
													}
													opts.transmitted = total;
													break;
											}								
											self.emit('data', per_second);
											return;
										}
									}
									// if ($(td_elem).data('colspan') != undefined) { column_index+=$(td_elem).data('colspan'); } else { column_index++; }
									column_index++;
								});
							});	
						}						
					}).on('error', function(e) {
						// Cycle through to a different webpage for next interval
						console.log("Error: "+e.message);
						cycle_page();	
					});
				});
				var timeout = request.setTimeout(opts.interval, function( ) {
					console.log("Timeout");
					res.abort();
					cycle_page();				
				});
			} else {
				console.log("No Username/Password");
			}
        }, (opts.interval*1000));
	}); 
};

function cycle_page() {
	// Select the next page in the list to try
	if (action == "Received") { 						
		opts.page++; 
		if (opts.page >= opts.pages.length) { opts.page=0; }
		console.log("Cycle Page to ["+opts.pages[opts.page]+"]");
	}	
}

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Billion.prototype.write = function(data) {
	self._app.log.error('[ninja-billion] Was actuated but should not have been');
};
