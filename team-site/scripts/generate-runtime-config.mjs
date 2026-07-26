import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicDirectory = resolve('public');

const runtimeConfig = {
  task: 'T05',
  publicUrlConfigured: Boolean(process.env.PUBLIC_URL),
  secretsRedacted: true,
  checkedAt: new Date().toISOString(),
};

await mkdir(publicDirectory, { recursive: true });
await writeFile(
  resolve(publicDirectory, 'runtime-config'),
  `${JSON.stringify(runtimeConfig, null, 2)}\n`,
  'utf8',
);

console.log(JSON.stringify(runtimeConfig));