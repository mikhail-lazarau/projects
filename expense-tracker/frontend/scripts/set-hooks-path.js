// scripts/set-hooks-path.ts
import { execSync } from 'node:child_process';
import path from 'node:path';

function run(cmd) {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .trim();
}

try {
  // Git repo absolute root
  const root = run('git rev-parse --show-toplevel');

  // Absolute path to the Husky folder
  const hooks = path.join(root, 'expense-tracker', 'frontend', '.husky');

  // Ensure Husky is installed into that folder (no .git needed here)
  execSync(`npx husky "${hooks}"`, { stdio: 'inherit' });

  // Point Git to that hooks path
  execSync(`git config core.hooksPath "${hooks}"`, { stdio: 'inherit' });

  console.log('✔ hooksPath set to:', hooks);

  // Make pre-commit hook executable
  const preCommitHookPath = path.join(hooks, 'pre-commit');
  execSync(`chmod +x "${preCommitHookPath}"`, { stdio: 'inherit' });
  console.log('✔ pre-commit hook is executable');
} catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  console.error('⚠ Failed to set core.hooksPath:', message);
  process.exit(1);
}
