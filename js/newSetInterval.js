/**
 * 用setTimeout实现一个setInterval
 * 难度提高：进一步用clearTimeout实现clearInterval，并且调用方法一致
 */
let id = 0
const timeMap = {}
function newSetInterval (callback, time) {
  const timeId = id
  id++
  const fn = () => {
    callback.call(this)
    timeMap[timeId] = setTimeout(fn, time)
  }
  timeMap[timeId] = setTimeout(fn, time)
  return timeId
}

function newClearInterval (timeId) {
  clearTimeout(timeMap[timeId])
  delete timeMap[timeId]
}

module.exports = {
  newSetInterval,
  newClearInterval
}
