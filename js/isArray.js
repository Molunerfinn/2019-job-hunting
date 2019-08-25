/**
 * 写一个方法来判断一个变量是否是数组
 */

function isArray1 (arr) {
  return Array.isArray(arr)
}

function isArray2 (arr) {
  return arr instanceof Array
}

function isArray3 (arr) {
  // Object类型的toString会返回[object type]，其中type是类型
  // 但是有的对象的toString方法会被改写
  // 所以需要借用一下Object原始的toString
  return Object.prototype.toString.call(arr) === '[object Array]'
}

module.exports = {
  isArray1,
  isArray2,
  isArray3
}
