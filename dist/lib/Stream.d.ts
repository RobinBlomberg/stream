/// <reference types="node" />
/**
 * @typedef {import('stream').Readable} Readable
 */
/**
 * A Readable stream wrapper.
 */
export class Stream {
    /**
     * @param {Readable} readableStream
     */
    constructor(readableStream: Readable);
    /**
     * @private
     * @param {Readable} stream
     * @return {Promise<Buffer>}
     */
    private _parseStream;
    /**
     * Read the stream buffer and cache the result.
     *
     * @return {Promise<Buffer>}
     */
    buffer(): Promise<Buffer>;
    /**
     * Read the stream, parse it as JSON, and cache the result.
     *
     * @return {Promise<*>}
     */
    json(): Promise<any>;
    /**
     * Read the stream, parse it as text, and cache the result.
     *
     * @return {Promise<string>}
     */
    text(): Promise<string>;
    #private;
}
export type Readable = import("stream").Readable;
