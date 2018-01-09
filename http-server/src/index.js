const http = require('http')
const path = require('path')
const fs = require('fs')
const qs = require('querystring')
const port = process.env.PORT || 3000
const routesDir = path.join(__dirname, 'routes')
const handlerNames = fs.readdirSync(routesDir)
if (!handlerNames.length) {
  throw new Error('no routes defined')
}
const routeHandlers = {
  GET:{},
  POST:{},
  PUT:{},
  DELETE:{}
}
handlerNames.forEach((name) => {
  const handlerData = require(path.join(routesDir, name))
  //check if no handler function or no route then skip
  if (!handlerData.handler || typeof handlerData.handler !== 'function' || !handlerData.route) {
    return
  }
  //if no method, then set it 'GET'
  if (['POST', 'GET', 'PUT', 'DELETE'].indexOf(handlerData.method) === -1) {
    routeHandlers['GET'][handlerData.route] = handlerData.handler 
  } else {
    routeHandlers[handlerData.method][handlerData.route] = handlerData.handler
  }
})

const server = http.createServer((req, res) => {
  const route = /(^\/[\w/\-\d]+)/.exec(req.url)[0]
  const handler = routeHandlers[req.method][route]
  //if request is 'GET' or 'DELETE' then parse queystring
  if (['GET', 'DELETE'].indexOf(req.method) !== -1) {
    const queryString = req.url.replace(`${route}?`, '')
    const query = qs.parse(queryString)
    req.query = query
  }
  /**
  * Todo:
  * I shall also handle the request body here
  */
  if (!handler) {
    res.statusCode = 404
    res.statusMessage = '404 Not found'
    res.end('404 Not found')
  } else {
    handler(req, res)
  }
})

server.listen(port, (err) => {
  if (!err) {
    console.log(`server is listening on port ${port}`)
  }
})

