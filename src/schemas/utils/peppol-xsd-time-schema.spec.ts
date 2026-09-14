import { assert, describe, expect, it, layer } from '@effect/vitest';
import { Effect, Layer, Result, Schema } from 'effect';

import { parseZoneOffsetFromString, PeppolXsdTime } from './peppol-xsd-time-schema.ts';

describe('parseZoneOffsetFromString', () => {
  it.each(['+00:00', '-00:00', '+00:01', '+01:00', '+12:00', '-12:00', '-13:00'] as const)('should parse a valid timezone offset (%s)', tz => {
    const offset = parseZoneOffsetFromString(tz);
    assert(offset);
    expect(offset.toString()).toMatchSnapshot('parsed zone offset');
  });
});

layer(Layer.empty)('PeppolXsdTime', () => {
  const decodeTime = Schema.decodeEffect(PeppolXsdTime);
  const encodeTime = Schema.encodeEffect(PeppolXsdTime);
  it.effect(
    'should set the correct date on decoding without timezone',
    Effect.fn(function* () {
      const time = yield* decodeTime('12:00:00Z');
      expect(yield* encodeTime(time)).toMatchInlineSnapshot(`"12:00:00"`);
    })
  );
  it.effect(
    'should set the correct date on decoding with timezone',
    Effect.fn(function* () {
      const time = yield* decodeTime('12:00:00+01:00');
      expect(yield* encodeTime(time)).toMatchInlineSnapshot(`"12:00:00"`);
    })
  );

  describe.each([
    '00:00:00',
    '00:00:00Z',
    '00:00:00+01:00',
    '00:00:00-01:00',
    '00:00:00-0100',
    '00:00:00+0100',
    '10:12:45-05:30',
    '00:00:59+0100',
    '00:00:00.0Z',
    '00:00:00.00Z',
    '00:00:00.000000000Z',
    '00:00:00.000000000+01:00',
    '23:59:59',
    '23:59:59Z',
    '12:30:45.5',
    '12:30:45.123456789',
    '00:00:00+14:00',
    '00:00:00-14:00',
    '00:00:00+1400',
    '00:00:00-1400',
    '00:00:00+23:59',
    '00:00:00-23:59',
    '00:00:00+2359',
    '14:30:00Z',
    '14:30:00+00:00',
  ])('with time %s', val => {
    it.effect(
      'should decode as iso date',
      Effect.fn(function* () {
        const decoded = yield* decodeTime(val);
        expect(decoded).toMatchSnapshot('decoded');
      })
    );

    it.effect(
      'should encode as iso date',
      Effect.fn(function* () {
        const result = yield* decodeTime(val);
        const encoded = yield* encodeTime(result);

        expect(encoded).toMatchSnapshot('encoded');
      })
    );
  });

  describe('failures', () => {
    it.effect.each([
      '10:10:11-0000',
      '10:10:11-00',
      '24:10:11+0000',
      '00:60:11+0000',
      '00:00:60+0000',
      '00:00:00+2400',
      '00:00:00-2400',
      '00:00:00.Z',
      '25:00:00',
      '24:00:00',
      '24:00:00Z',
      '12:30:45.1234567890',
      '00:00:00+25:00',
      '00:00:00-25:00',
      '00:00:00+00:60',
      '00:00:00-00:60',
      '00:00:00+2600',
      '00:00:00-2600',
      '00:00:00+',
      '00:00:00-',
      '00:00:00+1',
      '00:00:00-1',
      '00:00:00.',
      '00:00',
      '00:00:',
      '',
    ] as const)(
      'should not parse %s as iso date',
      Effect.fn(function* (val) {
        const result = yield* decodeTime(val).pipe(Effect.result);
        assert(Result.isFailure(result));
      })
    );
  });
});
