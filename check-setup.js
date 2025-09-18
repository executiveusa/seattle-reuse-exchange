#!/usr/bin/env node

/**
 * Seattle Reuse Exchange - Setup Checker
 * This script verifies that all required dependencies and configurations are in place.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Seattle Reuse Exchange - Setup Checker\n');

const checks = [];

// Check if required files exist
const requiredFiles = [
  '.env',
  'services/api/.env.encore',
  'apps/web/.env.local',
  'services/api/go.mod',
  'apps/web/package.json'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  checks.push({ name: `File: ${file}`, status: exists });
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check if CLI tools are installed
const cliTools = [
  { name: 'node', command: 'node --version' },
  { name: 'pnpm', command: 'pnpm --version' },
  { name: 'go', command: 'go version' },
];

console.log('\n🔧 Checking CLI tools...');
cliTools.forEach(tool => {
  try {
    const version = execSync(tool.command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
    checks.push({ name: `CLI: ${tool.name}`, status: true });
    console.log(`✅ ${tool.name}: ${version}`);
  } catch (error) {
    checks.push({ name: `CLI: ${tool.name}`, status: false });
    console.log(`❌ ${tool.name}: Not installed or not in PATH`);
  }
});

// Check Encore CLI separately (might not be installed yet)
console.log('\n🚀 Checking Encore CLI...');
try {
  const encoreVersion = execSync('encore version', { encoding: 'utf-8', stdio: 'pipe' }).trim();
  checks.push({ name: 'CLI: encore', status: true });
  console.log(`✅ encore: ${encoreVersion}`);
} catch (error) {
  checks.push({ name: 'CLI: encore', status: false });
  console.log(`❌ encore: Not installed - Visit https://encore.dev/docs/install`);
}

// Check environment variables
console.log('\n🔐 Checking environment variables...');
const envFiles = [
  { path: '.env', required: ['STRIPE_SECRET_KEY', 'NEXTAUTH_SECRET', 'RESEND_API_KEY'] },
  { path: 'services/api/.env.encore', required: ['DATABASE_URL', 'STRIPE_SECRET_KEY'] },
  { path: 'apps/web/.env.local', required: ['NEXTAUTH_URL', 'NEXT_PUBLIC_API_URL'] }
];

envFiles.forEach(envFile => {
  if (fs.existsSync(envFile.path)) {
    const content = fs.readFileSync(envFile.path, 'utf-8');
    envFile.required.forEach(key => {
      const hasKey = content.includes(`${key}=`) && !content.includes(`${key}=your-`);
      checks.push({ name: `Env: ${envFile.path}/${key}`, status: hasKey });
      console.log(`${hasKey ? '✅' : '⚠️'} ${envFile.path}: ${key} ${hasKey ? 'configured' : 'needs value'}`);
    });
  }
});

// Check if dependencies are installed
console.log('\n📦 Checking dependencies...');
const nodeModulesExists = fs.existsSync('node_modules');
checks.push({ name: 'Dependencies: node_modules', status: nodeModulesExists });
console.log(`${nodeModulesExists ? '✅' : '❌'} node_modules: ${nodeModulesExists ? 'Installed' : 'Run pnpm install'}`);

// Summary
console.log('\n📊 Setup Summary');
console.log('='.repeat(50));
const passed = checks.filter(c => c.status).length;
const total = checks.length;

console.log(`✅ Passed: ${passed}/${total}`);
if (passed < total) {
  console.log(`❌ Failed: ${total - passed}/${total}`);
  console.log('\n💡 Next steps:');
  checks.filter(c => !c.status).forEach(check => {
    console.log(`   - Fix: ${check.name}`);
  });
}

if (passed === total) {
  console.log('\n🎉 All checks passed! Your setup is ready.');
  console.log('\n🚀 To start development:');
  console.log('   1. Terminal 1: cd services/api && encore run');
  console.log('   2. Terminal 2: cd apps/web && pnpm dev');
  console.log('   3. Visit: http://localhost:3000');
} else {
  console.log('\n📖 See SETUP.md for detailed setup instructions.');
}

console.log('');