exports.menu = {
  "contents":[
    { "type":"paragraph", "text":"Billion Router Monitor"},
    { "type":"paragraph", "text":"This driver allows you to view network usage of your Billion BiPAC Router"},
	{ "type":"paragraph", "text":""},
	{ "type":"input_field_text", "field_name":"ip_address", "value":"", "label":"Router IP Address", "required":true },
    { "type":"input_field_number", "field_name":"port", "value":"", "label":"Router Port", "required":true },
	{ "type":"input_field_text", "field_name":"username", "value":"", "label":"Router Username", "required":true },
	{ "type":"input_field_text", "field_name":"password", "value":"", "label":"Router Password", "required":true },
	{ "type":"paragraph", "text":""},
    { "type":"input_field_text", "field_name":"interval", "value":"", "label":"Poll Interval (Seconds)", "required":true },
	{ "type":"paragraph", "text":""},
	{ "type":"submit", "name":"Back", "rpc_method":"back" },
    { "type":"submit", "name":"Save", "rpc_method":"echo" }
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings updated - Please restart your Block for changes to take affect" }
  ]
};
