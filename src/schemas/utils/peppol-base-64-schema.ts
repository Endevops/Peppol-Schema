import { Schema } from 'effect';

// RFC 4648 §4 — Base 64 Encoding
//
// Alphabet: A-Z a-z 0-9 + /  (pad: =)
// Encoding quanta: 4 characters represent 3 bytes.
// Padding rules (only at the very end):
//   • 0 pad chars  → last quantum is xxxx  (input length % 3 === 0)
//   • 1 pad char   → last quantum is xxx=  (input length % 3 === 2)
//   • 2 pad chars  → last quantum is xx==  (input length % 3 === 1)
//
// §3.1: CRLF / LF line endings are treated as non-alphabet characters
//        and stripped before validation (as in PEM / MIME / XML).
// §3.3: Implementations MUST reject data with non-alphabet characters
//        (other than the allowed line endings stripped above).
//
// The regex below encodes all three quantum variants in a single pass:
//   ([A-Za-z0-9+/]{4})*   — zero or more full quanta (no padding)
//   followed by one of:
//     [A-Za-z0-9+/]{2}==  — 2-pad quantum  (1 remaining input byte)
//     [A-Za-z0-9+/]{3}=   — 1-pad quantum  (2 remaining input bytes)
//     (empty)             — no trailing partial quantum
const BASE64_RE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * @description RFC 4648 base64 string (PEM / MIME / XML line endings tolerated). Effect port of `base64Schema` (`z.string().check(z.refine(...))`): strips CRLF /
 * LF line endings before testing the quantum regex.
 */
export const peppolBase64Schema = Schema.String.check(Schema.makeFilter((val: string) => BASE64_RE.test(val.replace(/\r?\n/g, '')))).annotate({
  message: 'Invalid base64',
});

export type Base64 = typeof peppolBase64Schema.Type;
