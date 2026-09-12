import { Schema } from 'effect';

/**
 * @description Raised when a value cannot be found at the requested XML node path.
 */
export class PeppolNodeError extends Schema.TaggedError<PeppolNodeError>()('PeppolNodeError', { message: Schema.String }) {}
