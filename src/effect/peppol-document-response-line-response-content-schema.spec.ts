// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolDocumentResponseLineResponseContentSchema } from './peppol-document-response-line-response-content-schema';

const validContent = { responseCode: 'RE', description: 'Validation gives error [CL-T77-R0002]', status: { statusReasonCode: 'BV' } };

describe('peppolDocumentResponseLineResponseContentSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolDocumentResponseLineResponseContentSchema);
  const decode = testSchema.decoding();

  it('should decode valid line response content', async () => {
    await decode.succeed(validContent);
  });

  it('should reject line response content without a description', async () => {
    const { description: _description, ...noDescription } = validContent;
    await decode.fail(noDescription, 'Missing key\n  at ["description"]');
  });

  it('should reject line response content without a status', async () => {
    const { status: _status, ...noStatus } = validContent;
    await decode.fail(noStatus, 'Missing key\n  at ["status"]');
  });

  it('should reject line response content with an invalid status reason code', async () => {
    await decode.fail({ ...validContent, status: { statusReasonCode: 'ZZ' } }, 'Expected "BV" | "BW" | "SV"\n  at ["status"]["statusReasonCode"]');
  });
});
