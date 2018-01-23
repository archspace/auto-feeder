const http = require('http')
const Url = require('url')
const Promise = global.Promise

const ext = {
  parseUrl: function () {
    const urlString = this.url
    if (!urlString || typeof urlString !== 'string') {
      return
    }
    const url = Url.parse(urlString, true)
    this.route = url.pathname
    this.query = url.query
    this.url = url
  },
  fetchBody: function () {
    const self = this
    return new Promise((resolve, reject) => {
      let str = ''
      self.setEncoding('utf-8')
      self.on('data', (chunk) => {
        str = str.concat(chunk)
        self.body = JSON.parse(str)
        resolve(self.body)
      })
      self.on('error', (err) => reject(err))
    })
  }
}

Object.assign(http.IncomingMessage.prototype, ext)