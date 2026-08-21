/**
 * @description Severity of a schematron rule, mirroring the `flag` attribute of a schematron `assert`.
 */
export type SchematronRuleLevel = 'fatal' | 'warning';

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
}
