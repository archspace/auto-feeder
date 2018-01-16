const http = require('http')
const path = require('path')
const fs = require('fs')
const config = require('./config')
const port = process.env.PORT || 3000
/**
 * boots, load files
 */
config.bootSequence.forEach((boot) => {
  const bootPath = path.join(config.workDIR, boot)
  require(bootPath)
})

/**
 * routing
 */
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

function routeHandle(req, res) {
  const handler = routeHandlers[req.method][req.route]
  if (!handler) {
    res.throw404()
  } else {
    handler(req, res)
  }
}

const server = http.createServer((req, res) => {
  req.parseUrl()
  if (req.method !== 'GET') {
    req.fetchBody()
      .then(() => {
        routeHandle(req, res)
      })
      .catch(() => {
        res.throw400
      })
  } else {
    routeHandle(req, res)
  }
})

server.listen(port, (err) => {
  if (!err) {
    console.log(`server is listening on port ${port}`)
  }
})

