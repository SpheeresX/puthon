// test
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	if (req.url === '/') req.url = '/index';
	const py = spawn('python3', [__dirname + '/bin' + req.url + '.py']);

	py.stdout.on('data', (data) => {
		res.write(data);
	});

	py.stderr.on('data', (data) => {
		if (process.env.PUTH_WRITE_ERRORS) res.write(data);
	});

	py.on('close', (code) => {
		console.log(`Python exited with code ${code}`)
		res.end();
	});
}).listen(process.env.PORT || 8080);
