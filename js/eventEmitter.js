/**
 * 简化版EventEmitter
 */
class EventEmitter {
  constructor () {
    this.eventList = {}
  }

  on (type, listener) {
    this.eventList[type] = this.eventList[type] || []
    this.eventList[type].push(listener)
  }

  off (type, listener) {
    this.eventList[type] = this.eventList[type] || []
    this.eventList[type] = this.eventList[type].filter(item => item !== listener)
  }

  emit (type, ...args) {
    this.eventList[type] = this.eventList[type] || []
    for (const i in this.eventList[type]) {
      this.eventList[type][i](...args)
    }
  }

  once (type, listener) {
    const _wrapFn = (...args) => {
      listener(...args)
      this.off(type, _wrapFn)
    }
    this.on(type, _wrapFn)
  }
}

module.exports = EventEmitter
