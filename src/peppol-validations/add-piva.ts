// NOTE: check and add valid values for the tests in `add-piva.spec.ts`

/**
 * @description Helper function for calculating weighted sum for Italian PIVA validation.
 */
export function addPIVA(arg: string, pari: number): number {
  if (!/^\d+$/.test(arg)) return 0;
  const first = Number(arg[0]);
  const mapper = pari === 1 ? Number('0246813579'[first]) : first;
  if (arg.length === 1) return mapper;
  return mapper + addPIVA(arg.slice(1), pari === 0 ? 1 : 0);
}
