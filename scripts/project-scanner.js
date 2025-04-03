#!/usr/bin/env node

/**
 * Project Scanner for sweida1
 *
 * This script scans your project for common issues and provides fixes where possible.
 * It checks for:
 * - Code quality issues (ESLint)
 * - Dependency vulnerabilities (npm audit)
 * - Type errors (TypeScript)
 * - Unused dependencies
 * - Performance issues
 * - Accessibility issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');
const IS_TYPESCRIPT = fs.existsSync(path.join(PROJECT_ROOT, 'tsconfig.json'));

// Utility functions
function runCommand(command, options = {}) {
  try {
    return execSync(command, {
      cwd: PROJECT_ROOT,
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf-8',
      ...options,
    });
  } catch (error) {
    if (options.ignoreError) {
      return error.stdout || error.stderr || '';
    }
    console.error(chalk.red(`Error running command: ${command}`));
    console.error(error.stdout || error.stderr || error);
    if (options.exitOnError !== false) {
      process.exit(1);
    }
    return null;
  }
}

function checkDependencies() {
  console.log(chalk.blue('\n📦 Checking for missing dependencies...\n'));

  // Install required tools if they don't exist
  const requiredDevDeps = ['eslint', 'prettier', 'chalk', 'depcheck'];
  if (IS_TYPESCRIPT) {
    requiredDevDeps.push(
      'typescript',
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin'
    );
  }

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  const devDeps = packageJson.devDependencies || {};
  const deps = packageJson.dependencies || {};

  const missingDeps = requiredDevDeps.filter((dep) => !devDeps[dep] && !deps[dep]);

  if (missingDeps.length > 0) {
    console.log(chalk.yellow(`Installing required dev dependencies: ${missingDeps.join(', ')}`));
    runCommand(`npm install --save-dev ${missingDeps.join(' ')}`);
  }
}

function runLinters() {
  console.log(chalk.blue('\n🔍 Running code quality checks...\n'));

  // Check if ESLint config exists, create one if it doesn't
  const eslintConfigPath = path.join(PROJECT_ROOT, '.eslintrc.js');
  if (!fs.existsSync(eslintConfigPath)) {
    console.log(chalk.yellow('ESLint config not found, creating one...'));
    const eslintConfig = IS_TYPESCRIPT
      ? `module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Add custom rules here
  },
};`
      : `module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    // Add custom rules here
  },
};`;

    fs.writeFileSync(eslintConfigPath, eslintConfig);
  }

  // Run ESLint
  console.log(chalk.cyan('Running ESLint...'));
  const eslintResult = runCommand('npx eslint . --ext .js,.jsx,.ts,.tsx --fix', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  if (eslintResult && eslintResult.includes('error')) {
    console.log(chalk.red('ESLint found issues that need manual fixing:'));
    console.log(eslintResult);
  } else {
    console.log(chalk.green('ESLint: No issues found or all issues fixed automatically!'));
  }

  // Run Prettier if available
  const prettierConfigPath = path.join(PROJECT_ROOT, '.prettierrc');
  if (!fs.existsSync(prettierConfigPath)) {
    console.log(chalk.yellow('Prettier config not found, creating one...'));
    const prettierConfig = `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}`;
    fs.writeFileSync(prettierConfigPath, prettierConfig);
  }

  console.log(chalk.cyan('Running Prettier...'));
  runCommand('npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,scss,md}"', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });
  console.log(chalk.green('Prettier: Code formatting complete!'));
}

function checkTypeErrors() {
  if (!IS_TYPESCRIPT) {
    console.log(chalk.yellow('\nTypeScript not detected, skipping type checking.'));
    return;
  }

  console.log(chalk.blue('\n🔍 Checking for TypeScript errors...\n'));
  const tsResult = runCommand('npx tsc --noEmit', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  if (tsResult && tsResult.includes('error')) {
    console.log(chalk.red('TypeScript found issues that need fixing:'));
    console.log(tsResult);
  } else {
    console.log(chalk.green('TypeScript: No type errors found!'));
  }
}

function checkDependencyIssues() {
  console.log(chalk.blue('\n🔍 Checking for dependency issues...\n'));

  // Check for security vulnerabilities
  console.log(chalk.cyan('Running npm audit...'));
  const auditResult = runCommand('npm audit', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  if (auditResult && auditResult.includes('vulnerabilities')) {
    console.log(chalk.yellow('Security vulnerabilities found:'));
    console.log(auditResult);

    console.log(chalk.cyan('\nAttempting to fix vulnerabilities...'));
    runCommand('npm audit fix', { exitOnError: false, ignoreError: true });

    // Check if there are still vulnerabilities that require manual intervention
    const postFixAudit = runCommand('npm audit', {
      silent: true,
      exitOnError: false,
      ignoreError: true,
    });

    if (postFixAudit && postFixAudit.includes('vulnerabilities')) {
      console.log(chalk.yellow('Some vulnerabilities require manual review:'));
      console.log(
        chalk.yellow('Run `npm audit fix --force` to fix them (may include breaking changes)')
      );
    } else {
      console.log(chalk.green('All vulnerabilities fixed!'));
    }
  } else {
    console.log(chalk.green('No security vulnerabilities found!'));
  }

  // Check for unused dependencies
  console.log(chalk.cyan('\nChecking for unused dependencies...'));
  const depcheckResult = runCommand('npx depcheck', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  if (depcheckResult && depcheckResult.includes('Unused dependencies')) {
    console.log(chalk.yellow('Unused dependencies found:'));
    console.log(depcheckResult);
  } else {
    console.log(chalk.green('No unused dependencies found!'));
  }
}

function checkForPerformanceIssues() {
  console.log(chalk.blue('\n⚡ Checking for performance issues...\n'));

  // Look for common performance issues in the codebase
  const jsFiles = findFiles(PROJECT_ROOT, ['.js', '.jsx', '.ts', '.tsx']);

  const performanceIssues = [];

  jsFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    // Check for large array operations without memoization
    if (content.includes('.map(') || content.includes('.filter(') || content.includes('.reduce(')) {
      if (
        !content.includes('useMemo') &&
        !content.includes('useCallback') &&
        content.includes('render')
      ) {
        performanceIssues.push({
          file,
          issue: 'Potential performance issue: Array operations in render without memoization',
          line: findLineNumber(content, ['.map(', '.filter(', '.reduce(']),
        });
      }
    }

    // Check for missing keys in lists
    if (
      (content.includes('.map(') || content.includes('forEach(')) &&
      content.includes('return') &&
      content.includes('<') &&
      !content.includes('key={')
    ) {
      performanceIssues.push({
        file,
        issue: 'Missing key prop in list rendering',
        line: findLineNumber(content, ['.map(', 'forEach(']),
      });
    }

    // Check for inline object creation in render
    if (
      content.includes('render') &&
      (content.includes('style={{') || content.includes('= {') || content.includes(': {'))
    ) {
      performanceIssues.push({
        file,
        issue: 'Inline object creation in render may cause unnecessary re-renders',
        line: findLineNumber(content, ['style={{', '= {', ': {']),
      });
    }
  });

  if (performanceIssues.length > 0) {
    console.log(chalk.yellow(`Found ${performanceIssues.length} potential performance issues:`));
    performanceIssues.forEach((issue) => {
      console.log(chalk.yellow(`- ${issue.file}:${issue.line}: ${issue.issue}`));
    });
  } else {
    console.log(chalk.green('No obvious performance issues detected!'));
  }
}

function checkAccessibilityIssues() {
  console.log(chalk.blue('\n♿ Checking for accessibility issues...\n'));

  const jsxFiles = findFiles(PROJECT_ROOT, ['.jsx', '.tsx']);

  const a11yIssues = [];

  jsxFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    // Check for images without alt text
    if (content.includes('<img') && !content.includes('alt=')) {
      a11yIssues.push({
        file,
        issue: 'Image without alt text',
        line: findLineNumber(content, ['<img']),
      });
    }

    // Check for clickable divs instead of buttons
    if (
      (content.includes('div') || content.includes('span')) &&
      content.includes('onClick') &&
      !content.includes('role=')
    ) {
      a11yIssues.push({
        file,
        issue: 'Clickable div/span without role attribute',
        line: findLineNumber(content, ['onClick']),
      });
    }

    // Check for missing form labels
    if (
      content.includes('<input') &&
      !content.includes('aria-label') &&
      !content.includes('<label')
    ) {
      a11yIssues.push({
        file,
        issue: 'Input without associated label',
        line: findLineNumber(content, ['<input']),
      });
    }
  });

  if (a11yIssues.length > 0) {
    console.log(chalk.yellow(`Found ${a11yIssues.length} potential accessibility issues:`));
    a11yIssues.forEach((issue) => {
      console.log(chalk.yellow(`- ${issue.file}:${issue.line}: ${issue.issue}`));
    });
  } else {
    console.log(chalk.green('No obvious accessibility issues detected!'));
  }
}

// Helper functions
function findFiles(dir, extensions, files = []) {
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip node_modules and .git directories
    if (entry.name === 'node_modules' || entry.name === '.git') continue;

    if (entry.isDirectory()) {
      findFiles(fullPath, extensions, files);
    } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findLineNumber(content, patterns) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (patterns.some((pattern) => lines[i].includes(pattern))) {
      return i + 1;
    }
  }
  return 'unknown';
}

// Main function
async function main() {
  console.log(chalk.green.bold('🚀 Starting project scan for sweida1...\n'));

  // Check and install required dependencies
  checkDependencies();

  // Run linters and fix code style issues
  runLinters();

  // Check for TypeScript errors
  checkTypeErrors();

  // Check for dependency issues
  checkDependencyIssues();

  // Check for performance issues
  checkForPerformanceIssues();

  // Check for accessibility issues
  checkAccessibilityIssues();

  console.log(chalk.green.bold('\n✅ Project scan complete!'));
}

main().catch((error) => {
  console.error(chalk.red('An error occurred during the scan:'));
  console.error(error);
  process.exit(1);
});
