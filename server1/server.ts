import * as net from 'net';
import * as dns from 'dns';

const PORT = 80;
const HOST = 'example.com';

dns.lookup(HOST, (err, address) => {
  if (err) throw err;

  const socket = net.createConnection(PORT, HOST);

  const request = `
GET / HTTP/1.1
Host: ${HOST}

  `;

  socket.write(request);
  socket.pipe(process.stdout);

});

