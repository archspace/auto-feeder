/**
 * for example:
 * http://localhost:3000/add?a=10&b=3.2
 */
const method = 'GET'
const route = '/add'
const handler = function handler (req, res) {
  if (!req.query || !req.query.a || !req.query.b) {
    res.statusCode = 400
    res.statusMessage = 'Bad request'
    return res.end('Bad request')
  } 
  const a = parseFloat(req.query.a)
  const b = parseFloat(req.query.b)
  res.end(`${a + b}`)
}

module.exports = {
  method, route, handler
}