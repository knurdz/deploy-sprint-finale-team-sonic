import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const rawValue = process.env.FEATURE_SHOW_INSIGHTS?.trim().toLowerCase();

const configured = rawValue === 'true' || rawValue === 'false';
const enabled = rawValue === 'true';

const outputDirectory = resolve('public', 'runtime');
const outputFile = resolve(outputDirectory, 'feature-flags.json');

const featureFlags = {
  task: 'T15',
  feature: 'showInsights',
  enabled,
  configured,
  valueRedacted: true,
  source: 'runtime-environment',
};

await mkdir(outputDirectory, { recursive: true });

await writeFile(
  outputFile,
  `${JSON.stringify(featureFlags, null, 2)}\n`,
);

console.log('Generated safe T15 feature flag manifest.');
console.log(`showInsights configured: ${configured}`);
console.log(`showInsights enabled: ${enabled}`);