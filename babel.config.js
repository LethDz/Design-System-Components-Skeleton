module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@molecules': './src/molecules',
          '@atoms': './src/atoms',
          '@organisms': './src/organisms',
          '@foundation': './src/foundation',
          // ... other path mappings ...
        },
      },
    ],
  ],
};
