var http = require('http');
var fs = require('fs');
var url=require("url"); 

http.createServer(function(req, res) {
	var pathname=url.parse(req.url).pathname;   
	var method = req.method;
	console.log("Request for "+pathname+" received.");
	console.log(req.method)
	if(pathname=='/'){
	 	res.setHeader('status', '200 OK');
	    res.setHeader('Set-Cookie', 'isVisit=true;path=/;max-age=1000');
	    res.write('Hello World');
	    res.end();
	}else if(pathname=='/get'){
		var Cookies = {};
	    req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
	        var parts = Cookie.split('=');
	        Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	    });
	    console.log(Cookies)
		res.writeHead(200,{ 
			'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;path=/;max-age=1000;HttpOnly',
			"Content-Type":"text/html"
		});   
		res.write(`Hello World\n<script>console.log(document.Cookie)</script>`);
		res.end();
	}else if(pathname=='/delete'){
		console.log(req.headers.cookie)
		res.writeHead(200,{ 
			'Set-Cookie': 'isVisit=; Expires=0;',
			"Content-Type":"text/html"
		});
		res.write(`Hello World\n<script>console.log(document.Cookie)</script>`);
		res.end();
	}
    
}).listen(8888);

console.log('running localhost:8888')
