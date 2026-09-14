// oxlint-disable typescript/no-explicit-any
import { XMLParser } from 'fast-xml-parser';
import { expect } from 'vitest';

import { parserOptions } from '#/xml/parser-options.ts';

function parseXML(content: string | Buffer) {
  const parser = new XMLParser(parserOptions);
  return parser.parse(content);
}

interface CustomMatchers<T = string> {
  /**
   * @description Check if the actual XML matches the expected XML.
   *
   * @param expected
   */
  toMatchXML(expected: string): T;
}

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> extends CustomMatchers<T> {}
}

function removeUncesessaryAttributes(obj: any) {
  for (const key of Object.keys(obj).filter(key => key.startsWith('@'))) {
    delete obj[key];
  }
}

const ROOT_ELEMENTS = ['Invoice', 'CreditNote', 'ApplicationResponse'] as const;

function stripRootAttributes(expectedXML: Record<string, any>, root: (typeof ROOT_ELEMENTS)[number]) {
  if (root in expectedXML) {
    removeUncesessaryAttributes(expectedXML[root]);
  }
}

expect.extend({
  toMatchXML(actual: string, expected: string) {
    const { isNot } = this;
    const actualXML = parseXML(actual);
    const expectedXML = parseXML(expected);
    for (const root of ROOT_ELEMENTS) {
      stripRootAttributes(expectedXML, root);
    }

    let pass: boolean;
    // Leverage the existing toMatchObject() behaviour to do the deep matching
    try {
      expect(expectedXML).toMatchObject(expect.objectContaining(actualXML));
      pass = true;
    } catch {
      pass = false;
    }

    return { actual: expectedXML, expected: actualXML, message: () => `the expected XML does${isNot ? ' not ' : ' '}match the actual XML`, pass };
  },
});
