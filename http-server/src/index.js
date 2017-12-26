const http = require('http')
const port = process.env.PORT || 3000
const server = http.createServer((req, res) => {
  res.end(req.url)
})
server.listen(port, (err) => {
  if (!err) {
    console.log(`server is listening on port ${port}`)
  }
})

