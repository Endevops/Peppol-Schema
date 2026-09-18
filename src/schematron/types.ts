/**
 * @description Severity of a schematron rule, mirroring the `flag` attribute of a schematron `assert`.
 */
export type SchematronRuleLevel = 'fatal' | 'warning';

/**
 * @description A single field compared by a schematron rule, with the required and found values.
 */
export interface SchematronFieldIssue {
  /**
   * @description Path to the field within the PeppolDocument, using dotted property names and `[i]` array indices, e.g.
   * `taxTotals[0].taxSubtotals[1].taxableAmount.value`.
   */
  path: string;
  /**
   * @description The value the rule requires at `path`; `null` for an input operand that has no single required value.
   */
  expected: number | string | boolean | null;
  /**
   * @description The value found at `path`; `null` when the field is absent.
   */
  actual: number | string | boolean | null;
}

/**
 * @description The result of validating a single schematron rule against a document.
 */
export interface SchematronRuleResult {
  /**
   * @description The rule identifier, e.g. `PEPPOL-EN16931-R001`.
   */
  id: string;
  /**
   * @description The severity of the rule as defined in the schematron.
   */
  level: SchematronRuleLevel;
  /**
   * @description Human readable description of the rule.
   */
  message: string;
  /**
   * @description Whether the document satisfies the rule.
   */
  passed: boolean;
  /**
   * @description The field level details of the failure; empty when the rule reports no field details.
   */
  fields: ReadonlyArray<SchematronFieldIssue>;
}
