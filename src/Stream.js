/**
 * @typedef {import('stream').Readable} Readable
 * @typedef {import('../types').Stream} StreamImpl
 */

/**
 * A Readable stream wrapper.
 *
 * @implements {StreamImpl}
 */
export class Stream {
  /** @type {Buffer | undefined} */
  #buffer;

  /** @type {*} */
  #json;

  /** @type {Readable} */
  #readableStream;

  /** @type {string | undefined} */
  #text;

  /**
   * @param {Readable} readableStream
   */
  constructor(readableStream) {
    this.#readableStream = readableStream;
  }

  /**
   * @private
   * @param {Readable} stream
   * @return {Promise<Buffer>}
   */
  _parseStream(stream) {
    return new Promise((resolve, reject) => {
      let buffer = Buffer.allocUnsafe(0);

      stream.on('data', (chunk) => {
        buffer = buffer
          ? Buffer.concat([buffer, chunk])
          : chunk;
      });

      stream.on('end', () => {
        resolve(buffer);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Read the stream buffer and cache the result.
   *
   * @return {Promise<Buffer>}
   */
  async buffer() {
    if (this.#buffer === undefined) {
      this.#buffer = await this._parseStream(this.#readableStream);
    }

    return this.#buffer;
  }

  /**
   * Read the stream, parse it as JSON, and cache the result.
   *
   * @return {Promise<*>}
   */
  async json() {
    if (this.#json === undefined) {
      const text = await this.text();
      return JSON.parse(text);
    }

    return this.#json;
  }

  /**
   * Read the stream, parse it as text, and cache the result.
   *
   * @return {Promise<string>}
   */
  async text() {
    if (this.#text === undefined) {
      const buffer = await this.buffer();
      this.#text = buffer.toString();
    }

    return this.#text;
  }
}
