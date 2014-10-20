exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Billion Router Monitor"},
    { "type": "paragraph", "text": "This driver allows you to view network usage of your Billion BiPAC 7800DXL Router"},
    { "type": "input_field_text", "field_name": "ip_address", "value": "", "label": "Router IP Address (Default: 192.168.0.1)", "required": false},
    { "type": "input_field_text", "field_name": "interval", "value": "", "label": "Poll Interval (Default: 5 Seconds)", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings updated - Please restart your Block for changes to take affect" }
  ]
};
