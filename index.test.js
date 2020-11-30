import * as Assert from 'assert';
import * as Http from 'http';
import { Stream } from './index.js';

const PORT = 3000;

const server = Http.createServer(async(req, res) => {
  const stream = new Stream(req);
  const data = await stream.text();
  res.end(data);
});

server.listen(PORT);

const req = Http.request(`http://localhost:${PORT}`, { method: 'POST' }, async(res) => {
  const stream = new Stream(res);
  const data = await stream.json();

  Assert.deepStrictEqual(
    data,
    {
      name: 42
    }
  );

  server.close();
});

req.setHeader('Content-Type', 'application/json');
req.write('{"name":42}');
req.end();
