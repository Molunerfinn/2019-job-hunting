/**
 * 实现一个扁平化数组的函数
 * depth为扁平化深度
 * 比如 flatten([1,[1,[2]]], 1) -> [1, 1, [2], 1]
 * @param {Array} arr
 * @param {Number} depth
 */
function flatten (arr, depth) {
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      if (depth > 0) {
        // 由于flatten返回的是一个数组
        // 所以需要用扩展运算符展开
        pre.push(...flatten(cur, depth - 1))
      } else {
        pre.push(cur)
      }
    } else {
      pre.push(cur)
    }
    return pre
  }, [])
}

module.exports = flatten
