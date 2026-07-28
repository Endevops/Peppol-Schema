import { describe, it, expect } from 'vitest';

import { base64Schema } from './base-64';

describe('base64', () => {
  it.for([
    // RFC 4648 §10 official test vectors
    '',
    'Zg==',
    'Zm8=',
    'Zm9v',
    'Zm9vYg==',
    'Zm9vYmE=',
    'Zm9vYmFy',
    // additional valid cases
    'dGVzdA==',
    'aGVsbG8=',
    'SGVsbG8gV29ybGQ=',
    'AAAA',
    '////',
    '++//',
    'YQ==',
    'YWI=',
    'YWJj',
    // multiline (LF) — §3.1 / §3.3: CRLF/LF stripped before validation
    'Zm9v\nYmFy',
    'Zm9vYmFy\nZm9vYmFy',
    // multiline (CRLF)
    'Zm9v\r\nYmFy',
    'Zm9vYmFy\r\nZm9vYmFy',
    // trailing newline
    'Zm9v\n',
    'Zm9v\r\n',
    // only newlines (strip to empty string → valid per RFC §10 empty vector)
    '\n',
    '\r\n',
    // multiple LF breaks throughout stream
    'Zm9v\nYmFy\nZm9v',
    // PEM-style 76-char lines with CRLF (real-world certificate block shape)
    'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAx\r\nMjM0NTY3ODk=',
  ] as const)('should parse %s as base64', val => {
    expect(() => base64Schema.parse(val)).not.toThrow();
  });

  it.for([
    // wrong length — not a multiple of 4
    'dGVzdA',
    'abc',
    'ab',
    'a',
    // wrong padding count
    'dGVzdA=',
    'dGVzdA===',
    // padding in wrong position (not at end of last quantum)
    '=Zm9v',
    'Zm=9v',
    'Zm9=v',
    // data after padding
    'dGVzdA==X',
    'YQ==YQ==',
    // invalid alphabet characters
    'dGVzd A==',
    'hello!',
    'dGVz-A==',
    'dGVz_A==',
    // invalid chars mixed with newlines
    'Zm9v\nhello!',
    // padding-only strings (no data chars)
    '====',
    '==',
    '=',
    // control characters
    '\t',
    '\0',
    '\u0001',
    // bare CR (not CRLF) — \r alone is NOT stripped by the replace, becomes invalid char
    '\r',
    'Zm9v\rYmFy',
    // unicode — multi-byte chars outside ASCII
    '\u00f1o\u00f1o',
    '\uD83D\uDD11',
  ] as const)('should not parse %s as base64', val => {
    expect(() => base64Schema.parse(val)).toThrow();
  });
});
