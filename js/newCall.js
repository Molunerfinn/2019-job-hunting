/* eslint-disable no-extend-native */
Function.prototype.newCall = function (context, ...args) {
  if (!context) {
    context = global // node 全局环境下只有global
  }
  context.fn = this
  const result = context.fn(...args) // 此处调用时改变了this指向，fn的this指向context
  delete context.fn
  return result
}

module.exports = Function
