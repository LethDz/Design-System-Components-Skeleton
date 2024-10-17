import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import preserveDirectives from 'rollup-plugin-preserve-directives';

/**
 * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
 */
const typescriptOptions = {
  tsconfig: './tsconfig.json',
  importHelpers: true,
};

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: ['src/index.ts'],
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    generatedCode: {
      arrowFunctions: false,
      constBindings: true,
      objectShorthand: false,
    },
  },
  makeAbsoluteExternalsRelative: false,
  onwarn(warning) {
    // Emit the module level directive warning
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;

    // Log the warning to the console
    console.warn(`Rollup warning: ${warning.message}`);
  },
  plugins: [resolve(), typescript(typescriptOptions), preserveDirectives()],
  external: ['react'],
};

export default config;
