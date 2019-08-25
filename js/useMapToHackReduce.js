/**
 * 用map来实现reduce
 * @param {Array} arr
 * @param {Function} callback
 * @param {any} initialValue
 */
function useMapToHackReduce (arr, callback, initialValue) {
  let previous
  arr.map((value, index, array) => {
    if (index === 0) {
      // 处理初始值问题
      // reduce原始逻辑是当不存在initialValue时
      // 自动从index为1开始，并将index为0的值置为previousValue
      if (initialValue === undefined) {
        previous = value
        return value
      } else {
        previous = initialValue
        previous = callback(previous, array[index], index, array)
      }
    } else {
      previous = callback(previous, array[index], index, array)
    }
    return value
  })
  return previous
}

module.exports = useMapToHackReduce
