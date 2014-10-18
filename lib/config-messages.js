exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Billion Router Monitor"},
    { "type": "paragraph", "text": "This module allows you to view the network usage of your Billion DXL7800 Router.\n\nThe IP Address is defaulted to 192.168.0.1; please alter if incorrect."},
    { "type": "input_field_text", "field_name": "ip_address", "value": "", "label": "Router IP Address", "required": false},
    { "type": "input_field_text", "field_name": "interval", "value": "5", "label": "Poll Interval (Default 5 Seconds)", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings saved!" }
  ]
};
