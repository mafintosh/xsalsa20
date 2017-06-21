var fs = require('fs')
var toUint8Array = require('base64-to-uint8array')

var WASM = toUint8Array(fs.readFileSync(__dirname + '/xsalsa20.wasm', 'base64'))
var mod
var mem
var rdy

exports.WASM_SUPPORTED = typeof WebAssembly !== 'undefined'

function ready (cb) {
  if (!cb) cb = noop
  if (!exports.WASM_SUPPORTED) return cb()
  if (!rdy) rdy = WebAssembly.instantiate(WASM).then(setup)
  return rdy.then(cb).catch(cb)
}

function noop () {}

function setup (w) {
  mod = w.instance.exports
  mem = new Uint8Array(w.instance.exports.memory.buffer)
}

ready(function () {
  mod.core_hsalsa20(0, 32, 48)
  console.log(new Buffer(mem.slice(0, 32)))
})
