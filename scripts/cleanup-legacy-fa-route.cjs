const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const persianAppRoot = path.resolve(projectRoot, 'src', 'app', 'fa');
const legacyRouteDirectory = path.resolve(persianAppRoot, '[[...path]]');
const legacyRoutePage = path.resolve(legacyRouteDirectory, 'page.tsx');

if (!legacyRoutePage.startsWith(`${persianAppRoot}${path.sep}`)) {
  throw new Error('Refusing to remove a path outside the Persian app directory.');
}

if (fs.existsSync(legacyRoutePage)) {
  fs.unlinkSync(legacyRoutePage);
  try {
    fs.rmdirSync(legacyRouteDirectory);
  } catch (error) {
    if (error.code !== 'ENOTEMPTY' && error.code !== 'ENOENT') throw error;
  }
  console.log('Removed the obsolete Persian optional catch-all route before build.');
}
