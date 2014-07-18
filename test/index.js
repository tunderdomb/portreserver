var reserve = require("../index")

console.log("IP: %s", reserve.IP)

reserve(8000, function( a ){
  console.log("Reserved port %d", a)
})

reserve(8000, 2, function( a, b ){
  console.log("Reserved ports %d and %d", a, b)
})


reserve.multiple([[3000, 3], [35729]], function( as, bs ){
  console.log("Reserved multiple ports %s and %s", as, bs)
})