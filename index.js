var portscanner = require('portscanner')
var async = require('async')
var IP = require("./IP")

var MAX_PORTS = 100

module.exports = portreserver

portreserver.IP = IP

/**
 * @param startPort{Number} start scanning with this port
 * @param [portCount]{Number} how many ports to reserve
 * @param done{Function} ready callback with `portCount` many arguments
 * */
function portreserver( startPort, portCount, done ){
  if( !done ) {
    done = portCount
    portCount = 1
  }

  if( typeof done != "function" ) throw new Error("Missing callback!")

  !function reservePorts( n, i, start, ports ){
    portscanner.findAPortNotInUse(start, startPort + MAX_PORTS, IP, function ( err, port ){
      ports.push(port)
      if ( !--n ) {
        done.apply(null, ports)
      }
      else {
        reservePorts(n, ++i, port + 1, ports)
      }
    })
  }(portCount, 0, startPort, [])
}

/**
 * Set teh number of max attempts.
 * @param n{Number} number of max attempts
 * */
portreserver.max = function( n ){
  MAX_PORTS = n
}

/**
 * Reserve multiple ports
 * @param ports{Array} an array of arguments that will be passed to `portreserver`.
 * @param done{Function} a callback receiving port arrays
 * */
portreserver.multiple = function( ports, done ){
  async.map(ports, function( args, next ){
    args.push(function(  ){
      next(null, [].slice.call(arguments))
    })
    portreserver.apply(null, args)
  }, function( err, reserved ){
    if( err ) throw err
    else done.apply(null, reserved)
  })
}