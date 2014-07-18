var portscanner = require('portscanner')
var IP = require("./IP")

/**
 * @param PORT_START{Number} start scanning with this port
 * @param MAX_PORTS{Number} finish scan after this many failed attempts
 * @return Function
 * */
module.exports = function portreserver( PORT_START, MAX_PORTS ){
  MAX_PORTS = MAX_PORTS || 100
  function reservePorts( n, done, i, start, ports ){
    start = start || PORT_START
    i = i || 0
    ports = ports || []
    portscanner.findAPortNotInUse(start, PORT_START + MAX_PORTS, IP, function ( err, port ){
      ports.push(port)
      if ( !--n ) {
        done.apply(null, ports)
      }
      else {
        reservePorts(n, done, ++i, port + 1, ports)
      }
    })
  }
  return function( n, done ){
    if( !done ) {
      done = n
      n = 1
    }
    return reservePorts(n, done)
  }
}