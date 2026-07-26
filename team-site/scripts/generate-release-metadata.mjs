import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicDirectory = resolve('public');

const commitSha =
  process.env.GITHUB_SHA ??
  process.env.COMMIT_SHA ??
  'local-development';

const releaseId =
  process.env.RELEASE_ID ??
  (process.env.GITHUB_RUN_ID
    ? `github-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT ?? '1'}`
    : 'local-preview');

const deployTime =
  process.env.DEPLOY_TIME ??
  new Date().toISOString();

const publicUrl =
  process.env.VITE_PUBLIC_URL ??
  process.env.PUBLIC_URL ??
  'http://localhost:4173';

const status = {
  team: 'Sonic',
  task: 'T01',
  commitSha,
  releaseId,
  deployTime,
  publicUrl,
};

await mkdir(publicDirectory, { recursive: true });

await writeFile(
  resolve(publicDirectory, 'health'),
  'ok\n',
  'utf8',
);

await writeFile(
  resolve(publicDirectory, 'status'),
  `${JSON.stringify(status, null, 2)}\n`,
  'utf8',
);

console.log('Generated public/health and public/status');
console.log(`Commit SHA: ${commitSha}`);
console.log(`Release ID: ${releaseId}`);