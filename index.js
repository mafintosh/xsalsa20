var xsalsa20 = require('./xsalsa20')()

var head = 144
var free = []

module.exports = XSalsa20

XSalsa20.NONCEBYTES = 24
XSalsa20.KEYBYTES = 32

function XSalsa20 (nonce, key) {
  if (!(this instanceof XSalsa20)) return new XSalsa20(nonce, key)
  if (!nonce || nonce.length < 24) throw new Error('nonce must be at least 24 bytes')
  if (!key || key.length < 32) throw new Error('key must be at least 32 bytes')

  if (!free.length) {
    free.push(head)
    head += 56
  }

  this.pointer = free.pop()
  this.nonce = this.pointer + 8
  this.key = this.nonce + 16
  this.overflow = 0

  xsalsa20.memory.fill(0, this.pointer, this.pointer + 8)
  xsalsa20.memory.set(nonce, this.nonce)
  xsalsa20.memory.set(key, this.key)
}

XSalsa20.prototype.update = function (input, output) {
  if (!input) throw new Error('input must be Uint8Array or Buffer')
  if (!output) output = new Uint8Array(input.length)

  var len = this.overflow + input.length
  var start = head + this.overflow

  xsalsa20.memory.set(input, start)
  xsalsa20.exports.xsalsa20_xor(this.pointer, head, head, len, this.nonce, this.key)
  output.set(xsalsa20.memory.subarray(start, head + len))

  this.overflow = len & 63

  return output
}

XSalsa20.prototype.finalize =
XSalsa20.prototype.final = function () {
  xsalsa20.memory.fill(0, this.pointer, this.key + 32)
  free.push(this.pointer)
}
