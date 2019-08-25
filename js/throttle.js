/**
 * 实现一个throttle函数
 * 含义是在一段时间内最多触发一次
 * 限制了触发的频率
 * @param {*} fn
 * @param {*} wait
 */
function throttle (fn, wait) {
  let timer = null
  return function (...args) {
    if (!timer) {
      // console.log(123333)
      fn.call(this, ...args)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    }
  }
}

module.exports = throttle
