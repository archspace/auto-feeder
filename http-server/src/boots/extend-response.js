const http = require('http')
const ext = {
  throw404: function () {
    this.statusCode = 404
    this.statusMessage = '404 Not found'
    this.end('404 Not found')
  },
  throw400: function () {
    this.statusCode = 400
    this.statusMessage = '400 bad request'
    this.end('400 bad request')
  }
}
Object.assign(http.ServerResponse.prototype, ext)