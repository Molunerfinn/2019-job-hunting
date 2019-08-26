/**
 * 实现一个instanceof
 * A.__proto__ === B.prototype
 * @param {any} left
 * @param {any} right
 */
function newInstanceof (left, right) {
  // left必须是个对象或者函数（其实也是对象）
  // 否则返回false
  if (typeof left !== 'object' && typeof left !== 'function') {
    return false
  }
  const rightProtoType = right.prototype
  let leftProto = Object.getPrototypeOf(left)
  while (true) {
    if (leftProto === rightProtoType) {
      return true
    }
    if (leftProto === null) {
      return false
    }
    leftProto = Object.getPrototypeOf(leftProto)
  }
}

module.exports = newInstanceof
