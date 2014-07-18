var reserver = require("../index")

reserver(8000, function( a ){
  console.log("Reserved port %d", a)
})

reserver(8000, 2, function( a, b ){
  console.log("Reserved ports %d and %d", a, b)
})


reserver.multiple([[3000, 3], [35729]], function( as, bs ){
  console.log("Reserved multiple ports %s and %s", as, bs)
})