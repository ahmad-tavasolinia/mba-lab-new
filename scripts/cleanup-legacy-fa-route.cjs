const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const persianAppRoot = path.resolve(projectRoot, 'src', 'app', 'fa');
const persianLabRoot = path.resolve(persianAppRoot, 'mba-lab');
const legacyRouteDirectory = path.resolve(persianAppRoot, '[[...path]]');
const legacyRoutePage = path.resolve(legacyRouteDirectory, 'page.tsx');
const legacyApostropheRouteDirectory = path.resolve(
  persianLabRoot,
  "Mud-Bay-and-the-Hour-That-Wasn't-Actually-Dead"
);
const legacyApostropheRoutePage = path.resolve(legacyApostropheRouteDirectory, 'page.tsx');

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

if (!legacyApostropheRoutePage.startsWith(`${persianLabRoot}${path.sep}`)) {
  throw new Error('Refusing to remove a path outside the Persian MBA Lab directory.');
}

if (fs.existsSync(legacyApostropheRoutePage)) {
  fs.unlinkSync(legacyApostropheRoutePage);
  try {
    fs.rmdirSync(legacyApostropheRouteDirectory);
  } catch (error) {
    if (error.code !== 'ENOTEMPTY' && error.code !== 'ENOENT') throw error;
  }
  console.log('Removed the invalid apostrophe Persian route before build.');
}
