const config = {
  dev: {
    apiUrl: 'http://localhost:4000',
  },
  production: {
    apiUrl: 'http://api:4000',
  },
}

module.exports = config[process.env.APP_ENV || 'dev']
