const EventEmitter = require('../eventEmitter')
const bus = new EventEmitter()

test('EventEmitter on is OK', done => {
  const callback = jest.fn()
  bus.on('test1', callback)
  bus.emit('test1')
  bus.emit('test1')
  expect(callback).toBeCalledTimes(2)
  bus.off('test1', callback)
  done()
})

test('EventEmitter off is OK', done => {
  const callback = jest.fn()
  bus.on('test1', callback)
  bus.emit('test1')
  bus.off('test1', callback)
  bus.emit('test1')
  expect(callback).toBeCalledTimes(1)
  done()
})

test('EventEmitter once is OK', done => {
  const callback = jest.fn()
  bus.once('test1', callback)
  bus.emit('test1')
  bus.emit('test1')
  bus.off('test1', callback)
  expect(callback).toBeCalledTimes(1)
  done()
})

test('EventEmitter emit non-exist type is OK', done => {
  const callback = jest.fn()
  bus.on('test1', callback)
  bus.emit('test2')
  expect(callback).toBeCalledTimes(0)
  bus.off('test1', callback)
  done()
})

test('EventEmitter off non-exist type is OK', done => {
  const callback = jest.fn()
  bus.off('test3', callback)
  expect(bus.eventList.test3.length).toBe(0)
  done()
})
