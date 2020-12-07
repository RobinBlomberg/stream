import { Readable } from 'stream';

/*
 * External types
 * -------------------------------------------------------------------------------------------------
 */

/**
 * A Readable stream wrapper.
 */
export class Stream {
  constructor(readableStream: Readable)

  /**
   * Read the stream buffer and cache the result.
   */
  buffer(): Promise<Buffer>;

  /**
   * Read the stream, parse it as JSON, and cache the result.
   */
  json(): Promise<any>;

  /**
   * Read the stream, parse it as text, and cache the result.
   */
  text(): Promise<string>;
}
