/**
 * @description Scheme id for ISO 6523 actor identifiers, used to qualify PEPPOL participant and endpoint identifiers.
 *
 * @example
 *   ```ts
 *   PARTICIPANT_SCHEME; // 'iso6523-actorid-upis'
 *   ```;
 */
export const PARTICIPANT_SCHEME = 'iso6523-actorid-upis' as const;
/**
 * @description Deprecated alias of {@link PARTICIPANT_SCHEME}.
 *
 * @deprecated use `PARTICIPANT_SCHEME` instead.
 */
export const participantScheme = PARTICIPANT_SCHEME;
