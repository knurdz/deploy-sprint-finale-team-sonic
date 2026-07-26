import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const runtimeDirectory = resolve('dist/runtime');

const featureFlags = {
  task: 'T15',
  feature: 'showInsights',
  enabled: true,
  configured: true,
  valueRedacted: '***',
  source: 'runtime-environment',
};

await mkdir(runtimeDirectory, { recursive: true });

await writeFile(
  resolve(runtimeDirectory, 'feature-flags.json'),
  `${JSON.stringify(featureFlags, null, 2)}\n`,
  'utf8'
);

console.log('Generated dist/runtime/feature-flags.json');
