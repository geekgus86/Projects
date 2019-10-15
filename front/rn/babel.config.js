module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
  env: {
    "development": {
      "plugins": [
        "@babel/transform-react-jsx-source"
      ]
    }
  }
};