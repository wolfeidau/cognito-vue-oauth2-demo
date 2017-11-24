module.exports = {
  NODE_ENV: '"production"',
  COGNITO_DOMAIN: quote(process.env.COGNITO_DOMAIN),
  CLIENT_ID: quote(process.env.CLIENT_ID),
  REDIRECT_URL: quote(process.env.REDIRECT_URL),
}

function quote(value) {
  return '"' + value + '"'
}