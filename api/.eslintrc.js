const path = require('path')
const { importSchema } = require('graphql-import')

module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',

        schemaString: importSchema(
          path.resolve(__dirname, 'src/schema/schema.graphql')
        ),
      },
    ],
  },
}
