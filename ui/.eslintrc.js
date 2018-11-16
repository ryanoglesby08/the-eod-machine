const path = require('path')
const { importSchema } = require('graphql-import')

module.exports = {
  extends: ['react-app'],
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
}
