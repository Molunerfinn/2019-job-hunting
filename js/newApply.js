/* eslint-disable no-extend-native */
Function.prototype.newApply = function (context, args) {
  if (!context) {
    context = global // node 全局环境下只有global
  }
  if (!args) {
    args = []
  }
  if (!Array.isArray(args)) {
    throw new Error('CreateListFromArrayLike called on non-object')
  }
  context.fn = this
  let result
  if (args.length === 0) {
    result = context.fn()
  } else {
    result = context.fn(...args) // 此处调用时改变了this指向，fn的this指向context
  }
  delete context.fn
  return result
}

module.exports = Function
