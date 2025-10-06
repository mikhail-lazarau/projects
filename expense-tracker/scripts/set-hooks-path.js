// scripts/set-hooks-path.js
import { execSync } from 'node:child_process';
import path from 'node:path';

const projectType = process.argv[2];

if (!projectType || (projectType !== 'frontend' && projectType !== 'backend')) {
  console.error('Error: Please specify \'frontend\' or \'backend\' as an argument.');
  process.exit(1);
}

function run(cmd) {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .trim();
}

try {
  // Git repo absolute root
  const root = run('git rev-parse --show-toplevel');

  // Absolute path to the Husky folder
  const hooks = path.join(root, 'expense-tracker', projectType, '.husky');

  // Ensure Husky is installed into that folder
  execSync(`npx husky "${hooks}"`, { stdio: 'inherit' });

  // Point Git to that hooks path
  execSync(`git config core.hooksPath "${hooks}"`, { stdio: 'inherit' });
  console.log(`✔ ${projectType} hooksPath set to:`, hooks);

  // Make pre-commit hook executable
  const preCommitHookPath = path.join(hooks, 'pre-commit');
  execSync(`chmod +x "${preCommitHookPath}"`, { stdio: 'inherit' });
  console.log(`✔ ${projectType} pre-commit hook is executable`);
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error('⚠ Failed to set core.hooksPath:', message);
  process.exit(1);
}
