const fs = require('fs');

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║      WAVE 1 FINAL COMPREHENSIVE VALIDATION             ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Check all WAVE 1 items
const checks = [];

// ITEM 1: Helmet.js
const serverFile = fs.readFileSync('backend/server.js', 'utf8');
const hasHelmet = serverFile.includes('require(\'helmet\')') && serverFile.includes('app.use(helmet())');
checks.push({name: 'Helmet.js Security Headers', status: hasHelmet, location: 'backend/server.js'});

// ITEM 2: Rate Limiting
const authFile = fs.readFileSync('backend/routes/admin/auth.js', 'utf8');
const hasRateLimit = authFile.includes('express-rate-limit') && authFile.includes('15 * 60 * 1000') && authFile.includes('max: 5');
checks.push({name: 'Rate Limiting (5/15min)', status: hasRateLimit, location: 'backend/routes/admin/auth.js'});

// ITEM 3: Error Boundary Component
const ebFile = 'admin/src/components/ErrorBoundary.tsx';
const hasEB = fs.existsSync(ebFile) && fs.readFileSync(ebFile, 'utf8').includes('React.Component');
checks.push({name: 'Error Boundary Component', status: hasEB, location: 'admin/src/components/ErrorBoundary.tsx'});

// ITEM 4: ErrorBoundary in App
const appFile = fs.readFileSync('admin/src/App.tsx', 'utf8');
const appHasEB = appFile.includes('ErrorBoundary') && appFile.includes('<ErrorBoundary>');
checks.push({name: 'ErrorBoundary in App.tsx', status: appHasEB, location: 'admin/src/App.tsx'});

// ITEM 5: Sentry Guide
const hasSentryGuide = fs.existsSync('docs/setup/SENTRY_INTEGRATION.md');
checks.push({name: 'Sentry Integration Guide', status: hasSentryGuide, location: 'docs/setup/SENTRY_INTEGRATION.md'});

// ITEM 6: MongoDB Backups Guide
const hasMongoGuide = fs.existsSync('docs/setup/MONGODB_BACKUPS_SETUP.md');
checks.push({name: 'MongoDB Backups Guide', status: hasMongoGuide, location: 'docs/setup/MONGODB_BACKUPS_SETUP.md'});

// Print results
checks.forEach((check, i) => {
  console.log(`${i+1}. ${check.name}`);
  console.log(`   Status: ${check.status ? '✅ IMPLEMENTED' : '❌ MISSING'}`);
  console.log(`   File: ${check.location}\n`);
});

const allPass = checks.every(c => c.status);
console.log('╔════════════════════════════════════════════════════════╗');
console.log(`║  WAVE 1 FINAL STATUS: ${allPass ? '✅ 100% COMPLETE' : '❌ INCOMPLETE'}                  ║`);
console.log('╚════════════════════════════════════════════════════════╝\n');
