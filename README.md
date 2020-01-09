# xsalsa20

XSalsa20 implemented in Javascript and WebAssembly.

```
npm install xsalsa20
```

[![build status](https://travis-ci.org/mafintosh/xsalsa20.svg?branch=master)](https://travis-ci.org/mafintosh/xsalsa20)


## Usage

``` js
var crypto = require('crypto')
var xsalsa20 = require('xsalsa20')
var key = crypto.randomBytes(32)
var nonce = crypto.randomBytes(24)

var xor = xsalsa20(nonce, key)

console.log(xor.update(new Buffer('hello')))
console.log(xor.update(new Buffer('world')))

xor.finalize()
```

## API

#### `var xor = xsalsa20(nonce, key)`

Create a new xor instance.

Nonce should be a 24 byte buffer/uint8array and key should be 32 bytes.

#### `var output = xor.update(input, [output])`

Update the xor instance with a new input buffer. Optionally you can pass in an output buffer.

#### `xor.finalize()`

Call this method last. Clears internal state.

## Contributing

The bulk of this module is implemented in WebAssembly in the [xsalsa20.wat](xsalsa20.wat) file.
The format of this file is S-Expressions that can be compiled to their binary WASM representation by doing

```
wat2wasm xsalsa20.wat -o xsalsa20.wasm
```

To build the thin Javascript wrapper for the WASM module use `wat2js`:

```
# npm run compile
wat2js xsalsa20.wat -o xsalsa20.js
```

The `wat2wasm` tool is provided by the npm installed [`wat2wasm`](https://github.com/emilbayes/wat2wasm) WASM compiled version of `wabt`'s [`wat2wasm`](https://github.com/WebAssembly/wabt/blob/master/src/tools/wat2wasm.cc) utility.  You do not need `wabt` installed to compile, but if you want it follow the [install instructions](https://github.com/WebAssembly/wabt) or use the [webassembly-binary-toolkit](https://github.com/mafintosh/webassembly-binary-toolkit) helper.

## See Also

- [blake2b-wasm](https://github.com/mafintosh/blake2b-wasm)
- [sodium-javascript](https://github.com/sodium-friends/sodium-javascript)
- [sodium-friends](https://github.com/sodium-friends)
- [webassembly-binary-toolkit](https://github.com/mafintosh/webassembly-binary-toolkit)
- [wat2wasm](https://github.com/emilbayes/wat2wasm)
- [wat2js](https://github.com/mafintosh/wat2js)


## License

MIT
