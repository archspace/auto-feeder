/**
 * for example:
 * http://localhost:3000/alin?time=12:30&volume=5
 */
const os = require('os')
const method = 'GET'
const route = '/alin'
var list = [ ];
const handler = function handler (req, res) {
  if (!req.query || !req.query.time || !req.query.volume) {
    res.statusCode = 400
    res.statusMessage = 'Bad request'
    return res.end('Bad request')
  } 
  //const a = parseFloat(req.query.a)
  //const b = parseFloat(req.query.b)
  //const ack = `${a + b} from  ${os.type()}`
  var obj = {
    time: req.query.time,
    volume: req.query.volume
  };
  list.push(obj);
  for(var i = 0; i < list.length; i++) {
    console.log("["+ i +"]: time: " + list[i].time + ", vol: " + list[i].volume);
  }
  var ack = JSON.stringify({ type: 'feed message', data: obj });
  console.log(`ACK to user: ${ack}`)
  res.end(`${ack}`)
}

module.exports = {
  method, route, handler
}