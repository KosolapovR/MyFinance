module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: [
              '.ios.ts',
              '.android.ts',
              '.ts',
              '.ios.tsx',
              '.android.tsx',
              '.tsx',
              '.jsx',
              '.js',
              '.json',
            ],
            alias: {
              components: './src/components',
              context: './src/context',
              features: './src/features',
              hooks: './src/hooks',
              navigators: './src/navigators',
              models: './src/models',
              screens: './src/screens',
              services: './src/services',
              theme: './src/theme',
            },
          },
        ],
      ],
    },
  },
};
