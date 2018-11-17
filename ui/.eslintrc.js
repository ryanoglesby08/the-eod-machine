const path = require('path')
const { importSchema } = require('graphql-import')

let baseConfig
if (process.env.QUERIES_ONLY) {
  baseConfig = {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      es6: true,
      browser: true,
      jest: true,
    },
  }
} else {
  baseConfig = {
    extends: ['react-app'],
  }
}

module.exports = Object.assign({}, baseConfig, {
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaString: importSchema(
          path.resolve(__dirname, '../api/src/schema/schema.graphql')
        ),
      },
    ],
  },
})
