export class Stream {
  async buffer(): Promise<Buffer>;
  async json(): Promise<any>;
  async text(): Promise<string>;
}
