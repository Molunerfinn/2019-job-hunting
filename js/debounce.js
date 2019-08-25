/**
 * 实现一个debounce函数
 * 普通情况：不管调用多少次，都是最后一次调用的一段时间后触发。【后置触发】
 * 难度提升：immediate参数，第一次调用触发，在等待时间内触发无效。【前置触发】
 * @param {Function} fn
 * @param {Number} wait
 * @param {Boolean} immediate
 */
function debounce (fn, wait, immediate = false) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      // 只有当immediate为true以及timer为null时才能立即触发
      // 否则就进入等待timer变为null
      const canCall = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (canCall) {
        fn.call(this, ...args)
      }
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...args)
      }, wait)
    }
  }
}

module.exports = debounce
