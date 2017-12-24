import * as http from 'http'

const server = http.createServer((req: http.IncomingMessage, res:http.ServerResponse) => {
  console.log(req.url)
  res.end(req.url)
})

server.listen(3000, (err?:Error) => {
  if (!err) {
    console.log(`server is running on port ${3000}`)
  } else {
    console.log(err)
  }
})