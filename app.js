const http = require('http');
const handler = require('./handlers');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var path;
  filename === './index.html' ? path = 'another.html': path = 'index.html';
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end("404 Not Found");
    }  
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	res.write('<p>');
	res.write("The date and time are currently: " + handler.myDateTime() + '<br>');
    res.write('</p>');
	
	res.write('<form action="http://localhost:3000/' + path + '" method="post" enctype="multipart/form-data">');
	res.write('<input class="button" type="submit" value="' + path + '">');
	res.write('</form>');
	
	res.write('<form action="?year=2017&month=february" method="post" enctype="multipart/form-data">');
	res.write('<input class="button" type="submit" value="click to parse url">');
	res.write('</form>');
	if (q.search) {
	  res.write('<p>');
      res.write('<strong>URL</strong>: ' + req.url + '<br>'); //returns '/index.htm?year=2017&month=february'
	  res.write('<strong>Path</strong>: ' + q.pathname + '<br>'); //returns '/index.html'
	  res.write('<strong>Search</strong>: ' + q.search + '<br>'); //returns '?year=2017&month=february'
      res.write('<strong>Year</strong>: ' + q.query.year + '<br>'); //returns year
      res.write('<strong>Month</strong>: ' + q.query.month + '<br>'); //returns month
      res.write('</p>');
	};

	res.end();
  });
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});