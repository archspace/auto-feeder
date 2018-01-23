const route = '/hello'
const method = 'GET'
const handler = function handler (req, res) {
  res.end('hello! this message is from "/hello"')
}

module.exports = {
  route, method, handler
}