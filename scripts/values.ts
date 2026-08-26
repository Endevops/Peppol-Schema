// fallow-ignore-file security-sink
// Offline codegen script: paths are repo-relative constants, no untrusted input.
import { $ } from 'bun';
import path from 'node:path';
import pc from 'picocolors';

import { generateEdec } from './values/generate-edec';
import { generateFromPeppol } from './values/generate-peppol';

const valuePath = path.join(import.meta.dirname, '..', 'src', 'values');

await generateFromPeppol(valuePath);
await generateEdec(valuePath);

console.log(pc.magenta('--- Running cleanup on generated files ---'));

console.log('Running', pc.blueBright(`oxlint --fix`), 'on generated files');
await $`bunx oxlint --fix ${valuePath}`;

console.log('Running', pc.blueBright(`oxfmt`), 'on generated files');
await $`bunx oxfmt ${valuePath}`;

console.log(pc.magenta('--- Finished cleanup on generated files ---'));
