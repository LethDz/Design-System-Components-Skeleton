import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';

/**
 * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
 */
const typescriptOptions = {
  tsconfig: './tsconfig.json',
  importHelpers: true,
};

/**
 * @type {import('@rollup-plugin-dts').Options}
 */
const generatedTypesOptions = {
  tsconfig: './tsconfig.json',
};

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: ['src/index.ts'],
    treeshake: true,
    output: [
      {
        banner: "'use client';",
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: false,
        preserveModules: false,
        compact: true,
        indent: false,
        esModule: false,
        generatedCode: {
          arrowFunctions: false,
          constBindings: true,
          objectShorthand: true,
        },
      },
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        compact: true,
        indent: false,
        generatedCode: {
          arrowFunctions: false,
          constBindings: true,
          objectShorthand: true,
        },
      },
    ],
    makeAbsoluteExternalsRelative: false,
    onwarn(warning) {
      // Emit the module level directive warning
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;

      // Log the warning to the console
      console.warn(`Rollup warning: ${warning.message}`);
    },
    plugins: [typescript(typescriptOptions), preserveDirectives()],
    external: ['react'],
  },
  {
    input: ['src/index.ts'],
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts(generatedTypesOptions)],
  },
];

export default config;
