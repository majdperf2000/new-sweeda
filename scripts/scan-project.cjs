#!/usr/bin/env node

/**
 * Project Scanner for sweeeda_
 *
 * This script scans your project for common issues and provides fixes where possible.
 * Run with --fix flag to automatically fix issues where possible.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Utility functions
function runCommand(command, options = {}) {
  try {
    console.log(`\n> ${command}\n`);
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
    console.error(`Error running command: ${command}`);
    console.error(error.stdout || error.stderr || error);
    if (options.exitOnError !== false) {
      process.exit(1);
    }
    return null;
  }
}

// Main scanning functions
function runESLint(fix = true) {
  console.log('\n📝 Running ESLint to check code quality...');
  const fixFlag = fix ? ' --fix' : '';
  return runCommand(`npx eslint . --ext .js,.jsx,.ts,.tsx${fixFlag}`, {
    exitOnError: false,
    ignoreError: true,
  });
}

function runTypeCheck() {
  console.log('\n🔍 Running TypeScript type checking...');
  return runCommand('npx tsc --noEmit', {
    exitOnError: false,
    ignoreError: true,
  });
}

function checkDependencies() {
  console.log('\n📦 Checking for dependency issues...');

  // Check for outdated packages
  console.log('\nChecking for outdated packages:');
  runCommand('npm outdated', {
    exitOnError: false,
    ignoreError: true,
  });

  // Check for security vulnerabilities
  console.log('\nChecking for security vulnerabilities:');
  const auditResult = runCommand('npm audit', {
    exitOnError: false,
    ignoreError: true,
  });

  if (auditResult && auditResult.includes('vulnerabilities')) {
    console.log('\nAttempting to fix vulnerabilities...');
    runCommand('npm audit fix', {
      exitOnError: false,
      ignoreError: true,
    });
  }
}

function checkUnusedDependencies() {
  console.log('\n🧹 Checking for unused dependencies...');

  // Run depcheck
  const depcheckResult = runCommand('npx depcheck', {
    exitOnError: false,
    ignoreError: true,
    silent: true,
  });

  console.log(depcheckResult);
}

function runPrettier(fix = true) {
  console.log('\n✨ Checking code formatting with Prettier...');

  // Create prettier config if it doesn't exist
  const prettierConfigPath = path.join(PROJECT_ROOT, '.prettierrc');
  if (!fs.existsSync(prettierConfigPath)) {
    console.log('Creating Prettier config...');
    const prettierConfig = {
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 100,
    };
    fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfig, null, 2));
  }

  // Run prettier
  if (fix) {
    runCommand('npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,scss,md}"', {
      exitOnError: false,
      ignoreError: true,
    });
  } else {
    runCommand('npx prettier --check "**/*.{js,jsx,ts,tsx,json,css,scss,md}"', {
      exitOnError: false,
      ignoreError: true,
    });
  }
}

function checkBundleSize() {
  console.log('\n📦 Analyzing bundle size...');

  // Run bundle analyzer
  runCommand('npx vite-bundle-visualizer', {
    exitOnError: false,
    ignoreError: true,
  });

  console.log('\nBundle analysis complete. Check the generated HTML file in the project root.');
}

function checkAccessibility() {
  console.log('\n♿ Checking for accessibility issues...');

  // Check if axe-core is installed
  try {
    runCommand('npx axe --version', { silent: true });
  } catch (error) {
    console.log('Note: For accessibility testing, consider installing @axe-core/cli');
    return;
  }

  // Find all HTML files
  const findHtmlFiles = runCommand('find src -name "*.html"', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  const htmlFiles = findHtmlFiles.trim().split('\n').filter(Boolean);

  if (htmlFiles.length > 0) {
    console.log(`Found ${htmlFiles.length} HTML files to check`);
    htmlFiles.forEach((file) => {
      console.log(`Checking ${file}...`);
      runCommand(`npx axe ${file} --exit`, {
        exitOnError: false,
        ignoreError: true,
      });
    });
  } else {
    console.log('No HTML files found to check');
  }
}

function checkPerformance() {
  console.log('\n⚡ Checking for performance issues...');

  // Look for common performance issues in React components
  console.log('\nLooking for common React performance issues:');

  // Find all React component files
  const findComponentFiles = runCommand('find src -name "*.tsx" -o -name "*.jsx"', {
    silent: true,
    exitOnError: false,
    ignoreError: true,
  });

  const componentFiles = findComponentFiles.trim().split('\n').filter(Boolean);

  if (componentFiles.length > 0) {
    console.log(`Found ${componentFiles.length} component files to check`);

    // Common performance issues to look for
    const performanceIssues = [
      { pattern: /React.useState\(/g, message: 'Consider using useReducer for complex state' },
      { pattern: /style={{/g, message: 'Inline styles can cause unnecessary re-renders' },
      {
        pattern: /new Array\(/g,
        message: 'Creating arrays in render can cause unnecessary re-renders',
      },
      {
        pattern: /\.map\(.*=>.*<.*>\)/g,
        message: 'Missing key prop in list rendering or consider memoization',
      },
      { pattern: /useEffect\([^,]*\)/g, message: 'Missing dependency array in useEffect' },
    ];

    componentFiles.forEach((file) => {
      try {
        const content = fs.readFileSync(file, 'utf-8');

        performanceIssues.forEach(({ pattern, message }) => {
          if (pattern.test(content)) {
            console.log(`- ${file}: ${message}`);
          }
          // Reset regex lastIndex
          pattern.lastIndex = 0;
        });
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    });
  } else {
    console.log('No component files found to check');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const shouldFix = args.includes('--fix');

  console.log('🚀 Starting project scan for sweida1...');

  // Run ESLint
  runESLint(shouldFix);

  // Run TypeScript type checking
  runTypeCheck();

  // Run Prettier
  runPrettier(shouldFix);

  // Check dependencies
  checkDependencies();

  // Check for unused dependencies
  checkUnusedDependencies();

  // Check for accessibility issues
  checkAccessibility();

  // Check for performance issues
  checkPerformance();

  // Analyze bundle size
  checkBundleSize();

  console.log('\n✅ Project scan complete!');

  if (!shouldFix) {
    console.log('\nTo automatically fix issues, run: npm run scan:fix');
  }
}

main().catch((error) => {
  console.error('An error occurred during the scan:');
  console.error(error);
  process.exit(1);
});

