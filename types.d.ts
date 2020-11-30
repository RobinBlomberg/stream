import { Readable } from 'stream';

export class Stream {
  constructor(readableStream: Readable);
  async buffer(): Promise<Buffer>;
  async json(): Promise<any>;
  async text(): Promise<string>;
}
