import { String } from 'effect';

function formatStringLiteral(value: string | number): string {
  return JSON.stringify(value);
}

export function generateKeyDeclarations({
  variableName,
  keysName,
  keys,
}: {
  variableName: string;
  keysName: string;
  keys: ReadonlyArray<string | number>;
}): string {
  const union = keys.map(key => formatStringLiteral(String.String(key))).join(' | ');
  const tuple = keys.map(key => `  ${formatStringLiteral(String.String(key))},`).join('\n');
  const asConst = keys.length <= 10 ? 'as const' : 'as [string, ...string[]]';

  return `/**
 * Keys of {@link ${variableName}}.
 */
export type ${String.capitalize(keysName)} = ${union};

/**
 * Keys of {@link ${variableName}}.
 */
export const ${keysName} = [
${tuple}
]${asConst};`;
}
