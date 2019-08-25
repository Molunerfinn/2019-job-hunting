/**
 * 实现Promise.all
 */
Promise.all = function (promises) {
  const length = promises.length
  let count = 0
  const result = new Array(length)
  return new Promise((resolve, reject) => {
    for (const item in promises) {
      Promise.resolve(promises[item]).then(res => {
        count++
        // Promise.all 输出结果顺序是按传入的promise的顺序来的
        result[item] = res
        if (count === length) {
          return resolve(result)
        }
      }, err => {
        reject(err)
      })
    }
  })
}

module.exports = Promise
