exports.menu = {
  "contents":[
    { "type":"paragraph", "text":"This driver allows you to monitor the network usage of your Billion BiPAC Router"},
	{ "type":"paragraph", "text":""},
	{ "type":"input_field_text", "field_name":"ip_address", "value":"", "label":"Router IP Address", "required":true },
    { "type":"input_field_text", "field_name":"port", "value":"", "label":"Router Port", "required":true },
	{ "type":"input_field_text", "field_name":"username", "value":"", "label":"Router Username", "required":true },
	{ "type":"input_field_text", "field_name":"password", "value":"", "label":"Router Password", "required":true },
	{ "type":"paragraph", "text":""},
    { "type":"input_field_text", "field_name":"interval", "value":"", "label":"Poll Interval (Seconds)", "required":true },
	{ "type":"paragraph", "text":""},
    { "type":"submit", "name":"Save", "rpc_method":"echo" }
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings Updated" }
  ]
};
