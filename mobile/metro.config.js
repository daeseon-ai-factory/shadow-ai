// Metro config for the Mimi monorepo. Lets Metro resolve the @shadow-ai/core
// workspace package (which lives at ../packages/core, outside this project root).
// https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the whole monorepo so edits to packages/core hot-reload here.
config.watchFolders = [workspaceRoot];

// 2. Resolve modules from this project first, then the hoisted root node_modules.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. @shadow-ai/core ships TypeScript via an "exports" map — keep package-exports on.
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
