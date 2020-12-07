import * as Http from 'http';
import { describe, equal, test } from '@robinblomberg/test';
import { Stream } from '../lib/index.js';

const PORT = 3000;

test('@robinblomberg/stream', () => {
  return describe('json', () => {
    return new Promise((resolve) => {
      const server = Http.createServer(async(req, res) => {
        const stream = new Stream(req);
        const data = await stream.text();
        res.end(data);
      });

      server.listen(PORT);

      const req = Http.request(`http://localhost:${PORT}`, { method: 'POST' }, async(res) => {
        const stream = new Stream(res);
        const data = await stream.json();

        equal(
          data,
          {
            name: 42
          }
        );

        server.close();

        resolve();
      });

      req.setHeader('Content-Type', 'application/json');
      req.write('{"name":42}');
      req.end();
    });
  });
})();
