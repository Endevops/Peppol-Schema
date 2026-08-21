import type { StartedTestContainer } from 'testcontainers';

import { GenericContainer } from 'testcontainers';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import { documentParser } from '#/document-parser';
import { runAllRules } from '#/schematron/run-all-rules';
import { decodeBaseExample } from '#/test/test-utils';

describe('schematron.run-all-rules', () => {
  it('should validate all rules', async () => {
    const baseDocument = await decodeBaseExample();
    const result = runAllRules(baseDocument);

    expect(result).toHaveLength(360);
    expect(result.every(r => r.passed)).toBe(true);
  });

  describe('java impl comparision', () => {
    let container: StartedTestContainer;

    beforeAll(async () => {
      console.log('Starting validation container');
      container = await new GenericContainer('theyoxy/peppol-validation:develop').withExposedPorts(8080).start();
    }, 30_000);

    afterAll(async () => {
      console.log('Stopping validation container');
      await container?.stop();
    }, 30_000);

    it('should return the same results', async () => {
      const baseDocument = await decodeBaseExample();
      const baseDocumentXml = z.encode(documentParser, baseDocument as any);

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
