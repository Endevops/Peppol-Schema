import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';
import { GenericContainer } from 'testcontainers';

import { peppolDocumentSchema } from '#/schemas/peppol-document-schema.ts';
import { Schematron } from '#/schematron/schematron.ts';
import { decodeBaseExample } from '#/test/test-utils.ts';

// oxlint-disable-next-line vitest/warn-todo
describe.todo('schematron.run-all-rules', () => {
  it.effect('should validate all rules', () =>
    Effect.gen(function* () {
      const baseDocument = yield* Effect.promise(() => decodeBaseExample());
      yield* (yield* Schematron).run(baseDocument);
    }).pipe(Effect.provide(Schematron.layer))
  );

  describe('java impl comparision', () => {
    it('should return the same results', async () => {
      await using container = await new GenericContainer('theyoxy/peppol-validation:develop').withExposedPorts(8080).start();
      console.log('Container started');
      const baseDocument = await decodeBaseExample();
      const baseDocumentXml = Effect.runSync(Schema.encodeEffect(peppolDocumentSchema)(baseDocument as any));

      console.log('Sending validation request to', `http://${container.getHost()}:${container.getMappedPort(8080)}/validate/invoice`);
      const result = await fetch(`http://${container.getHost()}:${container.getMappedPort(8080)}/validate/invoice`, {
        method: 'POST',
        body: baseDocumentXml,
      });
      expect(result.status).toBe(200);
      const response = await result.text();
      expect(response.length).toBeGreaterThan(0);
      console.log('Response: ', response);
    });
  });
});
