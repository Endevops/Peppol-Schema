import { parseXml, toCodecXml } from '@endevops/effect-codec-xml';
import { Arbitrary, DateTime, Effect, Schema } from 'effect';

/**
 * @description The direct child element names of an XML document, in document order. Attributes (`@`-prefixed) and character data are dropped, so the result is
 * the document's root-level `xsd:sequence`.
 *
 * @param xml - A compact XML string produced by `toCodecXml`.
 *
 * @returns The prefixed child element names, e.g. `['cbc:CustomizationID', 'cbc:ProfileID', ...]`.
 */
export const rootChildElementNames = (xml: string): ReadonlyArray<string> => {
  const value = Effect.runSync(parseXml(xml));
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [];
  return Object.keys(value).filter(key => !key.startsWith('@') && key !== '#text');
};

/**
 * @description A date every generated `DateTime` is replaced with so the ISO-date check accepts the encoded document.
 */
const FIXED_DATE = DateTime.makeUnsafe('2024-01-15');

/**
 * @description Replaces every `DateTime` in a generated value with a fixed date. `Arbitrary` can generate dates whose year is not four digits, which the
 * `YYYY-MM-DD` check on the encoded side rejects.
 */
const sanitize = (value: unknown): unknown => {
  if (DateTime.isDateTime(value)) return FIXED_DATE;
  if (Array.isArray(value)) return value.map(sanitize);
  if (value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitize(item)]));
  }
  return value;
};

/**
 * @description Samples a value for one field until it is present, preferring non-empty arrays. Optional and array fields are included so the serialized element
 * order covers every field.
 */
const sampleField = (fieldSchema: Schema.Constraint): unknown => {
  for (const size of [4, 10, 20, 40]) {
    const samples = Effect.runSync(Arbitrary.sampleEffect(Arbitrary.schema(fieldSchema), { count: 60, seed: 'peppol', size }));
    const nonEmptyArray = samples.find(value => Array.isArray(value) && value.length > 0);
    if (nonEmptyArray !== undefined) return sanitize(nonEmptyArray);
    const defined = samples.find(value => value !== undefined);
    if (defined !== undefined) return sanitize(defined);
  }
  throw new Error('Could not sample a defined value for a field');
};

/**
 * @description Builds a value with every field of a struct present by sampling each field in turn. The key order is the schema's field order, which is the order
 * the decoder assigns, so encoding serializes the elements in the same order.
 *
 * @param schema - A struct schema with more than one field.
 *
 * @returns A value assignable to the schema's decoded type, with all fields present.
 */
const buildFullSample = (schema: Schema.Constraint): Record<string, unknown> => {
  const fields = (schema as unknown as { fields: Record<string, Schema.Constraint> }).fields;
  const out: Record<string, unknown> = {};
  for (const [key, fieldSchema] of Object.entries(fields)) out[key] = sampleField(fieldSchema);
  return out;
};

/**
 * @description Encodes a fully populated sample of `schema` and returns its root child element names in document order. This is the order the serializer writes
 * for a decoded document.
 *
 * @param schema - The struct schema to serialize.
 *
 * @returns The serialized element order, e.g. `['cbc:CustomizationID', ...]`.
 */
export const serializedOrder = (schema: Schema.Constraint): ReadonlyArray<string> => {
  const sample = buildFullSample(schema);
  const xml = Schema.encodeSync(schema.pipe(toCodecXml()))(sample as never);
  return rootChildElementNames(xml);
};
