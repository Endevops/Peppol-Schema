import { String } from 'effect';

function formatStringLiteral(value: string): string {
  return JSON.stringify(value);
}

export function generateKeyDeclarations({
  variableName,
  keysName,
  keys,
}: {
  variableName: string;
  keysName: string;
  keys: ReadonlyArray<string>;
}): string {
  const union = keys.map(formatStringLiteral).join(' | ');
  const tuple = keys.map(key => `  ${formatStringLiteral(key)},`).join('\n');
  const asConst = keys.length <= 10 ? 'as const' : '';

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
