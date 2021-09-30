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
              screens: './src/screens',
              navigators: './src/navigators',
              features: './src/features',
              services: './src/services',
              models: './src/models',
            },
          },
        ],
      ],
    },
  },
};
