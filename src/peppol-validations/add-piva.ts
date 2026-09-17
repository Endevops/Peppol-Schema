// NOTE: check and add valid values for the tests in `add-piva.spec.ts`

/**
 * @description Helper function for calculating weighted sum for Italian PIVA validation.
 *
 * @example
 *   ```ts
 *   addPIVA('123', 0); // 8
 *   ```;
 *
 * @param arg - The digit string to sum, processed one character at a time.
 * @param pari - Parity flag toggled at each recursion; `1` maps the digit through the `0246813579` table, `0` keeps it as is.
 *
 * @returns The weighted sum, or `0` when `arg` contains a non-digit.
 *
 * @see {@link checkPIVA}
 */
export function addPIVA(arg: string, pari: number): number {
  if (!/^\d+$/.test(arg)) return 0;
  const first = Number(arg[0]);
  const mapper = pari === 1 ? Number('0246813579'[first]) : first;
  if (arg.length === 1) return mapper;
  return mapper + addPIVA(arg.slice(1), pari === 0 ? 1 : 0);
}
