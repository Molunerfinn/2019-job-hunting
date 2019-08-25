/**
 * 实现Promise.race
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (const item of promises) {
      Promise.resolve(item).then(res => {
        return resolve(res)
      }, err => {
        return reject(err)
      })
    }
  })
}

module.exports = Promise
