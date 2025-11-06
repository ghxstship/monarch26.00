#!/usr/bin/env node

/**
 * Design Token Validator
 * Validates that all components use design tokens
 * Run in CI/CD pipeline
 */

import fs from 'fs';
import path from 'path';

interface ValidationError {
  file: string;
  line: number;
  violation: string;
  suggestion: string;
}

const FORBIDDEN_PATTERNS = [
  // Hardcoded colors (excluding CSS variables and node_modules)
  { 
    pattern: /(?<!var\(--)[:#]([0-9A-Fa-f]{3,8})(?!\))/g, 
    name: 'hardcoded hex color',
    suggestion: 'Use var(--color-*) or Tailwind color classes',
  },
  { 
    pattern: /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g, 
    name: 'hardcoded RGB color',
    suggestion: 'Use var(--color-*) or Tailwind color classes',
  },
  
  // Hardcoded pixel values in style attributes
  { 
    pattern: /style={{[^}]*:\s*['"]?\d+px/g, 
    name: 'hardcoded pixel value in inline style',
    suggestion: 'Use Tailwind spacing classes or var(--space-*)',
  },
  
  // Directional properties (should use logical)
  { 
    pattern: /(margin|padding)-(left|right):/g, 
    name: 'directional property (not RTL-friendly)',
    suggestion: 'Use margin-inline-start or margin-inline-end',
  },
];

function validateFile(filePath: string): ValidationError[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors: ValidationError[] = [];
  
  lines.forEach((line, index) => {
    FORBIDDEN_PATTERNS.forEach(({ pattern, name, suggestion }) => {
      const matches = line.match(pattern);
      if (matches) {
        errors.push({
          file: filePath,
          line: index + 1,
          violation: `${name}: ${matches[0]}`,
          suggestion,
        });
      }
    });
  });
  
  return errors;
}

function validateDirectory(dirPath: string): ValidationError[] {
  let allErrors: ValidationError[] = [];
  
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file.name);
    
    if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
      allErrors = allErrors.concat(validateDirectory(fullPath));
    } else if (file.name.match(/\.(css|tsx|jsx)$/)) {
      allErrors = allErrors.concat(validateFile(fullPath));
    }
  });
  
  return allErrors;
}

// Run validation
const projectRoot = process.cwd();
const srcPaths = [
  path.join(projectRoot, 'app'),
  path.join(projectRoot, 'components'),
  path.join(projectRoot, 'design-system'),
];

let allErrors: ValidationError[] = [];
srcPaths.forEach(srcPath => {
  if (fs.existsSync(srcPath)) {
    allErrors = allErrors.concat(validateDirectory(srcPath));
  }
});

if (allErrors.length > 0) {
  console.error('\n❌ Design Token Violations Found:\n');
  allErrors.forEach(error => {
    console.error(`${error.file}:${error.line}`);
    console.error(`  Violation: ${error.violation}`);
    console.error(`  Suggestion: ${error.suggestion}\n`);
  });
  console.error(`Total violations: ${allErrors.length}\n`);
  process.exit(1);
} else {
  console.log('✅ All files comply with design token requirements');
  process.exit(0);
}
