import { Schema } from 'effect';

/**
 * @description Raised when a PEPPOL document cannot be decoded from its XML node representation.
 */
export class PeppolDecodeError extends Schema.TaggedError<PeppolDecodeError>()('PeppolDecodeError', { message: Schema.String }) {}

/**
 * @description Raised when a PEPPOL document cannot be encoded into its XML node representation.
 */
export class PeppolEncodeError extends Schema.TaggedError<PeppolEncodeError>()('PeppolEncodeError', { message: Schema.String }) {}
