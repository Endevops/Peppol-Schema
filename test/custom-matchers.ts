import { XMLParser } from 'fast-xml-parser';
import { expect } from 'vitest';

import { parserOptions } from '#/xml/parser-options';

function parseXML(content: string | Buffer) {
  const parser = new XMLParser(parserOptions);
  return parser.parse(content);
}

interface CustomMatchers<R = string> {
  /**
   * @description Check if the actual XML matches the expected XML.
   *
   * @param expected
   */
  toMatchXML(expected: string): R;
}

declare module 'vitest' {
  //
  interface Matchers<T = any> extends CustomMatchers<T> {}
}

function removeUncesessaryAttributes(obj: any) {
  for (const key of Object.keys(obj).filter(key => key.startsWith('@'))) {
    //
    delete obj[key];
  }
}

expect.extend({
  toMatchXML(actual: string, expected: string) {
    const { isNot } = this;
    const actualXML = parseXML(actual);
    const expectedXML = parseXML(expected);
    if ('Invoice' in expectedXML) {
      removeUncesessaryAttributes(expectedXML.Invoice);
    }
    if ('CreditNote' in expectedXML) {
      removeUncesessaryAttributes(expectedXML.CreditNote);
    }
    if ('ApplicationResponse' in expectedXML) {
      removeUncesessaryAttributes(expectedXML.ApplicationResponse);
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
