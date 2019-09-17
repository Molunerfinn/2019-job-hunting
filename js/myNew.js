/**
 *
 * @param {Function} cons
 * @param  {any[]} args
 */
function myNew (cons, ...args) {
  // 创建一个空对象，继承constructor的prototype
  // 即：obj.__proto__ === cons.prototype
  const obj = Object.create(cons.prototype)
  const result = cons.apply(obj, args) // 执行构造函数，将this绑定在要返回的obj上
  if (typeof result === 'object') { // 如果构造函数返回结果是个对象，就返回这个对象
    return result
  } else {
    return obj // 执行结束后obj上会有constructor里挂载的属性
  }
}

module.exports = myNew
