/* eslint-disable no-extend-native */
Function.prototype.newBind = function (context, ...args) {
  if (!context) {
    context = global // node 全局环境下只有global
  }
  const _this = this
  return function F () {
    if (this instanceof F) { // 如果new了一个bind之后的方法
      return new _this(...args, ...arguments) // 返回一个new的_this，忽略传入的context
    }
    return _this.apply(context, args.concat(...arguments)) // 由于call的参数个数不确定，用apply传入数组会更方便
  }
}

module.exports = Function
