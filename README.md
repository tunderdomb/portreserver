portreserver
============

## Install

    npm install portreserver

## Usage

Include it

```js
var reserve = require("portreserver")
```

Reserve one ports starting from 8000

```js
reserve(8000, function( a ){
  console.log("Reserved port %d", a)
  // Reserved port 8000
})
```

Reserve two ports starting from 8000

```js
reserve(8000, 2, function( a, b ){
  console.log("Reserved ports %d and %d", a, b)
  // Reserved ports 8000 and 8001
})
```

Reserve multiple ports in one go

```js
reserve.multiple([[3000, 3], [35729]], function( as, bs ){
  console.log("Reserved multiple ports %s and %s", as, bs)
  // Reserved multiple ports 3000,3001,3002 and 35729
})
```

For convenience, machine's local IP address is accessible as a property:

```js
console.log("IP: %s", reserve.IP)
```

## Licence

MIT