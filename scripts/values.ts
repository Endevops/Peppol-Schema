import { $ } from 'bun';
import path from 'node:path';

import { generateEdec } from './values/generate-edec';
import { generateFromPeppol } from './values/generate-peppol';

const valuePath = path.join(import.meta.dirname, '..', 'src', 'values');

await generateFromPeppol(valuePath);
await generateEdec(valuePath);

console.log('Running `oxlint --fix` on generated files');
await $`bunx oxlint --fix ${valuePath}`;

console.log('Running `oxfmt` on generated files');
await $`bunx oxfmt ${valuePath}`;
