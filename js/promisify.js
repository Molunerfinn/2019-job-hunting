/**
 * 实现一个promisify
 * 将callback类型的函数转成Promise形式的函数
 * 可以认为是实现一个node util模块的promisify（简化版）
 */

function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = promisify
